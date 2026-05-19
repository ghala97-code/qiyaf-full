import os
import cv2
import tempfile
from typing import List
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.db import models

# استدعاء دالة الذكاء الاصطناعي الشاملة
from app.services.pipeline_service import run_pipeline_file

# إيقاف الـ OpenCL لمنع انهيار الدوكر مع OpenCV
os.environ["OPENCV_OPENCL_RUNTIME"] = "disabled"

router = APIRouter(prefix="/inspections", tags=["inspections"])

@router.post("/predict")
async def predict(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    
    # 1. إنشاء "عملية فحص" واحدة في قاعدة البيانات (شغلك كـ Partner)
    new_inspection = models.Inspection(
        title=f"فحص آلي لعدد {len(files)} ملف/ملفات",
        status="completed"
    )
    db.add(new_inspection)
    db.commit()
    db.refresh(new_inspection)

    all_results = []
    total_panels = 0

    # 2. المرور على كل الملفات المرفوعة
    for file in files:
        # استخراج امتداد الملف (مثل .jpg أو .mp4)
        ext = os.path.splitext(file.filename)[1].lower()
        if not ext:
            ext = ".jpg" # امتداد افتراضي لو كان مخفي
            
        # إنشاء ملف مؤقت في السيرفر لحفظ الملف المرفوع
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp_file:
            # قراءة الملف من المتصفح وحفظه في السيرفر
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        try:
            # 3. إرسال المسار لدالة الذكاء الاصطناعي الشاملة (كود فريق الـ AI)
            # هذه الدالة سترجع قاموس يحتوي على detections وغيرها
            pipeline_result = run_pipeline_file(temp_file_path)
            
            # استخراج النتائج من القاموس الراجع
            results = pipeline_result.get("detections", [])
            
            all_results.append({
                "filename": file.filename,
                "pipeline_data": pipeline_result # حفظ كامل مخرجات فريق الـ AI للتوثيق
            })
            total_panels += len(results)

            # 4. حفظ النتائج التفصيلية لكل لوح (Detections) في قاعدة البيانات
            for res in results:
                new_result = models.DetectionResult(
                    inspection_id=new_inspection.id,
                    fault_type=res.get("fault_type", "unknown"),
                    confidence=res.get("confidence", 0.0),
                    box_coordinates=res.get("box", {})
                )
                db.add(new_result)
                
        except Exception as e:
            # في حال حدوث خطأ في المعالجة، نطبعه في التيرمينال ونكمل للملف اللي بعده
            print(f"Error processing file {file.filename}: {str(e)}")
            continue
            
        finally:
            # 5. تنظيف السيرفر: حذف الملف المؤقت لتوفير المساحة
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)

    # حفظ جميع الداتا في الـ PostgreSQL
    db.commit()

    # 6. الرد النهائي للمتصفح
    return {
        "status": "success",
        "inspection_id": new_inspection.id,
        "num_files_processed": len(files),
        "num_panels_detected": total_panels,
        "results": all_results
    }