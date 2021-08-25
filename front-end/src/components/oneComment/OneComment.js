import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {useCommentContext} from "../../commentContext/CommentContext";
import styles from "./oneComment.module.css"

export const OneComment = (props)=> {
    const singleComment = props.singleComment ;

    const localEmail = getEmailFromLocalStorage() ;
const {setIsEditing,setDeleting}=useCommentContext()

    return (
        <div className={ `${styles.global} row`}>

        <div className={`${styles.profilePic} col-lg-6 col-md-12`}>
            <img src={singleComment.commenter[0].profilePicture} alt=" user profile picture" className="img-thumbnail"/>
        </div>
            <div className="col-lg-4 col-md-12">
            <h3> Username: {singleComment.commenter[0].username}</h3>
            <p> Comment: {singleComment.description}</p>
            <h5> {new Date(singleComment.updatedAt).toDateString()} ,{new Date(singleComment.updatedAt).toLocaleTimeString()}</h5>
                <h5> </h5>
                {localEmail===singleComment.email && (
                    <>
                        <button className="btn btn-danger" onClick={()=>setIsEditing(singleComment._id ,singleComment.description)}><MdEdit/></button>
                        <button className="btn btn-danger" onClick={()=>setDeleting(singleComment._id)}>  <MdDeleteForever/>  </button>
                    </>
                )}
            </div>
        </div>
    )
}