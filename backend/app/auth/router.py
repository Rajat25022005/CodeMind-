import threading
import time

from fastapi import APIRouter, Depends, status, Request, HTTPException

from app.auth.schemas import RegisterRequest, VerifyRequest, LoginRequest, TokenResponse, UserProfile
from app.auth.service import AuthService
from app.core.graph_db import GraphDB
from app.core.security import get_current_user

router = APIRouter(tags=["auth"])

_graph_db: GraphDB | None = None
_rate_limits: dict[str, list[float]] = {}
_lock = threading.Lock()

def _cleanup_old_entries():
    now = time.time()
    with _lock:
        stale = [ip for ip, times in _rate_limits.items() if all(now - t > 300 for t in times)]
        for ip in stale:
            del _rate_limits[ip]

def rate_limit(request: Request):
    client_ip = request.headers.get("X-Real-IP") or (request.client.host if request.client else "unknown")
    now = time.time()
    
    _cleanup_old_entries()
    
    with _lock:
        recent = [t for t in _rate_limits.get(client_ip, []) if now - t < 60]
        if len(recent) >= 10:
            raise HTTPException(status_code=429, detail="Too many auth requests. Please try again later.")
        recent.append(now)
        _rate_limits[client_ip] = recent


def set_auth_clients(graph_db: GraphDB) -> None:
    global _graph_db
    _graph_db = graph_db

def get_auth_service() -> AuthService:
    return AuthService(_graph_db)


@router.post("/register", status_code=status.HTTP_201_CREATED, dependencies=[Depends(rate_limit)])
async def register(request: RegisterRequest, auth_service: AuthService = Depends(get_auth_service)):
    await auth_service.register_user(request.email, request.password)
    return {"message": "Verification code sent to email"}


@router.post("/verify", dependencies=[Depends(rate_limit)])
async def verify(request: VerifyRequest, auth_service: AuthService = Depends(get_auth_service)):
    await auth_service.verify_email(request.email, request.code)
    return {"message": "Email verified successfully"}


@router.post("/login", response_model=TokenResponse, dependencies=[Depends(rate_limit)])
async def login(request: LoginRequest, auth_service: AuthService = Depends(get_auth_service)):
    token = await auth_service.login(request.email, request.password)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserProfile)
async def get_me(user: dict = Depends(get_current_user), auth_service: AuthService = Depends(get_auth_service)):
    # Re-fetch from DB to check verification status
    db_user = await auth_service.db.get_user_by_email(user["email"])
    return UserProfile(
        email=db_user["email"],
        is_verified=db_user.get("is_verified", False)
    )
