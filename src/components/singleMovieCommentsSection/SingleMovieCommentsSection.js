
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { useCommentContext} from "../../commentContext/CommentContext";
import {SingleMovieCommentList} from "../singleMovieCommentList/SingleMovieCommentList";
import {CommentForm} from "../commentForm/CommentForm";
import {Alert} from "../alert/Alert";
import {useParams} from "react-router-dom";

// const getComments = async (initMovieId,initComments,id)=> {
//     try {
//         const response = await axios.get(`/api/comment/getByMovieId/${id}`);
//         console.log(response.data)
//         initMovieId( id)
//         initComments(response.data)
//
//     } catch (e) {
//         console.log("error" + e)
//         initMovieId(id)
//         initComments({})
//     }
// }
export const SingleMovieCommentsSection = () => {
    const {initMovieId , initComments ,commentList} = useCommentContext() ;
    const {id} = useParams() ;
    const fn = useCallback(()=> initMovieId(id) , [id])
    useEffect(()=> fn() , [fn])

console.log("id" + id)


    // useEffect(  ()=> {
    //     async function getComments () {
    //         try {
    //             const response = await axios.get(`/api/comment/getByMovieId/${id}`);
    //             console.log(response.data)
    //             initMovieId( id)
    //             initComments(response.data)
    //
    //         } catch (e) {
    //             console.log("error" + e)
    //             initMovieId(id)
    //             initComments({})
    //         }
    //     }
    //     getComments()
    // } , [commentList])

    return (
        <>
            <CommentForm/>
            <Alert/>
               <SingleMovieCommentList/>



        </>
    )
}