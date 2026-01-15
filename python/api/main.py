from fastapi import FastAPI
from routers import users, plants, watering_events
from database import init_db
app = FastAPI()

# Include all routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(plants.router, prefix="/plants", tags=["Plants"])
app.include_router(watering_events.router, prefix="/watering-events", tags=["WateringEvents"])
init_db()