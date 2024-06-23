// this lib will handle ALL errors thrown in async functions (so e.g. all mongoose errors)
// and forwards them to the central error handler!
import "express-async-errors";
import "./db-connect.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";
import { guard } from "./middleware/guard.js";

const app = express();

app.use(cors()); // ALLOW ACCESS TO BACKEND FROM BROWSER (=from fetch)
app.use(express.json()); // PARSE INCOMING JSON DATA into special variable req.body

// HOME route
app.get("/", (req, res) => {
  res.send("Hello from API!");
});

// load routers
app.use("/auth", authRouter);
app.use("/users", guard, usersRouter);

// 404 handler (=> handles non existing routes)
app.use((req, res, next) => {
  next({
    error: "Route does not exist",
    status: 404,
  });
});

// general error handler => handles all incoming errors
app.use((err, req, res, next) => {
  const errorCode = err.status || 500; // if no concrete status code set => use 500 (server error)
  res
    .status(errorCode)
    .json({ error: err.message || err.error || err.err || err });
});

// start API on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
