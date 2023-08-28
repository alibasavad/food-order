// import mongoose from "mongoose";
const express = require('express')


const app = express()
const PORT = 8000

app.get('/' , (req,res)=>{
    res.send("Hello Hungry Users :)")
})

app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`);
})