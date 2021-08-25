import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export const ExplorePagination =({page , changePage}) => {
const prevDisabled = page===0? "disabled" : ''
    return (
<>

    <div className="col-2">
        <button   className= {`${prevDisabled} btn btn-lg btn-danger`} onClick={()=>changePage(page-1)}> <FaChevronLeft/></button>
    </div>
    <div className="col-2">
        <h1 >{page +1}</h1>
    </div>
    <div className="col-2">
        <button  className="btn-danger btn-lg" onClick={()=>changePage(page+1)}> <FaChevronRight/></button>
    </div>



</>
    )
}

