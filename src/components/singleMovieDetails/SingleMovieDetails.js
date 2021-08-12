
import styles from "./singleMovieDetails.module.css"


export const SingleMovieDetails = ({movie})=>  {
    console.log(movie)
    const {
    awards ,
        cast ,
        countries ,
        fullplot ,
        poster ,
        directors ,
        genres ,
        imdb ,
        writers ,
        languages ,
        title ,
        released ,
        type } = movie ;
    return (
        <>
        <div className={`${styles.global} row`} >


            <div className="col-md-12 col-lg-6">
            <img src={poster} alt=" movie poster" className="img-thumbnail"/>
            </div>
            <div className={` col-md-12 col-lg-6 ${styles.paragraph}`}>

                <h1 className={styles.title}>{title} ( {type} ) </h1>
                <div  className="row justify-content-around ">
                    <h3 className="btn-outline-danger">Genres :</h3>
                    {genres.map((genre , index) => <div className="col-2 "  key={index} >{genre} </div>)}
                </div>
                 <h3  className="btn-outline-danger">full description :</h3>
                <p>{fullplot}</p>
                <div className="row alert btn-outline-danger ">
                    <h3> awards : {awards.text}</h3>
                </div>
                <div className="row justify-content-center">
                    <h3> released : {(new Date(released)).toDateString()}</h3>
                </div>
            </div>
        </div>

            <div className={`${styles.description} row `}>
                <div className="row justify-content-center">
                    <h3>main actors :</h3>
                    {cast.map((actor , index)=> <div  key={index} className="col-lg-3 col-md-6 "> {actor}</div>)}
                </div>
                <div className="row justify-content-center">
                    <h3> directed by :</h3>
                    {directors.map((director , index) => <div key={index} className="col-lg-3 col-md-6 ">{director}</div>)}
                </div>
                <div className="row justify-content-center">
                    <h3> written by :</h3>
                    {writers.map((writer , index) => <div key={index} className="col-lg-3 col-md-6 ">{writer}</div>)}
                </div>
                <div className="row justify-content-center">
                    <h3> countries :</h3>
                    {countries.map((country , index) => <div key={index} className="col-lg-3 col-md-6 ">{country}</div>)}
                </div>
                <div className="row justify-content-center">
                    <h3> languages :</h3>
                    {languages.map((language , index) => <div key={index} className="col-lg-3 col-md-6">{language}</div>)}
                </div>


                <div className="row justify-content-center">
                    <h3> imdb :  </h3>
                    <div className="col-3">
                        rating {imdb.rating["$numberDecimal"]}
                    </div>
                    <div className="col-3">
                        votes {imdb.votes}
                    </div>
                </div>
            </div>

        </>
    )
}