# 🌱 Plant Care Tracker

A beautiful and intuitive web application to help you manage and track your plant watering schedule. Never forget to water your plants again!

![Plant Care Tracker](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)

## ✨ Features

- **User Authentication** - Secure login and account creation
- **Plant Management** - Add, view, and organize your plant collection
- **Watering Schedule** - Set custom watering intervals for each plant
- **Watering Tracking** - Record when and how much you water each plant
- **Beautiful UI** - Modern gradient design with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Backend API running (see Backend Setup section)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd plant-care-tracker
```

2. Install dependencies
```bash
npm install
```

3. Configure API endpoint
Create a `client.ts` file in the `src/API/` directory:
```typescript
const API_BASE_URL = 'http://localhost:8000'; // Update with your backend URL

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **CSS3** - Styling with gradients and animations

### Project Structure
```
src/
├── pages/
│   ├── Login.tsx           # User login page
│   ├── CreateUser.tsx      # User registration page
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Plants.tsx          # Plant management page
│   └── WateringEvent.tsx   # Watering tracking page
├── API/
│   └── client.ts           # API client utilities
├── App.tsx                 # Main app component with routing
└── App.css                 # Global styles
```

## 📖 Usage Guide

### Creating an Account
1. Click "Create User" on the home page
2. Enter your email and password
3. Click "Create Account"

### Logging In
1. Click "Login" on the home page
2. Enter your credentials
3. Access your dashboard

### Adding Plants
1. Navigate to "Check My Plants" from the dashboard
2. Fill in the plant details:
   - Plant name (e.g., "Sunny the Succulent")
   - Plant species (e.g., "Aloe Vera")
   - Watering interval in days
3. Click "Add Plant"

### Recording Watering
1. Click "Water Plants" from the dashboard or plants page
2. Select the plant you watered
3. Enter the amount of water in milliliters
4. Click "Record Watering"

## 🔧 Backend Setup

This frontend requires a backend API with the following endpoints:

### User Endpoints
- `POST /users/` - Create new user
- `POST /users/login/json` - User login (returns access token)
- `GET /users/me` - Get current user details (requires authentication)

### Plant Endpoints
- `GET /plants/getPlants` - Get all plants for current user
- `POST /plants/createPlant` - Create a new plant

### Watering Event Endpoints
- `POST /watering-events/createWateringEvent?plant_id={id}` - Record a watering event

### Authentication
The API should use JWT bearer token authentication. The token is stored in localStorage and sent in the Authorization header.

## 🎨 Design Features

- **Gradient Background** - Eye-catching purple-to-pink gradient
- **Glass Morphism** - Semi-transparent UI elements with backdrop blur
- **Smooth Animations** - Fade-in effects and hover transitions
- **Responsive Cards** - Clean, modern card-based layout
- **Intuitive Icons** - Plant and water emojis for visual clarity

## 🔐 Security Considerations

- Passwords should be hashed on the backend
- JWT tokens expire after a set period
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Always use HTTPS in production

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚧 Future Enhancements

- [ ] Push notifications for watering reminders
- [ ] Plant photos and image upload
- [ ] Watering history and statistics
- [ ] Plant care tips and recommendations
- [ ] Social features to share plant collections
- [ ] Dark mode support
- [ ] Export plant data
- [ ] Multiple watering schedules per plant

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💬 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with 💚 for plant lovers everywhere
