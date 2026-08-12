# Wayfarer — Personalized Travel Itinerary Generator

Interdisciplinary college project (BCA + BTech) — **Phase 1 deliverable**.

Phase 1 covers the full-stack foundation: auth, data model, a working
rule-based itinerary engine, and a usable UI. Phase 2 (owned by the BTech
team) will swap the matching logic in `backend/controllers/itineraryController.js`
for a real recommendation algorithm without changing the API — the routes,
request/response shapes, and database schema are designed to stay stable.

## Phase 1 objectives

1. **System design** — define the data model (User, Preference, Itinerary)
   and the API contract that later phases will build on.
2. **User authentication** — registration and login with hashed passwords
   (bcrypt) and JWT-based sessions.
3. **Preference capture UI** — a React + Tailwind form that collects
   destination type, budget, trip duration, interests, and group type.
4. **Rule-based itinerary engine** — a Node/Express + MongoDB backend that
   scores a seeded destination dataset against the submitted preferences and
   generates a day-by-day plan with an estimated cost.
5. **End-to-end integration** — the frontend and backend talk over a REST
   API, itineraries persist in MongoDB, and users can revisit past trips from
   a dashboard.

## Tech stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express (ES modules), JWT, bcryptjs
- **Database:** MongoDB + Mongoose

## Project structure

```
travel-itinerary-app/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # User, Preference, Itinerary schemas
│   ├── controllers/              # auth + itinerary business logic
│   ├── routes/                   # /api/auth, /api/itineraries
│   ├── middleware/authMiddleware.js
│   ├── data/destinations.js      # seeded dataset for the rule-based engine
│   └── server.js
└── frontend/
    └── src/
        ├── pages/                 # Home, Login, Register, PreferenceForm,
        │                          # Itinerary, Dashboard
        ├── components/            # Navbar, ProtectedRoute
        ├── context/AuthContext.jsx
        └── api/axios.js
```

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env     # then edit MONGO_URI / JWT_SECRET if needed
npm install
npm run dev               # starts on http://localhost:5000
```

Requires a running MongoDB instance (local `mongod`, or a free MongoDB Atlas
cluster — put its connection string in `MONGO_URI`).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev               # starts on http://localhost:5173
```

The frontend expects the API at `http://localhost:5000/api` by default. To
point elsewhere, create `frontend/.env` with:

```
VITE_API_URL=http://localhost:5000/api
```

## API reference (for the BTech team / Phase 2)

| Method | Route                  | Auth | Description                              |
|--------|-------------------------|------|-------------------------------------------|
| POST   | `/api/auth/register`    | No   | Create a user, returns `{ user, token }`  |
| POST   | `/api/auth/login`       | No   | Log in, returns `{ user, token }`         |
| GET    | `/api/auth/me`          | Yes  | Get the logged-in user's profile          |
| POST   | `/api/itineraries`      | Yes  | Submit preferences, get a generated trip  |
| GET    | `/api/itineraries`      | Yes  | List the user's past itineraries          |
| GET    | `/api/itineraries/:id`  | Yes  | Fetch one itinerary                       |

Auth routes marked "Yes" expect `Authorization: Bearer <token>`.

### Where Phase 2 plugs in

`scoreDestination()` in `backend/controllers/itineraryController.js` is the
entire matching algorithm right now — it's intentionally simple (a few
`+= points` rules) so the BTech team can drop in a real recommender
(content-based filtering, collaborative filtering, ML ranking, etc.) using
the same `Preference` input and the same `destinations` dataset shape,
without touching the routes, models, or frontend.

## Notes

- Passwords are hashed with bcrypt before storage; raw passwords are never
  saved or logged.
- The seeded dataset in `data/destinations.js` currently covers six
  destinations (Goa, Manali, Jaipur, Bengaluru, Jim Corbett, Rishikesh) —
  enough to demonstrate the full flow; Phase 2 can extend or replace it.
- This build was syntax-checked but not `npm install`-verified in the
  sandbox it was generated in (no network access there) — run `npm install`
  locally in both `backend/` and `frontend/` before demoing.
