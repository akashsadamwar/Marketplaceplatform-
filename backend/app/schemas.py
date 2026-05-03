
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    is_admin: bool
    class Config:
        from_attributes = True

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class ProductIn(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = ""
    price_cents: int = 0
    stock: int = 0
    image_url: str = ""

class ProductOut(BaseModel):
    id: int
    title: str
    description: str
    price_cents: int
    stock: int
    image_url: str
    class Config:
        from_attributes = True

class OrderItemIn(BaseModel):
    product_id: int
    qty: int = 1

class OrderOut(BaseModel):
    id: int
    total_cents: int
    status: str
    class Config:
        from_attributes = True
