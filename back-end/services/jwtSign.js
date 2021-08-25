const jwt = require("jsonwebtoken");

const jwtSign = async (email   , isAdmin) =>  {
    return await jwt.sign({"email":email , "isAdmin":isAdmin  } ,process.env.SECRET_JWT)
}

module.exports = jwtSign