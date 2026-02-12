# 🌱 PlantPal

A full-stack plant care tracking application that helps you manage your plants and keep track of their watering schedules.

## 📋 Overview

PlantPal is a web application designed to help plant owners track their plants and watering events. Users can create an account, add their plants with specific watering intervals, and log watering events to maintain healthy plants.

## ✨ Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Plant Management**: Add, view, and track multiple plants
- **Watering Events**: Log when you water your plants and how much water you used
- **Personalized Dashboard**: View all your plants and their watering schedules
- **Overdue Plant Detection**: SQL query to identify plants that need watering

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database interactions
- **PostgreSQL**: Relational database
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **Pydantic**: Data validation

### Frontend
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server

## 📁 Project Structure

```
plantpal/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── auth.py              # JWT authentication utilities
│   └── routers/
│       ├── users.py         # User endpoints
│       ├── plants.py        # Plant endpoints
│       └── watering_events.py  # Watering event endpoints
├── frontend/
│   └── src/
│       ├── CreateUser.tsx   # User registration page
│       ├── Login.tsx        # Login page
│       ├── Dashboard.tsx    # Main dashboard
│       ├── Plants.tsx       # Plant management page
│       └── WateringEvent.tsx # Watering logging page
└── sql/
    ├── create_database.sql  # Database schema
    ├── indices.sql          # Database indices
    └── queries.sql          # Useful queries (overdue plants)
```

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique user email
- `password_hash`: Hashed password
- `created_at`: Timestamp

### Plants Table
- `id`: Primary key
- `user_id`: Foreign key to users
- `plant_name`: Name of the plant
- `plant_species`: Species/type of plant
- `watering_interval_days`: How often to water
- `created_at`: Timestamp

### Watering Events Table
- `id`: Primary key
- `plant_id`: Foreign key to plants
- `watered_at`: When the plant was watered
- `amount_ml`: Amount of water in milliliters

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- PostgreSQL
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Create a PostgreSQL database**:
```bash
createdb plantpal
```

2. **Run the database schema**:
```bash
psql -d plantpal -f sql/create_database.sql
```

3. **Update database credentials** in `database.py`:
```python
DATABASE_URL = "postgresql://username:password@localhost:5432/plantpal"
```

4. **Install Python dependencies**:
```bash
pip install fastapi sqlalchemy psycopg2-binary pydantic passlib bcrypt pyjwt python-multipart uvicorn
```

5. **Run the backend server**:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔑 API Endpoints

### Users
- `POST /users/` - Create a new user
- `POST /users/login/json` - Login and receive JWT token
- `GET /users/me` - Get current user info
- `DELETE /users/{user_id}` - Delete a user

### Plants
- `POST /plants/createPlant` - Create a new plant (authenticated)
- `GET /plants/getPlants` - Get all plants for current user (authenticated)

### Watering Events
- `POST /watering-events/createWateringEvent` - Log a watering event (authenticated)

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
1. Users register or log in to receive a token
2. Token is stored in localStorage
3. Token is sent in the Authorization header for protected endpoints
4. Tokens expire after 60 minutes

## 📝 Usage Flow

1. **Create an account** on the registration page
2. **Login** with your credentials
3. **Add plants** from the Plants page with their watering schedules
4. **Log watering events** when you water your plants
5. **Track overdue plants** using the SQL query in `queries.sql`

## 🚧 Work in Progress

This application is still under development. Planned features include:
- Overdue plant notifications
- Plant watering history view
- Plant photos
- Care tips and reminders
- Mobile version

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Yonas

---

