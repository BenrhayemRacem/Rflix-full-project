import {Loader} from "../../components/loader/Loader";
import {ExploreAllMovies} from "../../components/exploreAllMovies/ExploreAllMovies";
import styles from "./explore.module.css"
import {useEffect, useState} from "react";
import {ExplorePagination} from "../../components/explorePagination/ExplorePagination";
const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';
export const Explore =()=> {
    const[loading , setLoading] = useState(true) ;
    const[movies , setMovies] = useState([]) ;
    const [page, setPage] = useState(0) ;
    const changePage = (numPage)=> {
        if(numPage<=0) {
            setPage(0)

        }else {

            setPage(numPage)
        }

    }
const getAllMovies =async ()=> {
    try {
        setLoading(true)
      const response =   await axios.get("/api/movie/allMovies" , {
          params: {
              page:page
          }
      }) ;
      const data = response.data ;
      setMovies(data)
      setLoading(false)

    }catch (e) {
        setLoading(false)
console.log(e)
    }

}
useEffect(()=>getAllMovies() ,[page ])
    return(
        <>
           <div className={`${styles.global} container`}>
               {loading&& (
                   <div className="row">
                   <Loader/>
               </div>
               ) }
               {!loading && (
                   <>
                   <div className="row justify-content-center">
                       <ExplorePagination page={page} changePage={changePage}/>
                   </div>
                   <div className="row ">
                   <ExploreAllMovies movies ={ movies}/>
                   </div>
                   <div className="row justify-content-center">
                   <ExplorePagination page={page} changePage={changePage} />
                   </div>
                   </>
               )}
           </div>
        </>

    )
}