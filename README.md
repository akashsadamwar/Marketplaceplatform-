# VendNest

VendNest is a full-stack marketplace web application built with **FastAPI**, **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It includes user authentication, product browsing, admin product management, cart handling, and a simple order checkout flow.

The project is designed as an end-to-end e-commerce platform starter that can run locally with SQLite or through Docker using PostgreSQL.

## Features

- User registration and login with JWT authentication
- Role-based admin access for managing products
- Product catalog with search support
- Cart flow using browser local storage
- Checkout endpoint that creates an order and updates product stock
- Mock payment endpoint for marking orders as paid
- FastAPI backend with automatic OpenAPI documentation
- Next.js App Router frontend styled with Tailwind CSS
- PostgreSQL support through Docker Compose
- SQLite fallback for quick local development

## Tech Stack

**Frontend**

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- SWR

**Backend**

- FastAPI
- SQLAlchemy
- JWT authentication
- SQLite / PostgreSQL
- Uvicorn

## Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── orders.py
│   │   │   └── products.py
│   │   ├── db.py
│   │   ├── deps.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── security.py
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── admin/products/
│   │   ├── cart/
│   │   ├── login/
│   │   ├── register/
│   │   └── page.tsx
│   └── package.json
└── docker-compose.yml
