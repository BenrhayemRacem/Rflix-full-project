const getCommentsByMovieIdPipeline = (movieId) => {
    return  [
        {"$match" : {"movie_id" : movieId}},
        {"$sort": {"updatedAt":-1} },
        {"$lookup": {
                "from": "users",
                "let" : {"userEmail" :"$email" },
                "pipeline":[
                    {
                        "$match": { "$expr" : {"$eq" : ["$$userEmail" , "$email"]}}
                    } ,
                    {
                        "$project" : {"username" :1 , "_id":0 , "profilePicture":1}
                    }
                ],

                "as":"commenter"
            }

        },

    ]


}

module.exports = getCommentsByMovieIdPipeline ;