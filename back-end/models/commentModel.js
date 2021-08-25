const mongoose = require("mongoose");
const {Schema} = mongoose ;

const commentSchema =  new Schema({
    email: {type: String , required:true , unique:true} ,
    movie_id : {type: String , required:true },
    description :{type: String , required:true},
} , {timestamps : true}) ;

const commentModel = mongoose.model('comment' , commentSchema);

module.exports = commentModel ;