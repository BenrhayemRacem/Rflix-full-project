


export const ProfileInfos = (props)=> {
 const {profilePicture,username,createdAt,updatedAt,email} =props
    return(
        <>
            <img src={profilePicture} alt="profile picture"/>
            <h1>{username}</h1>
        </>
    )
}