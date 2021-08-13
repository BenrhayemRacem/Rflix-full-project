import {LoginForm} from "../../components/loginForm/LoginForm";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {useEffect} from "react";


export const Login =()=> {


    const {token } = useGlobalContext() ;
    return(
        <>
    <div className="container col-6 justify-content-center">
        <LoginForm/>
    </div>
        </>
    )
}