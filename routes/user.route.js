const express = require("express");
const  router = express.Router();

const userController = require("../controllers/user.controller") ;


router.post("/favourites/add" , userController.addMovieToFavourites) ;
router.post("/watchLater/add" , userController.addMovieToWatchLater) ;
router.put("/favourites/remove" , userController.deleteMovieFromFavourites) ;
router.put("/watchLater/remove" , userController.deleteMoviesFromWatchLater);
router.post("/watchLater/check" , userController.movieExistsInWatchLater) ;
router.post("/favourites/check" , userController.movieExistsInFavourites);
router.get("/details/:email" , userController.getUserDetails) ;



module.exports = router;