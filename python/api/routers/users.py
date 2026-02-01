# routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import crud, schemas, models
from passlib.context import CryptContext
from .auth import create_access_token, oauth2_scheme, decode_access_token


router = APIRouter()
#=========================PASSWORD HASHING====================
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

import bcrypt

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    # Encode password to bytes and truncate to 72 bytes (bcrypt limit)
    password_bytes = password.encode('utf-8')[:72]
    # Generate salt and hash
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    # Return as string
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    password_bytes = plain_password.encode('utf-8')[:72]
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#======================ENDPOINTS================================


@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)

    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    crud.delete_user(db, user)
    return {"detail": "User deleted"}

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Email or password wrong")

    token = create_access_token({"user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.User)
def get_me(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
    ):
    user_id = decode_access_token(token)
    user = crud.get_user(db, user_id)
    if not user: 
        raise HTTPException(status_code=404, detail="User not found")
    return user
