
const token = require("../services/jwtSign")
const userDao = require("../dao/user.dao")
const movieDao = require("../dao/movie.dao")

class UserController{


    static async addJwtToUser (email , isAdmin) {
        try {
            const jwt = await token(email,isAdmin);

            const {success} = await userDao.getUserByEmailAndUpdateJwt(email , jwt) ;
            return {success :success}
        }catch (e) {
            console.log("error when generating a jwt" + e) ;
            return {success:false} ;
        }


    }
    static  async addMovieToFavourites (req,res) {
        const {email , movieId } = req.body ;
        const movieExists = await movieDao.getMovieById(movieId);
        if(movieExists.success && movieExists.movie) {
            const {success , message} = await userDao.getUserByEmailAndAddToFavourites(email , movieId);
            if(success) {
                res.status(200).send(message)
            } else {
                res.status(500).send(message)
            }
        }else  {
            res.status(404).send("no movie matched your request")
        }

    }
    static  async addMovieToWatchLater (req,res) {
        const {email , movieId } = req.body ;
        const movieExists = await movieDao.getMovieById(movieId);
        if(movieExists.success && movieExists.movie) {
            const {success , message} = await userDao.getUserByEmailAndAddToWatchLater(email , movieId);
            if(success) {
                res.status(200).send(message)
            } else {
                res.status(500).send(message)
            }
        } else {
            res.status(404).send("no movie matched your request")
        }

    }
    static async deleteMovieFromFavourites (req , res) {
        const {email , movieId} = req.body ;
        const movieExists = await movieDao.getMovieById(movieId);
        if(movieExists.success && movieExists.movie) {
            const {success , message} = await userDao.getUserByEmailAndDeleteFromFavouritesArray(email,movieId);
            if(success) {
                res.status(200).send(message)
            } else {
                res.status(500).send(message)
            }
        } else {
            res.status(404).send("no movie matched your request")
        }



    }
    static async deleteMoviesFromWatchLater(req , res) {
        const {email , movieId} = req.body ;
        const movieExists = await movieDao.getMovieById(movieId);
        if(movieExists.success && movieExists.movie) {
            const {success , message} = await userDao.getUserByEmailAndDeleteFromWatchLaterArray(email,movieId);
            if(success) {
                res.status(200).send(message)
            } else {
                res.status(500).send(message)
            }
        } else {
            res.status(404).send("no movie matched your request")
        }
    }

}

module.exports = UserController ;