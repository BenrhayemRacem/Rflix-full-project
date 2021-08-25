const commentModel = require("../models/commentModel")
const getCommentsByMovieIdPipeline = require("../services/CommentsPipelineFn");

class commentDao {
    static async addCommentToDb (comment) {
        try {
            const commentToSave = new commentModel(comment);

            await commentToSave.save() ;
            return {"success" : true , "message" : "comment added successfully"}

        }catch (error) {
            console.log("error in adding a comment: " + error)

            return {"success" : false , "message" : "error in adding a comment"}
        }
    }
    static async findCommentById(id) {
        try {
            const comment = await  commentModel.findById(id) ;
            return {"success" : true , "comment" : comment}
        } catch (error) {
            console.log("error in finding a comment by id" + error)
            return {"success" : false , "comment" : null}
        }
    }
    static async deleteCommentById(id) {
        try {
            await commentModel.findByIdAndDelete(id);
            return {"deleted" : true}
        }catch (e) {
            console.log("error in deleting a comment: "+e)
            return {"deleted" : false}
        }
    }
    static async updateCommentDescription(commentId , description ) {
        try {
            await  commentModel.findOneAndUpdate({"_id": commentId},
                            {"description":description}).exec() ;
            return {success : true}
        } catch (e) {
            console.log("error when  updating a comment body: " + e);
            return {success : false}
        }
    }
    static async getCommentsOfAMovie (movieId){
        try {

            const movieList = await commentModel.aggregate(getCommentsByMovieIdPipeline(movieId)).exec()
            return {"success" : true , "movieList" : movieList}


        } catch (e) {
            console.log("error when searching comments of a movie: " + e) ;
            return {"success" : false , "movieList" : null}
        }
    }
}


module.exports = commentDao ;