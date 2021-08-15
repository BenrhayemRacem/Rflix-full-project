import {useCommentContext} from "../../commentContext/CommentContext";
import {OneComment} from "../oneComment/OneComment";


export const SingleMovieCommentList  =() => {
 const { commentList} =useCommentContext() ;

if(Object.keys(commentList).length==0 && commentList.constructor===Object) {
    return  (
        <h2> no comments found for  movie</h2>
    )
}

    return (
        <>
            {commentList.map((comment)=> <OneComment singleComment={comment}/>)}
        </>
    )

}