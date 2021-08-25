const mongoose = require ("mongoose") ;

const movieSchema = new mongoose.Schema ({
    plot : {type:String} ,
    genres:{type:Array},
    runtime: {type:"Number"},
    cast : {type:Array},
    title : {type:String},
    fullplot: {type:String},
    countries:{type:Array},
    released:{type:Date},
    directors:{type:Array},
    awards:{ wins:{type:Number} , nominations:{type:Number}},
    year:{type:Number},
    writers:{type:Array},
    poster:{type:String},
    imdb: {rating:{type:mongoose.Decimal128}, votes:{type:Number} , id :{type:Number}},
    type:{type:String},

})

const movieModel = mongoose.model("movie" , movieSchema);

module.exports = movieModel ;