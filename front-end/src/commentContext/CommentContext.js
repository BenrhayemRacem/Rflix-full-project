import React, {useCallback, useContext, useEffect,  useReducer} from "react";
import commentReducer from "../commentReducer/CommentReducer";
import {CommentActions} from "../commentReducer/CommentActions";
import {useGlobalContext} from "../globalContext/GlobalContext";

import axios from "axios";
import getEmailFromLocalStorage from "../services/getEmailFromLocalStorage";



const CommentContext =  React.createContext(null) ;

const initialCommentsState = {
    commentDescription : "" ,
    movieId:"",
    commentList : [] ,
    isEditingAComment :false ,
    editingCommentId:"",
    alert : {variant :"" , message :""},
    isSubmitting :false ,
    deleting:false ,

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
    const handleSubmit =(event ,editingCommentId=null ) => {
        dispatch({type:CommentActions.HANDLE_SUBMIT , payload: {event,token,editingCommentId}})
    }
    const setIsEditing = (id, description)=> {
        dispatch({type:CommentActions.SET_IS_EDITING, payload: {id , description}} )
    }

    const setDeleting =(id)=> {
        dispatch({type:CommentActions.DELETING_COMMENT , payload:id})
    }



    useEffect(()=> {
console.log(state.alert)
        displayAlerts(state.alert.variant , state.alert.message)

    } , [state.alert])
 const fn= useCallback( async ()=>  {
    if(state.movieId!=="" ) {

        try{
            const response = await axios.get(`/api/comment/getByMovieId/${state.movieId}`);
            console.log(response.data)

              dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  , payload:response.data})
            console.log("commentList")
            console.log(state.commentList)

        }catch (e) {
            console.log(e) ;

            dispatch({type:CommentActions.GET_COMMENTS_FROM_DATABASE  ,payload: {}})

        }

    }
}, [state.movieId , state.isSubmitting , state.deleting])

    useEffect(async ()=> {
        await fn() ;
    } , [fn])





    useEffect( async ()=> {

        if(state.isSubmitting===true ) {
            if(state.isEditingAComment===false) {
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
            } else {
                    try {
                        console.log(state.isEditingAComment)
                        console.log(state.editingCommentId)
                        const response = await axios({
                            method: "put",
                            url :`/api/comment/edit/${state.editingCommentId}`,
                            headers:{"token":token},
                            data :{
                                description: state.commentDescription
                            }
                        })
                        dispatch({type:CommentActions.ADDED_TO_DB , payload:response.data})
                    }catch (e) {
                        console.log("errrrrrrrrrrrrrrror22222222")
                        dispatch({type:CommentActions.ERROR_SUBMITTING_COMMENT , payload:e.response.data})
                    }
            }
        }


    } , [state.isSubmitting])


    useEffect(async ()=> {
        if(state.deleting===true) {
            try {
                const response = await axios({
                    method: "delete",
                    url : `/api/comment/delete/${state.editingCommentId}`,
                    headers :{"token":token}
                })
                dispatch({type:CommentActions.DELETE_ALERTS , payload:{variant: "success" , message: response.data}})
            }catch (e) {
                console.log("errrrrrrrrrrrror333333333333");
                dispatch({type:CommentActions.DELETE_ALERTS , payload: {variant:"danger" , message:e.response.data}})
            }
            dispatch({type:CommentActions.DELETING_COMMENT})
        }

    } , [state.deleting])



    return (
        <CommentContext.Provider
            value={{
                ...state ,
                initMovieId ,
                initComments,
                handleAddingCommentDescription,
                handleSubmit,
                setIsEditing ,
                setDeleting


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