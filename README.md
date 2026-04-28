\# Solar Panel Inspection — Backend



\## Setup



\### 1. Clone the repo

git clone https://github.com/ghala97-code/grad-project-backup.git

cd grad-project



\### 2. Create virtual environment

python -m venv venv

venv\\Scripts\\activate



\### 3. Install libraries

pip install -r Requirements.txt



\### 4. Add AI Models

ضعي الموديلين في:

app/ml\_models/

├── panel\_model\_current.pt

└── defect\_model\_current.pt



حمليهم من Google Drive:

https://drive.google.com/drive/folders/1FDqSuiyjbkXAUCNloR\_FMNgS2BxJEtgb?usp=drive\_link



\### 5. Run the server

cd app

uvicorn main:app --reload

