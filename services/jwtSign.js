const jwt = require("jsonwebtoken");

const jwtSign = async (email , username , _id) =>  {
    return await jwt.sign({"email":email , "username":username , "_id":_id} ,process.env.SECRET_JWT)
}

module.exports = jwtSign