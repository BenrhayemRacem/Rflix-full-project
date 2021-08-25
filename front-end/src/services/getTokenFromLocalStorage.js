

const getTokenFromLocalStorage = ()=> {
    let token = localStorage.getItem("token");
    if(token) {
        return JSON.parse(token) ;
    }
    return "" ;
}

export default getTokenFromLocalStorage;