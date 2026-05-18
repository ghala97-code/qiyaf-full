from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # استيراد المكتبة المطلوبة
from app.routers import auth, inspections, upload, prediction, inference
from app.core.database import engine
from app.db import models
from app.core.config import settings

# إنشاء الجداول
models.SQLModel.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Solar Panel Fault Detection using UAV and AI",
    version="1.0.0"
)

# --- إضافة إعدادات الـ CORS للربط مع الفرونت آند ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # يسمح لجميع الروابط بالوصول (مناسب جداً وقت التطوير والاجتماع)
    allow_credentials=True,
    allow_methods=["*"], # يسمح بجميع أنواع الطلبات (GET, POST, etc.)
    allow_headers=["*"], # يسمح بجميع الـ Headers
)

# --- ربط المسارات (Routers) ---
app.include_router(auth.router)
app.include_router(inspections.router)
app.include_router(inference.router)
app.include_router(upload.router)
#app.include_router(prediction.router)

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