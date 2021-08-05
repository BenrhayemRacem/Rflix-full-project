
const movieModel = require("../models/movieModel") ;
const movieDao = require("../dao/movie.dao")


class movieController {
   static  async getMovieById (req,res) {
       const id = req.params.id ;
       try{
           const movie = await movieModel.findById(id) ;
           if(movie) {
               res.status(200).send(movie);
           } else {
               res.status(404).send("no movie matched your search")
           }
       }catch (error) {
           res.status(500).send(error)
       }
   }
   static async searchMovieByFilter (req,res) {
       let page ;
       try {
           page = req.query.page ? parseInt(req.query.page , 10) :0
       }catch (error){
           console.log("bad value for page" + e)
           page=0
       }
       let searchType ;
       try {
           searchType = Object.keys(req.query)[0]

       }catch (error) {
           console.log("no search key specified")
       }
       let filters = {}

       switch (searchType) {
           case "genre":
               if (req.query.genre !== "") {
                   filters.genre = req.query.genre
               }
               break
           case "cast":
               if (req.query.cast !== "") {
                   filters.cast = req.query.cast
               }
               break
           case "title":
               if (req.query.title !== "") {
                   filters.title = req.query.title

               }
               break
           default:
           // nothing to do
       }
       const {success , searchedList} = await movieDao.getMoviesByFilter({
           filters,
           page
       })

       if(success) {
           if(!searchedList) {
               res.send("no movie matched your search")
           }else {
               res.send(searchedList)
           }

       }else {
           res.send(success)
       }
   }


}

module.exports = movieController ;