FROM python:3.12

WORKDIR /app

RUN apt-get update --fix-missing && \
    apt-get install -y \
    libpq-dev gcc libgl1 libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

COPY Requirements.txt .

RUN pip install --no-cache-dir -r Requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]