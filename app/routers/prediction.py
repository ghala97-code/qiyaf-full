from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/prediction", tags=["AI"])

@router.post("/predict")
async def predict_fault(file: UploadFile = File(...)):
    try:
        # التأكد من استقبال الملف بصيغة صحيحة
        contents = await file.read()
        
        # هنا يتم استدعاء الـ pipeline_service أو نموذج YOLO لاحقاً
        # حالياً سنعيد رد تجريبي للتأكد من نجاح الاتصال بالفرونت آند
        return JSONResponse(status_code=200, content={
            "status": "success",
            "filename": file.filename,
            "message": "Image received successfully. AI processing triggered."
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})