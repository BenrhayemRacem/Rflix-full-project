const movieModel = require("../models/movieModel") ;

class movieDao {
    static async getMovieById (id) {
        try{
            const movie = await movieModel.findById(id) ;

                return {success : true , movie : movie}

        }catch (error) {
            console.log("error in finding movie by id" + error)
            return {success:false , movie:null}
        }
    }
    static async getMoviesByTitle(title) {
        try {
            const movieList =   movieModel.find({"title": title}).getQuery();


                return {"success": true, "movieList": movieList}

        } catch (error) {
            console.log("error in searching movies by title" + error)
            return {success: false, movieList: null};
        }
    }

    static async getMoviesByGenres(genres) {
        const movieGenres = Array.isArray(genres) ? genres : genres.split(",");
        try {
            const movieList =  movieModel.find({"genres": {"$in": movieGenres}}).getQuery();


                return {"success": true, "movieList": movieList}


        } catch (error) {
            console.log("error in searching movies by title" + error)
            return {success: false, movieList: null};
        }
    }

    static async getMoviesByCast(cast) {
        const movieCast = Array.isArray(cast) ? cast : cast.split(",");

        try {
            const movieList =  movieModel.find({"cast": {"$in": movieCast}}).getQuery();

                return {"success": true, "movieList": movieList}


        } catch (error) {
            console.log("error in searching movies by cast" + error)
            return {success: false, movieList: null};
        }
    }

    static async getMoviesByFilter({filters = null, page = 0, moviePerPage = 10}) {

        let queryParams = {}
        console.log(filters)
        if (filters) {
            if ("title" in filters) {
                queryParams = await this.getMoviesByTitle(filters["title"])
            } else if ("cast" in filters) {
                queryParams =  await this.getMoviesByCast(filters["cast"])
            } else if ("genre" in filters) {
                queryParams =  await this.getMoviesByGenres(filters["genre"])
            }
            try{
                const { success=false, movieList =null} =   queryParams;
                console.log(queryParams)
                if(success) {

                    const searchedList = await movieModel.find(movieList).limit(moviePerPage).skip(moviePerPage*page).exec();
                    if (searchedList.length>=1) {
                        return {success : true , searchedList : searchedList}
                    }


                    return {success:true , searchedList:null}
                }

            } catch (error) {
                return {success:false , searchedList:null}
            }

        }
        const allMoviesResponse = await this.getAllMovies(page,moviePerPage);
        return {success:allMoviesResponse.success ,searchedList: allMoviesResponse.searchedList}
    }
    static async getAllMovies (page=0 ,moviePerPage=20 ) {
        try {

            const searchedList = await movieModel.find({poster:{$exists:true}  },{title:1 , poster:1,year:1,cast:1,runtime:1,plot:1 ,released:1 },{sort:{"released":-1}}).limit(moviePerPage).skip(moviePerPage * page).exec();
            if (searchedList.length >= 1) {
                return {success: true, searchedList: searchedList}
            }


            return {success: true, searchedList: null}


        } catch (error) {
            return {success: false, searchedList: null}
        }
    }

}

module.exports = movieDao ;

