const commentValidator = require("../services/commentModelVerification");
const commentDao = require("../dao/comment.dao")
const movieDao = require("../dao/movie.dao") ;


class CommentController {
    static async addComment(req,res) {
        const {email,movie_id,description} = req.body;
        const movieExists = await movieDao.getMovieById(movie_id);
        if(movieExists.success && movieExists.movie) {
            const {authEmail , isAdmin} = req.infos ;
            if(authEmail===email || isAdmin) {
                const comment = {email,movie_id,description} ;
                const {success ,message} =  await commentValidator(comment) ;
                if(!success) {
                    res.status(409).send(message) ;
                }else {
                    const daoResponse = await commentDao.addCommentToDb(comment) ;
                    if(daoResponse.success) {
                        res.status(201).send(daoResponse.message)
                    } else {
                        res.status(500).send(daoResponse.message)
                    }
                }
            } else {
                res.status(403).send("you are not allowed to comment please verify your credentials or contact the admin")
            }
        } else {
            res.status(404).send("no movie matched your search") ;
        }


    }
    static async deleteComment(req,res) {
        const commentId = req.params.id ;
        const {success , comment} = await commentDao.findCommentById(commentId) ;
        if(!success) {
            res.status(500).send("error in finding the wanted comment")
        } else if (!comment) {
            res.status(404).send("no comment found")
        } else {
            const {authEmail , isAdmin} = req.infos ;
            if(authEmail===comment.email ||isAdmin){
                const {deleted} = await commentDao.deleteCommentById(commentId);
                if(deleted) {
                    res.status(200).send("deleted successfully");
                } else {
                    res.status(500).send("error when trying to delete a comment")
                }
            } else {
                res.status(403).send("you are not allowed to delete this comment")
            }
        }




    }
    static async updateComment (req,res) {
        const commentId = req.params.id ;
        const {success , comment} = await commentDao.findCommentById(commentId);
        if(!success) {
            res.status(500).send("error in finding the wanted comment")
        } else if (!comment) {
            res.status(404).send("no comment found")
        } else {
            const {authEmail , isAdmin} = req.infos ;
            const {description} = req.body;
            if(!description) {
                res.status(400).send("please provide a valid comment")
            } else if (authEmail===comment.email || isAdmin) {
                const updated = await commentDao.updateCommentDescription(commentId,description) ;
                if(updated.success) {
                    res.status(200).send("comment edited successfully") ;
                } else {
                    res.status(500).send("error occurred when updating a comment");
                }
            } else {
                res.status(403).send("you are not allowed to update this comment") ;
            }
        }

     }
    static async getCommentsByMovieId(req,res) {
        const movieId = req.params.id;
        const {success , movieList} = await commentDao.getCommentsOfAMovie(movieId);
        if (!success) {
            res.status(500).send("error in searching comments of a movie");
        } else if( movieList.length >=1) {
            res.stat(200).send(movieList);
        } else {
            res.status(404).send("no comments matched your search ");
        }
    }
}







module.exports = CommentController ;