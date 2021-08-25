import {useCommentContext} from "../../commentContext/CommentContext";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import styles from "./commentForm.module.css"

export const CommentForm = ()=> {
const {token} = useGlobalContext();
const {commentDescription , handleAddingCommentDescription , isEditingAComment , handleSubmit} = useCommentContext() ;
const buttonText = isEditingAComment? "edit ":"add "   ;
if(!token) {
    return (
        <div className="alert alert-info">
        <h3> please login or sign up to post comments</h3>
        </div>
    )
}

return(
        <form  onSubmit={handleSubmit} className={styles.global} >

            <label > <h5>add or edit your own comments</h5></label>
            <input
            type="text"
            value={commentDescription}
            onChange={ (e)=>handleAddingCommentDescription(e.target.value)}
            />

            <button className="btn btn-danger btn-md" type="submit"> {buttonText}</button>
        </form>
    )
}