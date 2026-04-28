from fastapi import FastAPI
from app.routers import auth, inspections # استدعاء الملفات اللي سويتيها
from app.core.database import engine
from app.db import models
from app.core.config import settings
from app.routers import model_router
from app.routers import upload, prediction
from app.routers import inference

# خطوة مهمة للدوكر: إنشاء الجداول تلقائياً في Postgres أول ما يشتغل السيرفر
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Solar Panel Fault Detection using UAV and AI",
    version="1.0.0"
)

# --- ربط المسارات (Routers) ---
# كذا كل الأكواد اللي كتبتيها في auth.py و inspections.py بتصير شغالة
app.include_router(auth.router)
app.include_router(inspections.router)
app.include_router(model_router.router)
app.include_router(upload.router)
app.include_router(prediction.router)
app.include_router(inference.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "مرحباً بكم في نظام قياف - الباك آند يعمل بنجاح",
        "project": settings.PROJECT_NAME  
            }

@app.get("/health")
def health_check():
    return {"status": "healthy"}