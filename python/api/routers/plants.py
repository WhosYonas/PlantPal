# routers/plants.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from database import SessionLocal
import crud, schemas
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

# Original authenticated endpoint
@router.post("/createPlant", response_model=schemas.Plant)
def create_plant(
    plant: schemas.PlantCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
    ):
    db_plant = crud.get_plant_by_name(db, current_user.id, plant.plant_name)
    if db_plant:
        raise HTTPException(status_code=400, detail="Plant already exists")
    return crud.create_plant(db, plant, current_user.id)

@router.get("/getPlants", response_model=List[schemas.Plant])
def get_all_plants(
    db: Session = Depends(get_db), 
    current_user: schemas.User = Depends(get_current_user)
    ):
    plants = crud.get_plants(db, current_user.id)
    return plants

@router.get("/getPlantById", response_model=schemas.Plant)
def get_plant(
    plant_id: int,  
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    plant = crud.get_plant(db, plant_id)
    
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")
    
    if plant.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this plant")
    
    return plant