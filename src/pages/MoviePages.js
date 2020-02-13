import React from 'react';
import Genres from 'components/Genres';
import MovieList from 'components/MovieList';

const MoviePages = ({ location }) => {
    const genreId = location.pathGenreId || 'all';
    return (
        <>
            <Genres />
            <MovieList genreId={genreId} />
        </>
    );
}

export default MoviePages;
