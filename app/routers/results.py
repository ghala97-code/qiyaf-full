from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.core.database import get_db  
from app.db.models import DetectionResult

router = APIRouter(prefix="/results", tags=["Detection Results"])

@router.get("/{inspection_id}", response_model=List[DetectionResult])
async def get_results_by_inspection(
    inspection_id: int, 
    db: Session = Depends(get_db)  
):
    statement = select(DetectionResult).where(DetectionResult.inspection_id == inspection_id)
    results = db.exec(statement).all()
    
    if not results:
        raise HTTPException(status_code=404, detail="No results found")
        
    return results