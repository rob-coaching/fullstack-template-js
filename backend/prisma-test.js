import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const users = await prisma.user.findMany()
  console.log(users)
  // const userNew = await prisma.user.create({
  //   data: {
  //     username: "Bob",
  //     password: "bob123",
  //     email: "bob@prisma.io",
  //   },
  // });
  // console.log(userNew);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
