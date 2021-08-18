import {useEffect, useState} from "react";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import axios from "axios";
import {useHistory} from "react-router-dom";


export const RegisterForm =()=> {
    const {displayAlerts,loggingIn , token} = useGlobalContext();
    const [email,setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;
    const [repeatPassword , setRepeatPassword] = useState("") ;
    const[checked ,setChecked] = useState(false);
    const [username,setUsername] = useState("")
    const history =useHistory();
    const handleChange = ()=> {
        setChecked(!checked)

    }
    const disabled = password===repeatPassword ?   "":"disabled"
    useEffect(()=> {
        if(repeatPassword!==password) {
            displayAlerts("warning" , "repeated password is not matching")
        }
    } , [repeatPassword])
    const  handleSubmit = async (event) => {
        event.preventDefault();
            try{
                const response = await axios({
                    method: 'post',
                    url :"/api/auth/register",
                    data : {
                        username : username,
                        email :email,
                        password :password,
                        repeat_password :repeatPassword
                    }
                })
                displayAlerts("success" , response.data) ;
                if(checked) {
                    try{
                        const loginResponse =  await axios.post("/api/auth/login" , {
                            email:email,
                            password:password
                        }) ;
                        localStorage.setItem("email" , JSON.stringify(email))
                        console.log(loginResponse.data)
                        loggingIn(loginResponse.data)
                        history.push("/explore")
                        displayAlerts("success" , "logged in successfully")

                    }catch (e) {
                        //TODO : alerts here
                        loggingIn("") ;
                        displayAlerts("danger" , e.response.data)
                        console.log( e.response.data)
                    }
                } else {
                    history.push("/explore")
                }


            }catch (e) {
                console.log("error in registering" +e) ;
                displayAlerts ("danger" , e.response.data) ;


            } finally {
                setUsername("") ;
                setEmail("") ;
                setChecked(false) ;
                setPassword("") ;
                setRepeatPassword("")
            }
    }
    useEffect(()=> {
        console.log(token)
        if(token) {
            displayAlerts("info" , " you are already logged in")
            history.push("/explore")
        }
    } , [])
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label >Username</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        required
                        pattern="^[a-zA-Z0-9 ]*$"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">password must have 8-20 letters and digits only
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Repeat password</label>
                    <input
                        required
                        pattern="^[a-zA-Z0-9 ]*$"
                        type="password"
                        className="form-control"
                        placeholder="Repeat Password"
                        onChange={(e)=>setRepeatPassword(e.target.value)}
                    />
                </div>
                <div className="form-check">

                    <input type="checkbox"  onChange={handleChange} checked={checked}/>
                    <label >  keep me logged in </label>
                </div>
                <button type="submit" className={`btn btn-primary ${disabled}`}>Submit</button>
            </form>
        </>
    )

}