const commentValidator = require("../services/commentModelVerification");
const commentModel = require("../models/commentModel");
const getCommentsByMovieIdPipeline = require("../services/CommentsPipelineFn")


class CommentController {
    static async addComment(req,res) {
        const {email,movie_id,description} = req.body;
        const {authEmail , isAdmin} = req.infos ;
        if(authEmail===email || isAdmin) {
            const comment = {email,movie_id,description} ;
            const {success ,message} =  await commentValidator(comment) ;
            if(!success) {
                res.status(409).send(message) ;
            }else {
                try {
                    const commentToSave = new commentModel(comment);

                    await commentToSave.save() ;
                    res.send("comment added successfully").status(201)
                }catch (error) {
                    res.status(500).send("error in adding a comment")
                }
            }
        } else {
            res.status(403).send("you are not allowed to comment please verify your credentials or contact the admin")
        }

    }

    static async deleteComment(req,res) {
        const commentId = req.params.id ;
        try {
            const comment= await commentModel.findById(commentId) ;
            const {authEmail , isAdmin} = req.infos ;
            if( !comment) {
                res.status(404).send("no comment matched your search")
            } else if( authEmail===comment.email || isAdmin) {
            await commentModel.findByIdAndDelete(commentId);
            res.status(200).send("deleted successfully")
            } else {
                res.status(403).send("you are not allowed to delete this comment")
            }
        }  catch (error) {
            res.status(500).send(error.toString())
        }


    }
    static async updateComment (req,res) {
        const commentId = req.params.id ;
        try {
            const comment= await commentModel.findById(commentId) ;
            const {authEmail , isAdmin} = req.infos ;
            const {description} = req.body;
            if(!description) {
                res.status(400).send("please provide a valid comment")
            } else if( !comment) {
                res.status(404).send("no comment matched your search")
            } else if( authEmail===comment.email || isAdmin) {
                await commentModel.findOneAndUpdate({"_id": commentId},
                    {"description":description}).exec() ;
                res.status(200).send("comment edited successfully") ;
            }else {
                res.status(403).send("you are not allowed to update this comment")
            }
        }catch (e) {
            res.status(500).send(e);
        }
    }
    static async getCommentsByMovieId(req,res) {

        const movieId = req.params.id;

         try {

             const movieList = await commentModel.aggregate(getCommentsByMovieIdPipeline(movieId)).exec()

               if( ! movieList.length<1) {
                   res.status(200).send(movieList);
               } else {
                   res.status(404).send("no comments matched your search ");
               }


         } catch (e) {
             res.status(500).send(e);
         }

    }



}







module.exports = CommentController ;