import {useCommentContext} from "../../commentContext/CommentContext";
import {OneComment} from "../oneComment/OneComment";
import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {useState} from "react";


export const SingleMovieCommentList  =() => {
    const [checked ,setIsChecked] = useState(false);
    const buttonText = checked ? "show all comments" : "show only my comments"
 const { commentList} =useCommentContext() ;
 const localEmail = getEmailFromLocalStorage();

const filterComments = checked? commentList.filter(element =>element.email ===localEmail) :commentList ;

if(commentList===undefined||Object.keys(commentList).length==0 && commentList.constructor===Object  ) {
    return  (
        <h2> no comments found for  movie</h2>
    )
}

    return (
        <>
            <button onClick={()=>setIsChecked(!checked)}> {buttonText}</button>
            { filterComments && ( filterComments.map((comment)=> <OneComment singleComment={comment}/>))}
        </>
    )

}