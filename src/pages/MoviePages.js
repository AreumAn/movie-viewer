import React from 'react';
import Genres from '../components/Genres';
import MovieList from '../components/MovieList';
import MovieDetail from '../components/MovieDetail';

const MoviePages = ({ location }) => {
    const genreId = location.pathGenreId || 'all';
    const { pathMovieId } = location;

    return (
        <>
            <Genres />
            {pathMovieId ? 
                <MovieDetail pathMovieId={pathMovieId}/> 
                : <MovieList genreId={genreId} />}
        </>
    );
}

export default MoviePages;
