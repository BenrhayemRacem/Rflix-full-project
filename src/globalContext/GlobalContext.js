import React, {useContext, useEffect, useReducer} from "react";
import reducer from "../globalReducer/Reducer";
import getTokenFromLocalStorage from "../services/getTokenFromLocalStorage";
import {actions} from "../globalReducer/actions";


const initialState = {
    token :getTokenFromLocalStorage(),
    alert :{variant: "" , message:""}
}

const AppContext = React.createContext(null) ;


const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
     const displayAlerts = ( variant , message)=> {

         dispatch({type:actions.ALERT , payload:{variant,message}})
     }
     const loggingIn =(token)=> {
         dispatch({type:actions.LOGGING_IN , payload:token})
    }




useEffect( ()=> {
    dispatch({type:actions.ADD_JWT_LOCAL_STORAGE})
} ,[state.token])

     useEffect( ()=> {
         let timeout = setTimeout(()=>dispatch({type:actions.INIT_ALERT}) , 3000)
         return ()=> clearTimeout(timeout)
     } , [state.alert])

    return (
        <AppContext.Provider
        value={{
            ...state,
            displayAlerts,
            loggingIn

        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
