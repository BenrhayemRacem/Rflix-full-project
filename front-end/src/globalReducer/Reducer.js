import {actions} from "./actions";


const reducer =(state,action) => {
switch (action.type) {
    case actions.ALERT :
        return {...state , alert :{variant :action.payload.variant , message:action.payload.message}}
    case actions.INIT_ALERT:
        return {...state , alert :{variant: "" , message: ""}}
    case actions.ADD_JWT_LOCAL_STORAGE:
        localStorage.setItem("token" ,JSON.stringify(state.token))
        return {...state}
    case actions.LOGGING_IN :
        return {...state , token:action.payload}
    case actions.LOGOUT :{
        localStorage.setItem("email",JSON.stringify(""));
        return {...state , token:""}
    }
    case actions.SET_SHOW : {
        return {...state,show:true}
    }
    case actions.SET_CLOSE :{
        return {...state,show:false}
    }
}

}


export default reducer;