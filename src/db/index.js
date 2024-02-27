import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"  

const  connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nDatabase Connected !!DB HOST: ${connectionInstance.connection.host}`)
        connectionInstance.connection.on('connected', () => {
            console.log(`MongoDB connected! Host: ${connectionInstance.connection.host}`);
        });
  
        connectionInstance.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        connectionInstance.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });      
    } catch (error) {
        console.log("Database Error :",error)
        process.exit(1)
        
    }
}

export default connectDB;