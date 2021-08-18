import {useCommentContext} from "../../commentContext/CommentContext";
import {useGlobalContext} from "../../globalContext/GlobalContext";


export const CommentForm = ()=> {
const {token} = useGlobalContext();
const {commentDescription , handleAddingCommentDescription , isEditingAComment , handleSubmit} = useCommentContext() ;
const buttonText = isEditingAComment? "edit ":"add "   ;
if(!token) {
    return (
        <h3> please login or sign up to post comments</h3>
    )
}

return(
        <form  onSubmit={handleSubmit}>
            <label > add or edit your own comments</label>
            <input
            type="text"
            value={commentDescription}
            onChange={ (e)=>handleAddingCommentDescription(e.target.value)}
            />
            <button className="btn btn-danger btn-md" type="submit"> {buttonText}</button>
        </form>
    )
}