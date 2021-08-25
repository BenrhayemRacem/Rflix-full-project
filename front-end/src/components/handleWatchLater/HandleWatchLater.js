import axios from "axios";
import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {useEffect, useState} from "react";
import {BsClock, BsClockFill, BsStar, BsStarFill} from "react-icons/bs";



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

    if(list==="favourites") {
        return (
            <button className={ `btn btn-${exist? "success" :"danger"}`} onClick={()=>{exist? remove():add()}}>
                {exist ? <BsStarFill/> : <BsStar/>}
            </button>
        )
    }
    return(
        <>

            <button className={ `btn btn-${exist? "success" :"danger"}`} onClick={()=>{exist? remove():add()}}>
                {exist ? <BsClockFill/> : <BsClock/>}
            </button>

        </>
    )
}