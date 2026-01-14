from sqlalchemy import create_engine, Column, Integer, ForeignKey, String, TIMESTAMP, text
from sqlalchemy.orm import relationship
from database import Base
# ---------------- Models ----------------
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    
    # Relationship to plants
    plants = relationship("Plant", back_populates="owner", cascade="all, delete")


class Plant(Base):
    __tablename__ = "plants"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plant_name = Column(String, nullable=False)
    plant_species = Column(String, nullable=False)
    watering_interval_days = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    
    # Relationships
    owner = relationship("User", back_populates="plants")
    watering_events = relationship("WateringEvent", back_populates="plant", cascade="all, delete")


class WateringEvent(Base):
    __tablename__ = "watering_events"
    
    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=False)
    watered_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    amount_ml = Column(Integer, nullable=True)
    
    # Relationship
    plant = relationship("Plant", back_populates="watering_events")