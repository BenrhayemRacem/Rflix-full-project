import {Loader} from "../../components/loader/Loader";
import {ExploreAllMovies} from "../../components/exploreAllMovies/ExploreAllMovies";
import styles from "./explore.module.css"
import {useEffect, useState} from "react";
import {ExplorePagination} from "../../components/explorePagination/ExplorePagination";
import {Alert} from "../../components/alert/Alert";
import {FiSearch} from "react-icons/fi";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {Sidebar} from "../../components/sidebar/Sidebar";
const axios = require ('axios') ;
axios.defaults.baseURL = 'http://localhost:5000';
export const Explore =()=> {

    const [searchValue,setSearchValue] =useState("");
    const [searchText,setSearchText] =useState("");
    const[searchAction , setSearchAction] = useState(false)
    const[loading , setLoading] = useState(true) ;
    const[movies , setMovies] = useState([]) ;
    const [page, setPage] = useState(0) ;
    const [mainPage , setMainPage] = useState(true) ;
    const [searchPage , setSearchPage] =useState(0)
    const{displayAlerts , handleClose ,handleShow ,show}  = useGlobalContext()
    const correctPage = mainPage ? page :searchPage
    const changePage = (numPage)=> {
        if( mainPage) {
            if(numPage<=0) {
                setPage(0)

            }else {

                setPage(numPage)
            }
        } else {

                if(numPage<=0) {
                    setSearchPage(0)

                }else {
                        if(show) {
                            setSearchPage(0)
                        } else {
                            setSearchPage(numPage)
                        }

                }
            }

        }



   const handleInitMainPage = ()=> {
        setMainPage(true)
       setSearchText("")
       setSearchValue("")
       setSearchPage(0) ;
        setPage(0)
   }

const getAllMovies =async ()=> {
    try {
        if(searchValue ) {
            setMainPage(false)
        }
        setLoading(true)
        console.log(mainPage)
      const response =   await axios.get(`api/movie/search?${searchValue}=${searchText}&page=${show?0:correctPage}`) ;
      const data = response.data ;
      console.log(response.data.length)

      setMovies(data)
      setLoading(false)

    }catch (e) {
        setLoading(false)

        displayAlerts("danger" ,e.response.data)

console.log(e)
    }finally {
        setLoading(false);
        setSearchAction(false);
        // setSearchValue("") ;
        // setSearchText("");
        handleClose()
        console.log(searchAction)
    }

}
useEffect(async ()=> await getAllMovies() ,[page , searchPage ,searchAction , mainPage])
    return(
        <>

            <div className={`${styles.global} container`}>
                <Alert/>
               {loading&& (
                   <div className="row">
                   <Loader/>
               </div>
               ) }
                <>
                    <Sidebar
                        handleSearchValueChange={setSearchValue}
                        handleSearchTextChange={setSearchText}
                        searchText={searchText}
                        setSearchAction={setSearchAction}

                    />

                </>
               {!loading && (
                   <>
                       <div className="row justify-content-end">
                       <div className="col-2">
                       <button className="btn btn-danger btn-lg" onClick={()=>handleShow()}> <FiSearch/></button>
                       </div>
                       </div>
                       {mainPage===false && (
                           <div className="col-lg-5 col-md-10" style={{marginBottom:15}}>
                           <button className="btn btn-danger btn-lg" onClick={()=>handleInitMainPage()} > go back to main page</button>
                           </div>
                       )}
                   <div className="row justify-content-center">
                       <ExplorePagination page={correctPage} changePage={changePage}/>
                   </div>
                   <div className="row ">
                   <ExploreAllMovies movies ={ movies}/>
                   </div>
                   <div className="row justify-content-center">
                   <ExplorePagination page={correctPage} changePage={changePage} />
                   </div>
                   </>
               )}
           </div>
        </>

    )
}