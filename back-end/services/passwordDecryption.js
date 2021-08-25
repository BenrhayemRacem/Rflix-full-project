const bcrypt = require("bcrypt");

const decryptPassword = async (password , hash) => {
    try {
        const result =  await bcrypt.compare(password , hash)
        return {"result":result , "success" : true};
    }catch(error) {
         return {"result": false , "success":false}
    }

}

module.exports = decryptPassword;

