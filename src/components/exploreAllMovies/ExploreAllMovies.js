import {ExploreMovieCard} from "../exploreMovieCard/ExploreMovieCard";

export const ExploreAllMovies =({movies}) => {

return (
    <>

        <div className="row">
            {movies.map(singleMovie => <ExploreMovieCard key={singleMovie._id} movie ={singleMovie}/>)}
        </div>

    </>
)
}