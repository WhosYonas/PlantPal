try:
    from sqlalchemy.orm import Session
except Exception:  # fallback for environments where SQLAlchemy isn't installed
    from typing import Any as Session

from models import User, Plant, WateringEvent
from schemas import PlantCreate, WateringEventCreate

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()

def get_plant(db: Session, plant_id: int):
    return db.query(Plant).filter(Plant.id == plant_id).first()

def get_plants(db: Session, user_id: int):
    return db.query(Plant).filter(Plant.user_id == user_id).all()

def get_plant_by_name(db: Session, user_id: int, name: str):
    return db.query(Plant).filter(
        Plant.user_id == user_id,
        Plant.plant_name == name
    ).first()

def get_latest_watering_event(db: Session, plant_id: int):
    return (
        db.query(WateringEvent)
        .filter(WateringEvent.plant_id == plant_id)
        .order_by(WateringEvent.watered_at.desc())
        .first()
    )


def create_watering_event(db: Session, watering_event: WateringEventCreate, plant_id: int):
    db_watering_event = WateringEvent(
        plant_id=plant_id,
        watered_at=watering_event.watered_at, 
        amount_ml=watering_event.amount_ml 
    )
    db.add(db_watering_event)
    db.commit()
    db.refresh(db_watering_event)
    return db_watering_event

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_plant(db: Session, plant: PlantCreate, user_id: int):
    db_plant = Plant(
        user_id=user_id,
        plant_name=plant.plant_name,
        plant_species=plant.plant_species,
        watering_interval_days=plant.watering_interval_days
    )
    db.add(db_plant)
    db.commit()
    db.refresh(db_plant)
    return db_plant
