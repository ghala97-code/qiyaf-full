import cv2
import numpy as np
from typing import List
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.db import models
from app.services.pipeline_service import run_pipeline
import uuid # لتوليد أسماء فريدة للصور

router = APIRouter(prefix="/inspections", tags=["inspections"])

@router.post("/predict")
async def predict(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 1. قراءة الصورة (كود فريق الـ AI)
    image_bytes = await file.read()
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # 2. تشغيل الموديل
    results = run_pipeline(image)

    # 3. حفظ "عملية فحص" في قاعدة البيانات (شغلك كـ Partner)
    new_inspection = models.Inspection(
        title=f"فحص آلي - {file.filename}",
        status="completed"
    )
    db.add(new_inspection)
    db.commit()
    db.refresh(new_inspection)

    # 4. حفظ النتائج التفصيلية لكل لوح (Detections)
    for res in results:
        new_result = models.DetectionResult(
            inspection_id=new_inspection.id,
            fault_type=res.get("type", "unknown"),
            confidence=res.get("confidence", 0.0),
            box_coordinates=res.get("box", {}) # الإحداثيات اللي عطاك اياها فريق الـ AI
        )
        db.add(new_result)
    
    db.commit()

    return {
        "status": "success",
        "inspection_id": new_inspection.id,
        "num_panels": len(results),
        "results": results
    }