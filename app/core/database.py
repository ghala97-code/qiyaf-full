from sqlmodel import create_engine, Session, SQLModel
from sqlalchemy import text
from app.core.config import settings 

# 1. إنشاء محرك واحد فقط باستخدام الرابط القادم من Settings
# settings.DATABASE_URL يحتوي بالفعل على اسم الحاوية 'db'
engine = create_engine(settings.DATABASE_URL, echo=True)

def init_db():
    with Session(engine) as session:
        session.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
        session.commit()
    
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session