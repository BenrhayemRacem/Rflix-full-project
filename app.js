const express = require("express");
const cors = require("cors")
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5500
const authRouter = require("./routes/auth.route");
const commentRouter = require("./routes/comment.route")
const movieRouter = require("./routes/movie.route")
const userRouter = require("./routes/user.route")
const jwtVerify = require("./services/jwtVerify")

app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
 app.use("/api/auth" , authRouter) ;
app.use("/api/movie" , movieRouter) ;
 app.use("/api/comment"  , commentRouter) ;
 app.use("/api/user" ,userRouter )


// starting DB server then app server
mongoose.connect(process.env.DATABASE_URI,
    {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true , useFindAndModify:false })
    .then(()=>{
    console.log( "connected to DB") ;
    app.listen(PORT , () => console.log("server is running on port " + PORT))
})
    .catch(err => console.log ("error while connecting to DB" + err));