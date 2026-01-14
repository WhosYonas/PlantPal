# routers/users.py
from fastapi import APIRouter, HTTPException
from passlib.hash import bcrypt

from database import SessionLocal
from models import User
from schemas import UserCreate, UserResponse

router = APIRouter()  

