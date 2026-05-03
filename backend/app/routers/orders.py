
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db import get_db
from ..models import Order, OrderItem, Product
from ..schemas import OrderItemIn, OrderOut
from ..deps import get_current_user

router = APIRouter()

@router.post("", response_model=OrderOut)
def create_order(items: List[OrderItemIn], db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not items:
        raise HTTPException(status_code=400, detail="Empty cart")
    order = Order(user_id=user.id, total_cents=0, status="created")
    db.add(order); db.flush()
    total = 0
    for it in items:
        p = db.query(Product).get(it.product_id)
        if not p or p.stock < it.qty:
            raise HTTPException(status_code=400, detail=f"Invalid item or stock: {it.product_id}")
        total += p.price_cents * it.qty
        db.add(OrderItem(order_id=order.id, product_id=p.id, qty=it.qty, price_cents=p.price_cents))
        p.stock -= it.qty
    order.total_cents = total
    db.commit(); db.refresh(order)
    return order

@router.post("/{order_id}/pay", response_model=OrderOut)
def mock_pay(order_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = "paid"
    db.commit(); db.refresh(order)
    return order
