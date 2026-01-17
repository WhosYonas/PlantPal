# routers/plants.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import SessionLocal
import crud, schemas

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Simple token payload holder
class TokenPayload:
    def __init__(self, user_id: int):
        self.user_id = user_id


#============================================================================
def decode_token(token: str):
    """
    Minimal safe token decoder to avoid undefined name errors.
    This accepts simple tokens like a numeric user id ("123") or "user:123".
    In a real app replace this with proper JWT decoding using your secret and library.
    """
    if not token:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    if token.isdigit():
        return TokenPayload(int(token))
    if token.startswith("user:"):
        try:
            return TokenPayload(int(token.split(":", 1)[1]))
        except ValueError:
            pass
    raise HTTPException(status_code=401, detail="Invalid token format")
#==========================================================================


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    user = crud.get_user(db, payload.user_id)  # Changed from get_user_by_id
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
# Original authenticated endpoint
@router.post("/", response_model=schemas.Plant)
def create_plant(
    plant: schemas.PlantCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    db_plant = crud.get_plant_by_name(db, current_user.id, plant.plant_name)
    if db_plant:
        raise HTTPException(status_code=400, detail="Plant already exists")
    return crud.create_plant(db, plant, current_user.id)

# Test endpoint without authentication
@router.post("/test", response_model=schemas.Plant)
def create_plant_test(
    plant: schemas.PlantCreate,
    db: Session = Depends(get_db)
):
    """Test endpoint - no authentication required"""
    user_id = plant.user_id
    
    db_plant = crud.get_plant_by_name(db, user_id, plant.plant_name)
    if db_plant:
        raise HTTPException(status_code=400, detail="Plant already exists")
    return crud.create_plant(db, plant, user_id)