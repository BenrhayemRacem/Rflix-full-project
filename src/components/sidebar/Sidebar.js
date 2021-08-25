


import {Offcanvas} from "react-bootstrap";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import styles from "./sidebar.module.css"

export const Sidebar = (props)=> {
   const {show ,handleClose } =useGlobalContext() ;
   const {handleSearchTextChange ,handleSearchValueChange,searchText,setSearchAction} = props ;
    const handleSubmit =(event)=> {
        event.preventDefault()
        setSearchAction(true)

    }
    return(
        <Offcanvas show={show} onHide={handleClose} placement="end" className={styles.global} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search for your favorite movie</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="radio"
                            id="huey"
                            name="drone"
                            value="genre"
                            onChange={()=>handleSearchValueChange("genre")}
                               />
                            <label htmlFor="huey"> &nbsp; Genre</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="dewey"
                            name="drone"
                            value="cast"
                            onChange={()=>handleSearchValueChange("cast")}
                        />
                            <label htmlFor="dewey">&nbsp; Cast</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="louie"
                            name="drone"
                            value="title"
                            onChange={()=>handleSearchValueChange("title")}
                        />
                            <label htmlFor="louie">&nbsp; Title</label>
                    </div>
                        <div>
                            <input
                                type="text"
                            required
                                value={searchText}
                                onChange={(e)=>handleSearchTextChange(e.target.value)}
                            />
                        </div>
                    <button type="submit" className="btn btn-danger btn-lg"> submit</button>
                </form>
            </Offcanvas.Body>
        </Offcanvas>

    )
}