import mongoose from "mongoose"; 
import express from 'express'

const app = express();


export async function connect_To_Mongo(PORT, MONGO_URI){
    try{
       await mongoose.connect(MONGO_URI)
       app.listen(PORT, () =>{
        console.log(`Boss we have connected to MONGO,
We are now live in port ${PORT}`);
    })
    }
    catch(err){
        console.error(err.message);
    }
}
