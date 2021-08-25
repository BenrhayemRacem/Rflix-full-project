
import styles from "./profileInfos.module.css"

export const ProfileInfos = (props)=> {
 const {profilePicture,username,createdAt,updatedAt,email} =props
    return(
        <>
            <div className={`${styles.global} row`}>
                <div className="col-lg-4 col-md-12">
            <img src={profilePicture} alt="profile picture"/>

                </div>
                <div className="col">
                    <div className="row">
                    <div className="col">
                        <h3>Username :</h3>
                    </div>
                    <div className="col">
                        <h3>{username}</h3>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Email :</h3>
                        </div>
                        <div className="col">
                            <h3>{email}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Account created at :</h3>
                        </div>
                        <div className="col">
                            <h3>{new Date(createdAt).toLocaleDateString()}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Last update at :</h3>
                        </div>
                        <div className="col">
                            <h3>{new Date(updatedAt).toLocaleDateString()}</h3>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}