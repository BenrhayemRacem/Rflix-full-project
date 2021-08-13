import {SingleMovieDetails} from "../../components/singleMovieDetails/SingleMovieDetails";
import {useParams} from "react-router-dom" ;
import {useEffect, useState} from "react";
import {Loader} from "../../components/loader/Loader";
import styles from "./singleMovie.module.css";
import {useHistory} from "react-router-dom"
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {SingleMovieComments} from "../../components/singleMovieComments/SingleMovieComments";


const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';



export const SingleMovie =()=> {

    let history = useHistory() ;
    const [movie ,setMovie] = useState({}) ;
    const [loading ,setLoading] = useState(true);
    const {id} = useParams() ;
    const {alertSingleMovie , token} = useGlobalContext();

    const getMovie = async () => {
        try {
            setLoading(true);
            const response =  await axios.get(`/api/movie/getMovieById/${id}`) ;
            setMovie(response.data)
            setLoading(false)
        } catch (e) {
           console.log ("error in movie id  " + e)
            alertSingleMovie() ;
            history.push("/explore")
            setMovie(null)
            setLoading(false)


        }


    }

    const getComments = async ()=> {
        try {
            const response = await axios.get(`/api/comment/getByMovieId/${id}` , {
                headers : {'token' : token}
            }) ;
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect( async ()=> await getMovie() , [id])
    useEffect( async ()=> await getComments() , [id])
    return(
       <>
           <div className="container">
           {loading && (
              <div className="row">
                  <Loader/>
              </div>
           )}

           { !loading && (
               <div className={styles.global}>
               <SingleMovieDetails movie ={movie}/>
               </div>
           )}

               <div className="row">
                   <SingleMovieComments/>
               </div>
           </div>

       </>
    )
}