// import mongoose from "mongoose";
// import DB_NAME from "./constant";
// import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
  path:"./env"
})

connectDB()
// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error",(error)=>{
//       console.log("Err",error);
//       throw error
//     })
//     app.listen(process.env.PORT,()=>{
//       console.log(`Server is running on Port: ${process.env.PORT}`)
//     })
//   } catch (error) {
//     console.error("ERROR : ", error);
//     throw err;
//   }
// })();
