from fastapi import FastAPI


app = FastAPI(
    title="نظام نيشان لكشف أعطال الألواح الشمسية",
    description="Backend API for Solar Panel Fault Detection using UAV and AI",
    version="1.0.0"
)

@app.get("/")
def read_root():
    """
    نقطة الاختبار الأساسية للتأكد من أن السيرفر يعمل
    """
    return {
        "status": "online",
        "message": "مرحباً بكم في نظام نيشان - الباك آند يعمل بنجاح",
        "project": "Solar Panel Fault Detection"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
