import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "QIYAAF - Solar Fault Detection"
    
    # إعدادات قاعدة البيانات (PostgreSQL)
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "password123")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "db") 
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "qiyaf_db")
    
    DATABASE_URL: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    
    # إعدادات Celery & Redis
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
    CELERY_RESULT_BACKEND: str = DATABASE_URL
    
    # إعدادات الملفات المرفوعة
    UPLOAD_DIR: str = "app/uploads"

    # --- إعدادات الأمان (الجديدة) ---
    # الـ SECRET_KEY يستخدم لتشفير الـ JWT Token (لازم يكون طويل وعشوائي)
    SECRET_KEY: str = os.getenv("SECRET_KEY", "7d9a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u") 
    # مدة صلاحية التوكن (أسبوع واحد)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 

    class Config:
        case_sensitive = True


settings = Settings()