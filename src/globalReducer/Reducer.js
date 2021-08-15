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
}

}


export default reducer;