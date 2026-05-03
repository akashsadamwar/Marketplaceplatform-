# VendNest

Full-stack demo app: **FastAPI** (Python) and **Next.js 14** (App Router, TypeScript, Tailwind).

## What it does

- JWT login/register, role-based admin.
- Product listing with search; admins manage inventory.
- Cart stored in the browser; checkout creates a demo order record.
- Run against **PostgreSQL** (Docker) or **SQLite** for a quick local trial.

## Run locally (no Docker)

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # optional
uvicorn app.main:app --reload
```

API: http://127.0.0.1:8000 — interactive docs at `/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:3000  

Create an account at `/register`, then sign in. Grant admin by updating the database (see `backend/app/seed_admin.py`).

## Docker Compose

```bash
docker compose up --build
```

- App: http://localhost:3000  
- API: http://localhost:8000  

## Configuration

See `backend/.env.example` and `frontend/.env.local.example`.

## Routes

- `/` — storefront  
- `/login`, `/register`  
- `/cart`  
- `/admin/products` — CRUD (admin)
