import { Router } from "express";
import { prisma } from "../db-connect.js";

const usersRouter = Router();

// Protected route
// Call this route to check if your token is valid
usersRouter.get("/me", (req, res) => {
  res.json(req.user); // if authentication worked => req.user will contain the logged in user!
});

// USERS route (protect if ya want using "guard" middleware)
usersRouter.get("/", async (req, res) => {
  const usersAll = await prisma.user.findMany();
  res.json(usersAll);
});

usersRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const idNum = Number(id)
  if(!idNum) {
    return next({ error: "Invalid ID value "+id})
  }
  const user = await prisma.user.findUnique({
    where: {
      id: idNum,
    },
  });
  res.json(user);
});

usersRouter.patch("/:id", async (req, res, next) =>{
  const { id } = req.params;
  const idNum = Number(id);
  if (!idNum) {
    return next({ error: "Invalid ID value " + id });
  }
  const user = await prisma.user.update({
    data: req.body,
    where: {
      id: idNum,
    },
  });
  res.json(user);
})

usersRouter.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    const idNum = Number(id);
    if (!idNum) {
      return next({ error: "Invalid ID value " + id });
    }
    const user = await prisma.user.delete({
      where: {
        id: idNum,
      },
    });
    res.json(user);
})

export default usersRouter;
