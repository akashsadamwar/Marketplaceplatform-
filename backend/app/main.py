
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, products, orders
from .db import init_db

app = FastAPI(title="VendNest API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])

@app.get("/health")
def health():
    return {"status": "ok"}
