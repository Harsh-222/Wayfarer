# Wayfarer Deployment Guide

## Backend — Render
1. Create a new Web Service and connect the GitHub repository.
2. Set the root directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `PORT=10000` (Render can provide PORT automatically)
   - `MONGODB_URI=<your MongoDB Atlas connection string>`
   - `JWT_SECRET=<strong random secret>`
   - `CLIENT_URL=<your Vercel frontend URL>`
   - `ADMIN_EMAIL=<admin email>`
   - `ADMIN_PASSWORD=<admin password>`
6. In MongoDB Atlas Network Access, allow the Render service IPs as required by your Atlas setup.

## Frontend — Vercel
1. Import the same GitHub repository.
2. Set the root directory to `frontend`.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. If your deployment uses a different API URL, update `frontend/src/api/axios.js` to point to the deployed backend.

## Local testing
Backend:
`npm install && npm test && npm run dev`

Frontend:
`npm install && npm run dev`
