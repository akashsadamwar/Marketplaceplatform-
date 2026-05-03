
# Optional helper to promote a user to admin quickly.
from sqlalchemy.orm import Session
from .db import SessionLocal, init_db
from .models import User

def main(email: str):
    init_db()
    db: Session = SessionLocal()
    u = db.query(User).filter(User.email == email).first()
    if not u:
        print("User not found")
        return
    u.is_admin = True
    db.commit()
    print(f"Promoted {email} to admin.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python -m app.seed_admin user@example.com")
    else:
        main(sys.argv[1])
