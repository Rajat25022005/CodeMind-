from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=("../.env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str
    qdrant_host: str = "localhost"
    qdrant_port: int = 6333
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = ""
    ollama_embed_model: str = "nomic-embed-text"
    openai_api_key: str = ""
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.1-flash-lite-preview"
    secret_key: str = "change-me-in-production"
    debug: bool = False
    log_level: str = "INFO"
    embed_dimension: int = 3072
    collection_name: str = "codemind_chunks"
    allowed_origins: str = "http://localhost:5173,http://localhost:3000"

@lru_cache
def get_settings() -> Settings:
    return Settings()
