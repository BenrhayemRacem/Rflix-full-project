
const passwordEncryption = require("../services/passwordEncryption")
const validateUser = require("../services/userModelVerification")
const userController = require("./user.controller");
const decryptPassword = require("../services/passwordDecryption");
const userDao = require("../dao/user.dao")

 class authController {
     static async registerOneUser(req,res) {
         const {email , username , password  , repeat_password } = req.body;
         const result = await userDao.getUserByEmail(email) ;
         if( result.success && result.user ) {
             res.status(400).send("this email is already used")
         } else {
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

                 const {savedUser} = await userDao.addUserToDB(validUser);
                 if(! savedUser) {
                     res.status(500).send("an error occurred while registering a user")
                 } else {
                     res.status(201).send("user registered successfully");
                 }

             }
         }


     }
     static  async  login (req , res) {
         const {email,password} = req.body ;

         const {success , user} = await userDao.getUserByEmail(email);
         if(!success) {
             res.status(500).send("an error occurred while logging in")
         } else {
             if(!user) {
                 res.status(404).send("please verify your email or create an account")
             }
             else {

                     const {result ,success} = await decryptPassword(password , user.password) ;
                     if(!success) {
                         res.status(500).send("error while logging in please try again")
                     }else{
                         if (!result) {
                             res.status(403).send("verify your password");
                         }
                         else {

                             const {success} = await userController.addJwtToUser(email,user.isAdmin);
                             if(!success) {
                                 res.status(500).send("error while logging in please try again")
                             }else{
                                 const loggedInUser = await userDao.getUserByEmail(email)
                                 res.status(200).send(loggedInUser.user.jwt)
                             }

                         }
                     }

                 }

             }
         }


 }


 module.exports = authController ;