
const token = require("../services/jwtSign")
const userDao = require("../dao/user.dao")

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
}

module.exports = UserController ;