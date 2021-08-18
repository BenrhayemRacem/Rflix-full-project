import {ProfileInfos} from "../../components/profileInfos/ProfileInfos";
import {Favourites} from "../../components/favourites/Favourites";
import {WatchLater} from "../../components/watchLater/WatchLater";
import axios from "axios";
import getEmailFromLocalStorage from "../../services/getEmailFromLocalStorage";
import {useEffect, useState} from "react";


export const Profile = ()=> {
    const localEmail =getEmailFromLocalStorage() ;
    const [user ,setUser] =useState({}) ;
    const [refresh , setRefresh] = useState(false) ;
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
        <div className="container">
            {user && (
                <>
                <ProfileInfos
                    profilePicture={profilePicture}
                    username={username}
                    email={email}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                />
                    {favourites && (
                        <Favourites favourites={favourites} forceFetch={forceFetch} listType="favourites"/>
                    )}

                    {watchLater && (
                        <Favourites favourites={watchLater} forceFetch={forceFetch} listType="watchLater"/>
                    )}

                </>
            )}
        </div>
        </>
    )
}