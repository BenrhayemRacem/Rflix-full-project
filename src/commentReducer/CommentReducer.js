import {CommentActions} from "./CommentActions";
import addComment from "../services/axios/addComment";
import axios from "axios";
import getEmailFromLocalStorage from "../services/getEmailFromLocalStorage";


const commentReducer =   (state,action) => {
switch(action.type) {
    case CommentActions.INIT_ALERTS : {
        return {...state , alert:{variant: "" , message: ""}}
    }
    case CommentActions.INIT_MOVIE_ID : {
        console.log("init movie id" +action.payload)
        return {...state ,  movieId:action.payload}
    }
    case CommentActions.GET_COMMENTS_FROM_DATABASE : {
        return {...state , commentList: action.payload}
    }
    case CommentActions.ADD_COMMENT : {
        return {...state , commentDescription: action.payload}
    }
    case CommentActions.HANDLE_SUBMIT : {
        action.payload.event.preventDefault();
       if(!state.commentDescription) {
           return {...state , alert:{variant:"warning" , message:"cannot add an empty comment"} }
       } else if ( state.commentDescription && state.isEditingAComment) {
           return {...state}
       } else {
//            console.log("adding")
//
//             addComment(action.payload.token, state.movieId, state.commentDescription)
//                 .then(r => { console.log(r)
//                     return {...state , alert:{variant: "success" , message: "added successfully"} ,commentDescription:""}
//                 })
//                 .catch(e=> console.log(e.response.data))
// console.log("added")
          return {...state , isSubmitting: true}

       }
        return {...state}

    }
    case CommentActions.ADDED_TO_DB : {
        return {...state , alert:{variant: "success" , message: action.payload} , commentDescription: "" ,isSubmitting: false}
    }
    case CommentActions.ERROR_SUBMITTING_COMMENT : {
        return {...state , alert:{variant: "danger" ,message:action.payload} , commentDescription: "" ,isSubmitting: false}
    }

}

}

export default commentReducer ;