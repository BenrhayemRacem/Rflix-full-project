import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {useCommentContext} from "../../commentContext/CommentContext";


export const OneComment = (props)=> {
    const singleComment = props.singleComment ;

    const localEmail = getEmailFromLocalStorage() ;
const {setIsEditing,setDeleting}=useCommentContext()

    return (
        <>

        <div className="col-6">
            <img src={singleComment.commenter[0].profilePicture} alt=" user profile picture" className="img-thumbnail"/>
        </div>
            <div className="col-4">
            <h3> {singleComment.commenter[0].username}</h3>
            <p> {singleComment.description}</p>
            <h5> {new Date(singleComment.updatedAt).toDateString()}</h5>
                <h5> {new Date(singleComment.updatedAt).toLocaleTimeString()}</h5>
                {localEmail===singleComment.email && (
                    <>
                        <button onClick={()=>setIsEditing(singleComment._id ,singleComment.description)}><MdEdit/></button>
                        <button onClick={()=>setDeleting(singleComment._id)}>  <MdDeleteForever/>  </button>
                    </>
                )}
            </div>
        </>
    )
}