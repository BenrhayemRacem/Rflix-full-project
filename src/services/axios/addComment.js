
import getEmailFromLocalStorage from "../getEmailFromLocalStorage";

const axios = require("axios");


const addComment =  (token , movie_id , description)=> {


       return    axios({
            method : "post",
            url:"/api/comment/add",
            headers : {"token" : token} ,
            data : {
                email : getEmailFromLocalStorage(),
                movie_id:movie_id ,
                description:description
            }
        })



}

export default addComment;