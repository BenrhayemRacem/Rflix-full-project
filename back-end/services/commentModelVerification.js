const joi = require("joi") ;

const commentSchema =  joi.object({

    email:joi.string().email().required(),
    movie_id: joi.string().required(),
    description :joi.string().required(),

})

const validateComment = async (comment)=> {
    try {
        await commentSchema.validateAsync(comment);
        return {"success" : true ,  "message": "comment is valid"}
    }catch(error) {
        return   {"success" : false ,  "message": error.toString()}

    }

}
module.exports = validateComment;