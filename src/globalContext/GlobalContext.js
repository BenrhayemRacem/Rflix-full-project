import React, {useContext, useEffect, useReducer} from "react";
import reducer from "../reducer/Reducer";
import getTokenFromLocalStorage from "../services/getTokenFromLocalStorage";
import {actions} from "../reducer/actions";


const initialState = {
    token :getTokenFromLocalStorage(),
    alert :{variant: "" , message:""}
}

const AppContext = React.createContext(null) ;


const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
     const alertSingleMovie = ()=> {
         dispatch({type:actions.ALERT_SINGLE_MOVIE})
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
            alertSingleMovie,
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
