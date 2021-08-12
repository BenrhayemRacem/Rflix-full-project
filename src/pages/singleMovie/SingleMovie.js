import {SingleMovieDetails} from "../../components/singleMovieDetails/SingleMovieDetails";
import {useParams} from "react-router-dom" ;
import {useEffect, useState} from "react";
import {Loader} from "../../components/loader/Loader";
import styles from "./singleMovie.module.css";


const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';



export const SingleMovie =()=> {
    const [movie ,setMovie] = useState({}) ;
    const [loading ,setLodaing] = useState(true);
    const {id} = useParams() ;

    const getMovie = async () => {
        try {
            setLodaing(true);
            const response =  await axios.get(`/api/movie/getMovieById/${id}`) ;
            setMovie(response.data)
            setLodaing(false)
        } catch (e) {
            console.log(e)
            setLodaing(false)
            setMovie({})
        }


    }

    useEffect(()=>getMovie() , [id])

    return(
       <>
           <div className="container">
           {loading && (
              <div className="row">
                  <Loader/>
              </div>
           )}
           {!loading && (
               <div className={styles.global}>
               <SingleMovieDetails movie ={movie}/>
               </div>
           )}
           </div>

       </>
    )
}