const axios = require("axios")

    const getComments = async (id)=> {
    try{
        const response = await axios.get(`/api/comment/getByMovieId/${id}`);
        console.log(response.data)
        return response.data ;
    }catch (e) {
     console.log(e) ;
     return {}
    }
    }

    export default getComments;