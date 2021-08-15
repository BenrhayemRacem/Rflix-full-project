


export const OneComment = (props)=> {
    const singleComment = props.singleComment ;


    return (
        <>

        <div className="col-6">
            <img src={singleComment.commenter[0].profilePicture} alt=" user profile picture" className="img-thumbnail"/>
        </div>
            <div className="col-4">
            <h3> {singleComment.commenter[0].username}</h3>
            <p> {singleComment.description}</p>
            <h5> {new Date(singleComment.updatedAt).toDateString()}</h5>
            </div>
        </>
    )
}