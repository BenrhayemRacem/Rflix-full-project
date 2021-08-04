const joi = require("joi") ;

const userSchema =  joi.object({
    username: joi.string().required() ,
    email:joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]*$")).required().min(8).max(20),
    repeat_password : joi.ref('password'),

})

/**
 * *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.username
 * @param {string} user.password
 * @param {string} user.repeated_password
 * @returns {Promise<{success: boolean, message: string}>}
 */
const validateUser = async (user) => {

    try {
         await userSchema.validateAsync(user);
        return {"success" : true ,  "message": "user is valid"}
    }catch(error) {
      return   {"success" : false ,  "message": error.toString()}

    }

}

module.exports = validateUser;