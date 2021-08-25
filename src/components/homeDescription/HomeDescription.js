
import styles from "./homeDescription.module.css"
import {Link} from "react-router-dom";
import {BsChevronRight} from "react-icons/bs";


export const HomeDescription = ()=> {

    return(

            <div className={`${styles.introSection} row`}>
        <div className={`col-lg-6 col-md-12 `} >
            <p className={styles.introParagraph}>
                Rflix gives you the best experience in entertainment
                as you can watch unlimited movies and series with
                the highest quality
            </p>
        </div>
            <div className="col-lg-6 col-md-12 d-flex justify-content-center">
                <button className={`${styles.introButton} btn-warning btn-lg btn`} >
                    <Link to="/explore">
                        explore More <BsChevronRight className={styles.chevron}/>
                    </Link>
                </button>
            </div>

            </div>


    )



}