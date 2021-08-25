import {useEffect, useState} from "react";
import useWindowDimensions from "../windowDimensions/WindowDimensions";
import {ProfileWatchLaterOrFavouritesSingleElement} from "../profileWatchLaterOrFavouritesSingleElement/ProfileWatchLaterOrFavouritesSinglleElement";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import styles from "./profileList.module.css"


export const ProfileWatchLaterOrFavouritesList =(props)=> {
    const {favouriteMovieList ,list ,forceFetch} = props ;
    const [prevDisabled , setPrevDisabled] = useState(true) ;
    const [nextDisabled , setNextDisabled] = useState(false) ;
    const [index , setIndex] = useState(0) ;
    const[maxIndex , setMaxIndex] =useState(0) ;
    const [numberElements  , setNumberElements] = useState(1);
    const {width } = useWindowDimensions() ;
     const slicedList = favouriteMovieList.slice(index , maxIndex) ;
     const prevIsDisabled = prevDisabled? "disabled" :"";
    const nextIsDisabled = nextDisabled? "disabled" :""

     const handleNext = ()=> {
         console.log("min index" + index) ;
         console.log("max index" + maxIndex)
            if(maxIndex<favouriteMovieList.length) {
                setIndex(index+1) ;
                setMaxIndex(numberElements+index+1)
                setPrevDisabled(false)
            } else {
                setNextDisabled(true)
            }


         console.log(slicedList)
         console.log("next clicked")
         console.log("min index" + index) ;
            console.log("max index" + maxIndex)
     }
     const handlePrev = ()=> {
         if(index >0) {

             setIndex(index-1) ;
             setMaxIndex(numberElements+index-1)
             setNextDisabled(false)
         } else {
             setPrevDisabled(true)
         }
         console.log(slicedList)
         console.log("prev clicked")
         console.log("min index" + index) ;
         console.log("max index" + maxIndex)
     }

    useEffect(()=> {
         if(width > 992) {
             setNumberElements(3);
             setMaxIndex(3)
         }else {
             setNumberElements(1) ;
             setMaxIndex(1)
         }
    } ,[width])

if(numberElements===3) {
    return (
        <>
            <div className={`${styles.global } container-fluid justify-content-center`}>
            <h1>{list}</h1>
            <div className="row">
                <div className={`${styles.chevron} col-1`}>
                    <button
                    onClick={handlePrev}
                    className={`${prevIsDisabled} btn btn-danger`}
                >
                    <FaChevronLeft/>
                </button>
                </div>
            {slicedList.map((element)=> <div  key={element._id} className="col">
                <ProfileWatchLaterOrFavouritesSingleElement singleItem={element} list={list}  forceFetch={forceFetch}/>
            </div>)}
                <div className={`${styles.chevron} col-1`}>
                    <button
                        onClick={handleNext}
                        className={`${nextIsDisabled} btn btn-danger`}
                    >
                        <FaChevronRight/>
                    </button>
                </div>

            </div>
            </div>
        </>
    )

}
return (
    <>
        <div className={`${styles.global } container-fluid justify-content-center`}>
        <h1>{list}</h1>
        <div className="row justify-content-center">
            <div className={`${styles.chevron} col-1`}>
                <button
                    onClick={handlePrev}
                    className={`${prevIsDisabled} btn btn-danger`}
                >
                    <FaChevronLeft/>
                </button>
            </div>
            {slicedList.map((element)=> <div  key={element._id} className="col">
                <ProfileWatchLaterOrFavouritesSingleElement singleItem={element}  list={list} forceFetch={forceFetch}/>
            </div>)}
            <div className={`${styles.chevron} col-1`}>
                <button
                    onClick={handleNext}
                    className={`${nextIsDisabled} btn btn-danger`}

                >
                    <FaChevronRight/>
                </button>
            </div>
        </div>
        </div>
    </>
)

}