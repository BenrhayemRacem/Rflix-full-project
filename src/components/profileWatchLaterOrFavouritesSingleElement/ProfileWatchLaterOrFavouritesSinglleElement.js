import {useState} from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";
import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import styles from "./profileListSingleElement.module.css"
import {AiFillCloseCircle} from "react-icons/ai";

export const ProfileWatchLaterOrFavouritesSingleElement =(props) => {
 const {singleItem ,list ,forceFetch} = props ;
 const[hover ,setHover] = useState(false) ;
 const email = getEmailFromLocalStorage() ;
 const history = useHistory();
 const id = singleItem._id ;
    const {displayAlerts} = useGlobalContext();
 const handleDelete =async ()=> {

         try{
             const response = await axios({
                 method : "put" ,
                 url :`api/user/${list}/remove` ,
                 data :{
                     movieId :id,
                     email:email
                 }
             })
             console.log(response.data)
             displayAlerts("success" , response.data)
             await forceFetch()

         }catch (e) {
             console.log(e)


     }
 }

    return (
        < div  onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
               className={styles.global}
        >
            <img src={singleItem.poster} alt=" movie poster" className="img-thumbnail"
            onClick={()=>history.push(`/movie/${singleItem._id}`)}
            />
            {hover && (
                <>
                    <div className="row">


                    </div>
                    <div className="row ">
                    <div className=" col-2 ">
                        <div
                            className={`${styles.deleteButton} btn btn-danger `}
                            onClick={handleDelete}
                        >
                        <AiFillCloseCircle/>
                    </div>
                    </div>
                    </div>
                </>
            )}
        </div>
    )
}