from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# --- Schemas للمستخدم ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str # هذا اللي يوصلنا من اليوزر عند التسجيل

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

# --- Schemas لنتائج الفحص (اللي بيفيدك مع فريق الـ AI) ---
class DetectionResultBase(BaseModel):
    fault_type: str
    confidence: float
    box_coordinates: Any # مرن جداً حالياً عشان ميتنق فريق الـ AI
    image_path: str

class DetectionResult(DetectionResultBase):
    id: int
    inspection_id: int
    class Config:
        from_attributes = True

# --- Schemas لعملية الفحص الأساسية ---
class InspectionBase(BaseModel):
    title: str

class InspectionCreate(InspectionBase):
    pass

class Inspection(InspectionBase):
    id: int
    status: str
    created_at: datetime
    results: List[DetectionResult] = [] # يرجع الفحص مع كل نتائجه
    class Config:
        from_attributes = True