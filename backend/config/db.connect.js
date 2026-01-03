import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async()=>{
    try{
      const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}