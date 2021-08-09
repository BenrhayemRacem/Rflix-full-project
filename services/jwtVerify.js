const jwt = require("jsonwebtoken");


const jwtVerify = async (req,res,next)=> {
    const token = req.headers.token;
    if(token) {
        try {
            const {email,isAdmin} = await jwt.verify(token , process.env.SECRET_JWT) ;
           req.infos= {"authEmail":email,isAdmin} ;
            next();
        }catch (err) {
            res.send(err).status(400)
        }
    } else {
        res.send("you are not authorized").status(401);
    }


}

module.exports = jwtVerify;