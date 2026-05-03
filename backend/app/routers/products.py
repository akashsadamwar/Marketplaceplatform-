
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from ..db import get_db
from ..models import Product
from ..schemas import ProductIn, ProductOut
from ..deps import require_admin

router = APIRouter()

@router.get("", response_model=List[ProductOut])
def list_products(q: str | None = Query(None), db: Session = Depends(get_db)):
    query = db.query(Product)
    if q:
        like = f"%{q.lower()}%"
        query = query.filter(Product.title.ilike(like) | Product.description.ilike(like))
    return query.order_by(Product.id.desc()).all()

@router.post("", response_model=ProductOut)
def create_product(payload: ProductIn, db: Session = Depends(get_db), user=Depends(require_admin)):
    p = Product(**payload.dict())
    db.add(p); db.commit(); db.refresh(p)
    return p

@router.put("/{pid}", response_model=ProductOut)
def update_product(pid: int, payload: ProductIn, db: Session = Depends(get_db), user=Depends(require_admin)):
    p = db.query(Product).get(pid)
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in payload.dict().items():
        setattr(p, k, v)
    db.commit(); db.refresh(p)
    return p

@router.delete("/{pid}")
def delete_product(pid: int, db: Session = Depends(get_db), user=Depends(require_admin)):
    p = db.query(Product).get(pid)
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(p); db.commit()
    return {"ok": True}
