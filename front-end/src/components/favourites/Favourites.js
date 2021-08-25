import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {ProfileWatchLaterOrFavouritesList} from "../profileWatchLaterOrFavouritesList/ProfileWatchLaterOrFavouritesList";
import {Alert} from "../alert/Alert";


let list  =[];
export const Favourites =(props)=> {

const {favourites ,forceFetch,listType}=props ;
const [movieList ,setMovieList] = useState([])



   const getMovies = async ()=> {

        try {
         list =  await  Promise.all(favourites.map(async (id)=> {

                const response = await axios.get(`/api/movie/getMovieById/${id}`);
                return response.data ;

            }))

            setMovieList(list)
console.log(`${listType}   ${favourites}`)
        }catch (e) {
            console.log(e)

        }
    }
    const fn = useCallback(async ()=>   await getMovies() , [ favourites  ])

    useEffect(   ()=> fn() , [fn])

    return(
        <>

        <ProfileWatchLaterOrFavouritesList favouriteMovieList={movieList} list={listType} forceFetch={forceFetch}/>
            </>
    )
}