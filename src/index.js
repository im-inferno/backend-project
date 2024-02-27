// import mongoose from "mongoose";
// import DB_NAME from "./constant";
// import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./App.js"
dotenv.config({
  path:"./env"
})


connectDB()
.then(()=>{
      app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port : ${process.env.PORT}`)
      })
      app.on((error)=>{
        console.log(`error!`,error)
      })
})
.catch((err)=>{
  console.log(`MongoDB Connnection Error!`,err)
})


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
