const userModel = require("../models/userModel");
const passwordEncryption = require("../services/passwordEncryption")
const validateUser = require("../services/userModelVerification")
const userController = require("./user.controller");
const decryptPassword = require("../services/passwordDecryption");

 class authController {
     static async registerOneUser(req,res) {
         const {email , username , password  , repeat_password } = req.body;
         const user = {email:email , username:username , password:password , repeat_password :repeat_password };
         const {message ,  success} =  await validateUser(user) ;
         if (!success) {
             res.status(409).send(message);
         }else {
             let hashedPassword = await passwordEncryption(password);
             while (hashedPassword===password) {
                 hashedPassword =  await passwordEncryption(password);
             }
             const validUser = {email:email ,username:username,password:hashedPassword};
             const userToSave = new userModel(validUser);
             try {
                 const result = await userToSave.save();
                 res.send(result).status(201);
             } catch(err) {
                 if ( err.toString().startsWith("MongoError: E11000 duplicate key error")) {
                     res.send("this user already exists").status(400) ;
                 }

             }
         }

     }
     static  async  login (req , res) {
         const {email,password} = req.body ;
         const {success , user} = await userController.getOneUserByEmail(email);
         if(!success) {
             res.send("please verify your email or create an account").status(400)
         }
         else {
             const {result ,success} = await decryptPassword(password , user.password) ;
             if(!success) {
                 res.send("error while logging in please try again").status(500)
             }else{
                 if (!result) {
                     res.status(403).send("verify your password");
                 }
                 else {

                     const {success} = await userController.addJwtToUser(email,user.isAdmin);
                     if(!success) {
                         res.send("error while logging in please try again").status(500)
                     }else{
                         res.send("logged in").status(200)
                     }

                 }
             }

         }

     }
 }


 module.exports = authController ;