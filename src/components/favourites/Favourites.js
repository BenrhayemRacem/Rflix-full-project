import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {ExploreAllMovies} from "../exploreAllMovies/ExploreAllMovies";
import {data} from "../homeJoinUs/data";
import {useGlobalContext} from "../../globalContext/GlobalContext";
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

    //  const fn =useCallback(async ()=>{
    //     await getMovies()
    // },[favourites ,movieList])
    // useEffect( ()=> fn() , [fn])

    return(
        <>
            <Alert/>
        <ProfileWatchLaterOrFavouritesList favouriteMovieList={movieList} list={listType} forceFetch={forceFetch}/>
            </>
    )
}