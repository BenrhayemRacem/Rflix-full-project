const userModel = require("../models/userModel")

class userDao {

    static async addUserToDB (user) {
        const userToSave = new userModel(user);
                try {
                    const result = await userToSave.save();
                    return { savedUser:result}
                }catch (error) {


                    return  { savedUser:null}
                }

    }
    static async getUserByEmail(email) {
        try {
            const result = await userModel.findOne({"email": email}).exec();

            return {"success": true, "user": result}
        } catch (e) {
            console.log("error when searching a user by email" + e);
            return {success: false, user: null}
        }
    }
    static async getUserDetails (email) {
        try{
            const result = await userModel.findOne({"email": email} ,
                {"password":0 ,"jwt":0 ,"isAdmin":0 ,"_id":0}).exec()
            return {"success" : true , "user" :result}

        }catch (e) {
            console.log("error when searching a user by email" + e);
            return {success: false, user: null}
        }
    }
    static async getUserByEmailAndUpdateJwt (email , jwt) {
        try {

            await userModel.findOneAndUpdate({"email" : email} , {"jwt":jwt} , {new:true}  );
            return {"success": true};
        }catch (error) {
            console.log(error);
            return {"success":false};
        }
    }
    static async movieExistsInFavouritesArray (email , movieId) {

            const {success , user} = await this.getUserByEmail(email) ;
            if(success && user) {
                const found = user.favourites.find(element => element===movieId);

                return{"success" : true , "found" : found}
            }
            return {"success" : false , "found" : null}

    }
    static async getUserByEmailAndAddToFavourites(email , movieId) {
        try {
            const {success,found} = await  this.movieExistsInFavouritesArray(email,movieId) ;
            if(success && found) {
                return {"success" : false , "message" : "movie already exists in favourites"}
            }
            await userModel.findOneAndUpdate({"email" : email} ,{"$push" : {"favourites":movieId} } ,{new:true});

            return {"success" : true , "message" : "movie added to favourites successfully"};
        }catch (e) {
            console.log("error when adding in favourites :  error : " +e)
            return {"success" : false , "message" : "error when adding a movie to favourites"}
        }
    }
    static async movieExistsInWatchLaterArray (email , movieId) {

        const {success , user} = await this.getUserByEmail(email) ;

        if(success && user) {
            const found = user.watchLater.find(element => element===movieId);
            return{"success" : true , "found" : found}
        }
        return {"success" : false , "found" : null}

    }
    static async getUserByEmailAndAddToWatchLater(email , movieId) {
        try {
            const {success,found} = await this.movieExistsInWatchLaterArray(email,movieId) ;
            if(success && found) {
                return {"success" : false , "message" : "movie already exists in watch Later"}
            }
             await userModel.findOneAndUpdate({"email" : email} ,{"$push" : {"watchLater":movieId} } ,{new:true});

            return {"success" : true , "message" : "movie added to watch later successfully"};
        }catch (e) {
            console.log("error when adding in watch later :  error : " +e)
            return {"success" : false , "message" : "error when adding a movie to watch later"}
        }
    }

    static async getUserByEmailAndDeleteFromFavouritesArray (email , movieId)  {
        try {
            const {success,found} =  await this.movieExistsInFavouritesArray(email,movieId) ;
            if(success && found) {
                 await userModel.findOneAndUpdate({"email" : email} , {"$pull":{"favourites" : movieId}}, {new:true})
                return {"success" : true , "message" : "movie removed to favourites successfully"};
            }
            return {"success" : false , "message" : "movie is not existing favourites"}

        }catch (error) {
            console.log("error when removing from favourites :  error : " +error)
            return {"success" : false , "message" : "error when removing from favourites "}
        }
    }
    static async getUserByEmailAndDeleteFromWatchLaterArray (email , movieId)  {
        try {
            const {success,found} = await this.movieExistsInWatchLaterArray(email,movieId) ;
            if(success && found) {
                await userModel.findOneAndUpdate({"email" : email} , {"$pull":{"watchLater" : movieId}}, {new:true})
                return {"success" : true , "message" : "movie removed from watch later successfully"};
            }
            return {"success" : false , "message" : "movie is not existing in watch Later"}

        }catch (error) {
            console.log("error when removing from watch later :  error : " +error)
            return {"success" : false , "message" : "error when removing from watch later "}
        }
    }

}

module.exports = userDao ;