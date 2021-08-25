import  styles from "./homeMainImage.module.css"
import {Link} from "react-router-dom";

export const HomeMainImage = ()=> {

    return (
        <>

        <div className={`${styles.imgContainer}   `} >
            <div className={styles.blackTop}></div>
            <h1 className={styles.titleH1}>  Find your favourite show </h1>
            <button type="button" className="btn btn-danger btn-lg"><Link to="/register">subscribe now</Link></button>
            <div className={styles.blackTop}></div>
        </div>

        </>
    )
        }
