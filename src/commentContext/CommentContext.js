import React, {useCallback, useContext, useEffect, useReducer} from "react";
import commentReducer from "../commentReducer/CommentReducer";
import {CommentActions} from "../commentReducer/CommentActions";
import {useGlobalContext} from "../globalContext/GlobalContext";
import getComments from "../services/axios/getComments";
import axios from "axios";
import getEmailFromLocalStorage from "../services/getEmailFromLocalStorage";



const CommentContext =  React.createContext(null) ;

const initialCommentsState = {
    commentDescription : "" ,
    movieId:"",
    commentList : {} ,
    isEditingAComment :false ,
    editingCommentId:"",
    alert : {variant :"" , message :""},
    isSubmitting :false ,

}

const CommentProvider = ({children}) => {

    const {token ,displayAlerts} = useGlobalContext();
    const [state,dispatch]= useReducer(commentReducer , initialCommentsState) ;

    const initMovieId =   ( id) => {
          dispatch({type:CommentActions.INIT_MOVIE_ID , payload:id})
    }
    const initComments = (comments) =>  {
        dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  , payload:comments})
    }
    const handleAddingCommentDescription = (description) => {
        dispatch( {type:CommentActions.ADD_COMMENT , payload:description})
    }
    const handleSubmit =(event ) => {
        dispatch({type:CommentActions.HANDLE_SUBMIT , payload: {event,token}})
    }


   // useEffect( ()=> {
   //     console.log(state.commentDescription ==="")
   //     if (state.commentDescription ==="") {
   //         displayAlerts("danger" , "hello")
   //     }
   //     }
   //
   //
   //     , [state.commentDescription])
    useEffect(()=> {
console.log(state.alert)
        displayAlerts(state.alert.variant , state.alert.message)

    } , [state.alert])
const fn = useCallback( async ()=>  {
    if(state.movieId==="") {

    }else {
        try{
            const response = await axios.get(`/api/comment/getByMovieId/${state.movieId}`);
            console.log(response.data)
             dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  , payload:response.data})
        }catch (e) {
            console.log(e) ;
            dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  , payload: {}})
        }

    }
}, [state.movieId  ,state.commentList])
    useEffect( async ()=> {
        // if(state.movieId==="") {
        //
        // }else {
        //     try{
        //         const response = await axios.get(`/api/comment/getByMovieId/${state.movieId}`);
        //         console.log(response.data)
        //        await dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  , payload:response.data})
        //     }catch (e) {
        //         console.log(e) ;
        //         dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  , payload: {}})
        //     }
        //
        // }
    await fn()

    } , [fn])

    useEffect( async ()=> {
        if(state.isSubmitting===true) {
            try {
                const response =await  axios({
                    method: "post",
                    url: "/api/comment/add",
                    headers: {"token": token},
                    data: {
                        email: getEmailFromLocalStorage(),
                        movie_id: state.movieId,
                        description: state.commentDescription
                    }
                })
                dispatch({type:CommentActions.ADDED_TO_DB , payload:response.data})
            }catch (e) {
                console.log("errrrrrrrrrrrrrrror")
                dispatch({type:CommentActions.ERROR_SUBMITTING_COMMENT , payload:e.response.data})
            }
        }

    } , [state.isSubmitting])



    return (
        <CommentContext.Provider
            value={{
                ...state ,
                initMovieId ,
                initComments,
                handleAddingCommentDescription,
                handleSubmit,


            }}
            >
            {children}
        </CommentContext.Provider>
    )
}

export const useCommentContext = () => {
    return useContext(CommentContext);
};

export { CommentContext, CommentProvider };