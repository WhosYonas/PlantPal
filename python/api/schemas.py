# schemas.py
from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password_hash: str

class User(UserBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class PlantBase(BaseModel):
    plant_name: str
    plant_species: str
    watering_interval_days: int

class PlantCreate(PlantBase):
    user_id: int

class Plant(PlantBase):
    id: int
    created_at: datetime
    owner: User
    class Config:
        orm_mode = True
