import './db-connect.js'
import express from "express";
import cors from 'cors';
import User from './models/User.js';
import { guard } from './middleware/guard.js';
import authRouter from './routes/auth.router.js'
const app = express();

app.use(cors()) // ALLOW ACCESS TO BACKEND FROM BROWSER (=from fetch)
app.use(express.json()) // PARSE INCOMING JSON DATA into special variable req.body

// HOME route
app.get("/", (req, res) => {
  res.send("Hello from API!");
});

// Protected route
// Call this route to check if your token is valid
app.get("/me", guard, (req, res) => {
  res.json(req.user) // if authentication worked => req.user will contain the logged in user!
})

// USERS route (protect if ya want using "guard" middleware)
app.get("/users", async (req, res) => {
  const usersAll = await User.find()
  res.json( usersAll ) 
})

// load routers
app.use("/auth", authRouter);

// 404 handler (=> handles non existing routes)
app.use((req, res, next) => {
  next({
    error: "Route does not exist",
    status: 404
  })
})

// general error handler => handles all incoming errors
app.use((err, req, res, next) => {
  const errorCode = err.status || 500 // if no concrete status code set => use 500 (server error)
  res.status(errorCode).json({ error: err.message || err.error || err.err || err })
})

// start API on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
