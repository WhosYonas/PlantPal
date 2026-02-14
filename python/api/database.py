from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ---------------- Database Setup ----------------
DATABASE_URL = "postgresql://X:X@localhost:5432/plantpal"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

def init_db():
    Base.metadata.create_all(bind=engine)