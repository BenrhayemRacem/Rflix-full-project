import axios from "axios";
import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {useEffect, useState} from "react";
import {Alert} from "../alert/Alert";


export const HandleWatchLater =(props)=> {
    const {displayAlerts} = useGlobalContext()
const {id , list } =props ;
    const [exist , setExist] =useState(false) ;
const email =getEmailFromLocalStorage() ;
useEffect(async ()=> await movieExists() , [exist])
const movieExists = async ()=> {
    try{
        console.log(email) ;
        console.log(id);
        const response = await axios({
            method :"post",
            url:`api/user/${list}/check`,
            data:{
                movieId:id,
                email:email
            }
        })
        setExist(response.data)
        console.log(response.data)
    }catch (e) {
        console.log(e)
        displayAlerts("danger" ,e.response.data)
    }
}
    const  add = async ()=> {
            if(!exist) {
                try {
                    const response = await axios({
                        method: "post" ,
                        url:`api/user/${list}/add`,
                        data:{
                            movieId: id,
                            email:email
                        }
                    })
                    console.log(response.data)
                    displayAlerts("success" , response.data)
                    setExist(true);
                }catch (e) {
                    console.log(e.response.data)
                    displayAlerts("danger" , e.response.data)
                }
            }
    }
        const remove = async ()=> {
        if(exist) {
            try{
                const response = await axios({
                    method : "put" ,
                    url :`api/user/${list}/remove` ,
                    data :{
                    movieId :id,
                    email:email
                 }
             })
                console.log(response.data)
                displayAlerts("success" , response.data)
                setExist(false);
            }catch (e) {
                console.log(e)
                displayAlerts("success" , e.response.data)
        }
    }
    }
    return(
        <>

            <h1>{list}</h1>
            <button onClick={()=>{exist? remove():add()}}>
                {exist? "remove" : "add"}
            </button>
            {/*<button onClick={()=>remove()}>*/}
            {/*    remove*/}
            {/*</button>*/}
        </>
    )
}