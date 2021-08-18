import {SingleMovieDetails} from "../../components/singleMovieDetails/SingleMovieDetails";
import {Link, useParams,useLocation} from "react-router-dom" ;
import {useCallback, useEffect, useState} from "react";
import {Loader} from "../../components/loader/Loader";
import styles from "./singleMovie.module.css";
import {useHistory} from "react-router-dom"
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {SingleMovieCommentsSection} from "../../components/singleMovieCommentsSection/SingleMovieCommentsSection";
import {CommentProvider} from "../../commentContext/CommentContext";



const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';



export const SingleMovie =()=> {

    let history = useHistory() ;
    const [movie ,setMovie] = useState({}) ;
    const [loading ,setLoading] = useState(true);

    const {id} = useParams() ;
    const {displayAlerts , token ,} = useGlobalContext();

    // const fn =useCallback( async ()=> {
    //     try {
    //         setLoading(true);
    //         const response =  await axios.get(`/api/movie/getMovieById/${id}`) ;
    //         setMovie(response.data)
    //         setLoading(false)
    //     } catch (e) {
    //         console.log ("error in movie id  " + e)
    //         history.push("/explore")
    //         displayAlerts("danger", "movie not found please try again") ;
    //         setMovie(null)
    //         setLoading(false)
    //
    //
    //     }
    // } ,[id,displayAlerts,setLoading])
    const getMovie = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/movie/getMovieById/${id}`);
            console.log(response.data)
            setMovie(response.data)
            setLoading(false)
        } catch (e) {
            console.log("error in movie id  " + e)
            history.push("/explore")
            displayAlerts("danger", "movie not found please try again");
            setMovie(null)
            setLoading(false)


        }

    }

    useEffect( async ()=> await getMovie() , [])
    console.log(useLocation())
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
                   <div className="row justify-content-start">
                       <div className="col-5">
                           <div onClick={()=>history.goBack()}> go back</div>
                       </div>
                   </div>
               <SingleMovieDetails movie ={movie}/>
                   <div className="row">
                       <CommentProvider>
                       <SingleMovieCommentsSection />
                       </CommentProvider>
                   </div>
               </div>
           )}


           </div>

       </>
    )
}