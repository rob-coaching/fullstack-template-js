import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../db-connect.js";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // input data validation
  if (!email || !password) {
    return next({
      error: "Please provide email & password field",
      status: 400,
    });
  }

  try {
    // check if user exists + include password hash in result!
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return next({
        error: "User with these credentials does not exist",
        status: 400,
      });

    // user found => match password with password hash!
    if (!bcrypt.compareSync(password, user.password)) {
      return next({
        error: "User with these credentials does not exist",
        status: 400,
      });
    }

    // user found! create token!
    delete user.password;
    const tokenPayload = { _id: user.id, username: user.username };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    res.json({ ...user, token });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({ error: "Please provide email & password", status: 400 });
  }

  try {
    // check if user already exists!
    const userFound = await prisma.user.findUnique({
      where: { email },
    });

    if (userFound) {
      return next({ error: "User already exists", status: 400 });
    }

    req.body.password = bcrypt.hashSync(password);
    const userNew = await prisma.user.create({
      data: req.body,
    });
    delete userNew.password;
    res.json(userNew);
  } catch (err) {
    next(err);
  }
});

export default authRouter;
