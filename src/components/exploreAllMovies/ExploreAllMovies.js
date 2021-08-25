import {ExploreMovieCard} from "../exploreMovieCard/ExploreMovieCard";

export const ExploreAllMovies =({movies}) => {
console.log("movies+ " +movies)
return (
    <>
        {movies && (
            <div className="row">
                {movies.map(singleMovie => <ExploreMovieCard key={singleMovie._id} movie ={singleMovie}/>)}
            </div>
        )}


    </>
)
}