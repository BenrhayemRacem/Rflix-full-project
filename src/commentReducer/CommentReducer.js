import {CommentActions} from "./CommentActions";
import addComment from "../services/axios/addComment";
import axios from "axios";
import getEmailFromLocalStorage from "../services/getEmailFromLocalStorage";


const commentReducer =   (state,action) => {
switch(action.type) {
    case CommentActions.DELETE_ALERTS : {
        return {...state , alert:{variant: action.payload.variant , message: action.payload.message}}
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

       } else {
//            console.log("adding")
//
//             addComment(action.payload.token, state.movieId, state.commentDescription)
//                 .then(r => { console.log(r)
//                     return {...state , alert:{variant: "success" , message: "added successfully"} ,commentDescription:""}
//                 })
//                 .catch(e=> console.log(e.response.data))
// console.log("added")
          return {...state , isSubmitting: true  }

       }


    }
    case CommentActions.ADDED_TO_DB : {
        return {...state , alert:{variant: "success" , message: action.payload} , commentDescription: "" ,isSubmitting: false,editingCommentId:"",isEditingAComment:false}
    }
    case CommentActions.ERROR_SUBMITTING_COMMENT : {
        return {...state , alert:{variant: "danger" ,message:action.payload} , commentDescription: "" ,isSubmitting: false,editingCommentId:"",isEditingAComment:false}
    }
    case CommentActions.SET_IS_EDITING : {
        if(state.isEditingAComment===false) {
            console.log( "aaaaaaaaaaaaaaaaaaaaaaaaaa   " +action.payload.id)
            return {...state , isEditingAComment:true , editingCommentId: action.payload.id , commentDescription:action.payload.description}
        }
        return  {...state ,isEditingAComment:false ,editingCommentId:"" , commentDescription:""}
    }
    case CommentActions.DELETING_COMMENT :{
        if(state.deleting===false) {
            return {...state , deleting:true ,editingCommentId:action.payload}
        }
        return {...state,deleting:false , editingCommentId:""}
    }

}

}

export default commentReducer ;