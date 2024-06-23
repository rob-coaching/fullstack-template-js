import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

// load all environment variables in file .env into special object process.env
const config = dotenv.config()
console.log("Loaded environment config: ", config)

export const prisma = new PrismaClient();
