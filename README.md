# Wayfarer — Complete MERN Travel Itinerary Project

Wayfarer is a simple, presentation-ready full-stack travel planner built with the MERN stack:

- MongoDB + Mongoose
- Express.js
- React + Vite
- Node.js
- JWT authentication
- bcrypt password hashing

## Included

### User features
- Registration and login
- Personalized trip planner
- Destination recommendation based on style, budget, interests, season, group, accommodation and pace
- Day-by-day itinerary generation
- Estimated trip budget
- Packing checklist saved in the browser
- Save/favorite destinations
- Destination search and filters
- Destination detail pages
- My Trips dashboard
- Share trip link
- Print / Save itinerary as PDF using the browser
- Profile page
- Responsive design
- Real destination photographs from Wikimedia Commons with a local fallback image

### Admin features
- Protected admin panel
- Dashboard statistics
- User management
- Role and status management
- Destination CRUD
- Featured/active destinations
- Itinerary management
- Automatic admin setup
- Automatic starter destination setup

## Setup

### 1. Backend environment

Create `backend/.env` using your existing MongoDB connection and JWT secret:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@wayfarer.com
ADMIN_PASSWORD=Admin@123
```

If your old Phase 1 environment variable is named `MONGODB_URL`, rename it to `MONGODB_URI`.

### 2. Start backend

```bash
cd backend
npm install
npm run dev
```

The server automatically creates/updates the configured admin and synchronizes the starter destinations.

### 3. Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Default admin

```text
Email: admin@wayfarer.com
Password: Admin@123
```

Change the admin password in your `.env` before deploying publicly.

## MongoDB Atlas

For local development, make sure your current IP address is allowed in MongoDB Atlas Network Access. Never commit `.env` to GitHub.

## Final submission checklist

- Do not upload `backend/.env` or any MongoDB password to GitHub.
- Run `npm test` inside `backend` before submission.
- Run `npm run build` inside `frontend` before submission when dependencies are installed.
- The app uses real Wikimedia Commons destination photos; an internet connection is required to display those photos.
- `IMAGE-CREDITS.txt` is included for the destination photographs.

## GitHub submission

Keep your existing repository `.git` folder and replace only the `frontend` and `backend` folders with this project. Keep your private `.env` file locally and do not upload it.
