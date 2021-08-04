const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route");

app.use(express.json());
 app.use("/api/auth" , authRouter) ;


mongoose.connect(process.env.DATABASE_URI,
    {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true , useFindAndModify:false })
    .then(()=>{
    console.log( "connected to DB") ;
    app.listen(5000 , () => console.log("server is running"))
})
    .catch(err => console.log ("error while connecting to DB" + err));