from fastapi import APIRouter, Depends, HTTPException
from database import SessionLocal
import crud, schemas
from sqlalchemy.orm import Session
from .auth import decode_access_token, oauth2_scheme

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_id = decode_access_token(token)
    user = crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/createWateringEvent", response_model=schemas.WateringEvent)
def create_watering_event(
    plant_id: int,
    watering_event: schemas.WateringEventCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    # Verify the plant exists and belongs to the current user
    plant = crud.get_plant(db, plant_id)
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    if plant.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to water this plant")
    
    return crud.create_watering_event(db, watering_event, plant_id)

@router.get("/lastWatered", response_model=schemas.WateringEvent)
def last_watered(
    plant_id: int,
    db: Session = Depends(get_db)
    ):
    return crud.get_latest_watering_event(db, plant_id)