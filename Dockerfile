# استخدام نسخة بايثون المطلوبة (3.12.9) كنقطة انطلاق
FROM python:3.12.9-slim

# تثبيت مكتبات النظام الضرورية لـ OpenCV و YOLO
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# نسخ وتحميل المكتبات مع زيادة المهلة لتجنب مشاكل الشبكة
COPY Requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --default-timeout=1000 -r Requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]