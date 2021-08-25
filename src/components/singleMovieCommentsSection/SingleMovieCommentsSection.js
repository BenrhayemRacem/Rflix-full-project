
import {useCallback, useEffect} from "react";

import { useCommentContext} from "../../commentContext/CommentContext";
import {SingleMovieCommentList} from "../singleMovieCommentList/SingleMovieCommentList";
import {CommentForm} from "../commentForm/CommentForm";
import {Alert} from "../alert/Alert";
import {useParams} from "react-router-dom";


export const SingleMovieCommentsSection = () => {
    const {initMovieId } = useCommentContext() ;
    const {id} = useParams() ;
    const fn = useCallback(()=> initMovieId(id) , [id])
    useEffect(()=> fn() , [fn])

console.log("id" + id)




    return (
        <>
            <Alert/>
            <CommentForm/>

               <SingleMovieCommentList/>



        </>
    )
}