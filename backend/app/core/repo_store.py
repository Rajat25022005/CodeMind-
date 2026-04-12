import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

# Single-repo store file path
STORE_FILE = Path(__file__).parent.parent.parent / "repos.json"

def set_active_repo(name: str, branch: str, path: str):
    data = {
        "name": name,
        "branch": branch,
        "path": path
    }
    try:
        with open(STORE_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        logger.info(f"Active repo updated: {data}")
    except Exception as e:
        logger.error(f"Failed to write repo store: {e}")

def get_active_repo() -> dict | None:
    if not STORE_FILE.exists():
        return None
    try:
        with open(STORE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to read repo store: {e}")
        return None
