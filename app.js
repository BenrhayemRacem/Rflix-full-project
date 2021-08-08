const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route");
const commentRouter = require("./routes/comment.route")
const movieRouter = require("./routes/movie.route")
const userRouter = require("./routes/user.route")
const jwtVerify = require("./services/jwtVerify")


app.use(express.json());
app.use(express.urlencoded({extended:true}));

 app.use("/api/auth" , authRouter) ;
app.use("/api/movie" , movieRouter) ;
 app.use("/api/comment" , jwtVerify, commentRouter) ;
 app.use("/api/user" ,userRouter )



mongoose.connect(process.env.DATABASE_URI,
    {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true , useFindAndModify:false })
    .then(()=>{
    console.log( "connected to DB") ;
    app.listen(5000 , () => console.log("server is running"))
})
    .catch(err => console.log ("error while connecting to DB" + err));