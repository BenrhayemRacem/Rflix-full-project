


const getEmailFromLocalStorage = ()=> {
    let email = localStorage.getItem("email") ;
    if(email) {
        return( JSON.parse(email))
    }
    return ""

}

export default getEmailFromLocalStorage;