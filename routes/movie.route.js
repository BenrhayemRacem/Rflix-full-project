const express = require("express");
const  router = express.Router();

const movieController = require("../controllers/movie.controller") ;


router.get("/getMovieById/:id" , movieController.getMovieById) ;
router.get("/search" , movieController.searchMovieByFilter) ;



module.exports = router;