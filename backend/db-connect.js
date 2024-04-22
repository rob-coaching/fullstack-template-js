import mongoose from 'mongoose'
import dotenv from 'dotenv'

// load all environment variables in file .env into special object process.env
const config = dotenv.config()
console.log("Loaded environment config: ", config)

const strConn = process.env.MONGO_URI;

mongoose.connect(strConn)
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))
