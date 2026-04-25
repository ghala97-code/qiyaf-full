FROM python:3.12-slim

# منع بايثون من إنشاء ملفات .pyc وتحسين سرعة الطباعة في التيرمينال
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# تحديد مسار العمل داخل الحاوية
WORKDIR /app

# تثبيت مكتبات النظام الضرورية فقط (الحد الأدنى لتقليل احتمالية فشل الشبكة)
# أضفنا --fix-missing للتعامل مع مشاكل الاتصال المؤقتة
RUN apt-get update --fix-missing && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# نسخ ملف المتطلبات أولاً للاستفادة من خاصية الـ Caching في Docker
COPY Requirements.txt .

# تثبيت مكتبات بايثون
# ملاحظة: تأكدي أن ملف Requirements يحتوي على opencv-python-headless وليس النسخة العادية
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r Requirements.txt

# نسخ بقية ملفات المشروع
COPY . .

# فتح المنفذ الذي سيعمل عليه FastAPI
EXPOSE 8000

# أمر التشغيل النهائي
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]