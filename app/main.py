from fastapi import FastAPI
from app.routers import auth, inspections, upload, prediction, inference
from app.core.database import engine
from app.db import models
from app.core.config import settings

# إنشاء الجداول (تأكدي أن الـ Base مستورد صح من الـ models)
models.SQLModel.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Solar Panel Fault Detection using UAV and AI",
    version="1.0.0"
)

# --- ربط المسارات (Routers) ---
app.include_router(auth.router)
app.include_router(inspections.router)
app.include_router(inference.router) # هذا هو راوتر الـ AI اللي فيه analyze-chunk
app.include_router(upload.router)
app.include_router(prediction.router)

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