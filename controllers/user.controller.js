const userModel = require("../models/userModel")
const token = require("../services/jwtSign")

class UserController{
    static  async getOneUserByEmail (email) {
        const result = await userModel.findOne({"email":email}).exec();
        if(!result) {
            return {"success" : false , "user" : result}
        }
        return {"success" : true , "user":result}

    }

    static async addJwtToUser (email , username , _id) {
        const jwt = await token(email,username,_id);
        try {

            await userModel.findOneAndUpdate({"email" : email} , {"jwt":jwt} ,{"new":true});
            return {"success": true};
        }catch (error) {
            console.log(error);
            return {"success":false};
        }


    }
}

module.exports = UserController ;