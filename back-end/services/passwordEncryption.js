const bcrypt = require("bcrypt");


const saltRounds = 10 ;
const encryptPasswd = async (password) => {
    try {
        const HashedPassword = await bcrypt.hash(password, saltRounds) ;
        return HashedPassword;
    }catch(err) {
        console.log("error in hashing passwd" +err);
        return password ;
    }

}

module.exports = encryptPasswd ;