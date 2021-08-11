import  styles from "./homeMainImage.module.css"

export const HomeMainImage = ()=> {

    return (
        <>

        <div className={`${styles.imgContainer}  align-items-end`} >

            <h1 className={styles.titleH1}>  Watch your favourite show </h1>
            <h2>anytime </h2>
            <h2>anywhere</h2>

            <button type="button" className="btn btn-danger btn-lg">subscribe now</button>
        </div>

        </>
    )
        }
