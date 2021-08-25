import {ProfileInfos} from "../../components/profileInfos/ProfileInfos";
import {Favourites} from "../../components/favourites/Favourites";
import axios from "axios";
import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {useEffect, useState} from "react";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {useHistory} from "react-router-dom";
import styles from "./profile.module.css"
import {Alert} from "../../components/alert/Alert";


export const Profile = ()=> {
    const localEmail =getEmailFromLocalStorage() ;
    const [user ,setUser] =useState({}) ;
    const [refresh , setRefresh] = useState(false) ;
    const {token ,displayAlerts} = useGlobalContext();
    const history = useHistory() ;
    useEffect(()=> {
        if(!token) {
            displayAlerts("info" , " please login or create an account")
            history.push("/login")
        }
    } , [])
    const forceFetch = ()=> {
        setRefresh(true);
    }
    const {profilePicture , username , email , createdAt , updatedAt ,watchLater , favourites} =user ;


    const getUserDetails = async ()=> {
        try {
            const response =await axios.get(`/api/user/details/${localEmail}`) ;
            setUser(response.data)
        }catch (e) {
            console.log(e.response.data)
            setUser({})
        }
    }
    useEffect(async ()=> {
        if(refresh===true) {
            await getUserDetails();
            setRefresh(false)
        }
    } , [refresh])

    useEffect(async ()=> {
        await getUserDetails() ;

    } , [])
    return(
        <>
        <div className={`${styles.global} container `}>
            {user && (
                <>
                <ProfileInfos
                    profilePicture={profilePicture}
                    username={username}
                    email={email}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                />
                    <Alert/>
                    {favourites && favourites.length>0 && (
                        <Favourites favourites={favourites} forceFetch={forceFetch} listType="favourites"/>
                    )}

                    {watchLater &&  watchLater.length>0 &&(
                        <Favourites favourites={watchLater} forceFetch={forceFetch} listType="watchLater"/>
                    )}


                </>
            )}
        </div>
        </>
    )
}