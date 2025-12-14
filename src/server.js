import express from "express"
import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./config/db.js";


const port = process.env.PORT || 5000

connectDB()
.then(()=> {
    app.listen(port,()=>{
        console.log(`App is listening on port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})