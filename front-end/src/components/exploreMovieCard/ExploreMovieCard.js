
import styles from "./exploreMovieCard.module.css"
import {useState} from "react";
import { useHistory} from "react-router-dom";
import {Alert} from "../alert/Alert";
import {HandleWatchLater} from "../handleWatchLater/HandleWatchLater";
import {useGlobalContext} from "../../globalContext/GlobalContext";

export const ExploreMovieCard =(props) =>  {
const {movie} = props ;
const { _id ,title ,year ,poster  , runtime , plot} = movie ;
const [hover , setHover] = useState(false);
const history = useHistory();
const {token} = useGlobalContext()

    return (

        <div
            className={` col-md-6 col-lg-4 col-sm-12 ${styles.global} `}
        onMouseEnter={ ()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >

            <img src={poster} alt=" movie poster" className="img-thumbnail"
            onClick={()=>history.push(`/movie/${_id}`)}
            />
            {!hover && (<h3> {title} ({year})</h3>)}
            {hover && (
                <>
                <p>{plot}</p>
                 <div> <button className="btn btn-danger" > {runtime} minutes</button> </div>

                    <div>
                        <Alert/>
                        {token && (
                            <div className={styles.hoverIcons}>
                                <HandleWatchLater id={_id} list="watchLater"/>
                                <HandleWatchLater id={_id} list="favourites"/>
                            </div>
                        )}

                    </div>
                </>
            )}


        </div>
    )
 }