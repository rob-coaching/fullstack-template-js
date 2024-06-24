import { Router } from "express";
import { prisma } from "../db-connect.js";

const postsRouter = Router();

// USERS route (protect if ya want using "guard" middleware)
postsRouter.get("/", async (req, res) => {
  const postsAll = await prisma.post.findMany();
  res.json(postsAll);
});

postsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const idNum = Number(id);
  if (!idNum) {
    return next({ error: "Invalid ID value " + id });
  }
  const post = await prisma.post.findUnique({
    where: {
      id: idNum,
    },
    include: {
      author: true
    }
  });
  res.json(post);
});

postsRouter.post("/", async (req, res, next) => {
  const postNew = await prisma.post.create({
    data: { ...req.body, authorId: req.user._id },
  });
  res.json(postNew)
})

postsRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const idNum = Number(id);
  if (!idNum) {
    return next({ error: "Invalid ID value " + id });
  }
  const post = await prisma.post.update({
    data: req.body,
    where: {
      id: idNum,
    },
  });
  res.json(post);
});

postsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const idNum = Number(id);
  if (!idNum) {
    return next({ error: "Invalid ID value " + id });
  }
  const post = await prisma.post.delete({
    where: {
      id: idNum,
    },
  });
  res.json(post);
});

export default postsRouter;
