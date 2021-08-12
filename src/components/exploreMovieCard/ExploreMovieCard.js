
import styles from "./exploreMovieCard.module.css"
import {useState} from "react";
import {Link} from "react-router-dom";

export const ExploreMovieCard =(props) =>  {
const {movie} = props ;
const { _id ,title ,year ,poster  , runtime , plot} = movie ;
const [hover , setHover] = useState(false);


    return (

        <div
            className={` col-md-6 col-lg-4 col-sm-12 ${styles.global} `}
        onMouseEnter={ ()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >

            <img src={poster} alt=" movie poster" className="img-thumbnail"/>
            {!hover && (<h3> {title} ({year})</h3>)}
            {hover && (
                <>
                <p>{plot}</p>
                 <div> <button className="btn btn-success" > {runtime} minutes</button> </div>
                <Link to={`/movie/${_id}`}>  view details</Link>
                </>
            )}


        </div>
    )
 }