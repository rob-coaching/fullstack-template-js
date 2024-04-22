import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // input data validation
  if (!email || !password) {
    return next({
      error: "Please provide email & oassword field",
      status: 400,
    });
  }

  try {
    // check if user exists + include password hash in result!
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next({
        error: "User with these credentials does not exist",
        status: 400,
      });

    // user found => match password with password hash!
    if (!bcrypt.compareSync(password, user.password)) {
      next({
        error: "User with these credentials does not exist",
        status: 400,
      });
    }

    // user found! create token!
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME
    });
    const userPublic = user.toObject()
    delete userPublic.password
    res.json({ ...userPublic, token });
  } catch (err) { next(err) }
});

authRouter.post("/signup", async (req, res, next) => {

  const { email, password } = req.body

  if(!email || !password) {
    return next({ error: "Please provide email & password", status: 400 })
  }

  try {
    // check if user already exists!
    const userFound = await User.findOne({ email });

    if (userFound) {
      return next({ error: "User already exists", status: 400 });
    }

    req.body.password = bcrypt.hashSync(password)
    const userNew = await User.create(req.body);
    const userPublic = userNew.toObject()
    delete userPublic.password
    res.json(userPublic);
  } catch (err) {
    next(err);
  }
});

export default authRouter;
