# schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # pydantic v2

class PlantBase(BaseModel):
    plant_name: str
    plant_species: str
    watering_interval_days: int

class PlantCreate(PlantBase):
    pass

class Plant(PlantBase):
    id: int
    created_at: datetime
    owner: Optional[User]
    class Config:
        orm_mode = True
