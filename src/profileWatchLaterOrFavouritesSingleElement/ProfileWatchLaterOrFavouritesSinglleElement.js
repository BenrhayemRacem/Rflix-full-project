import {useState} from "react";
import {Link} from "react-router-dom";
import {MdRemoveCircle, MdRemoveCircleOutline} from "react-icons/md";
import axios from "axios";
import getEmailFromLocalStorage from "../services/getEmailFromLocalStorage";
import {useGlobalContext} from "../globalContext/GlobalContext";


export const ProfileWatchLaterOrFavouritesSingleElement =(props) => {
 const {singleItem ,list ,forceFetch} = props ;
 const[hover ,setHover] = useState(false) ;
 const email = getEmailFromLocalStorage() ;
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
        >
            <img src={singleItem.poster} alt=" movie poster" className="img-thumbnail"/>
            {hover && (
                <>
                    <div className="row">
                <Link to={`/movie/${singleItem._id}`}> watch </Link>

                    </div>
                    <div className="row justify-content-center">
                    <div className=" col-2 ">
                        <div
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                        <MdRemoveCircleOutline/>
                    </div>
                    </div>
                    </div>
                </>
            )}
        </div>
    )
}