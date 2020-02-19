import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieItem from './MovieItem';
import { moviesApi } from 'api';

const MovieListBox = styled.div `
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const MovieList = ({ genreId }) => {
    const [movies, setMovies] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const {
                    data: { results: upcomingMovies }
                } = await moviesApi.nowPlaying();
                setMovies(upcomingMovies);
                setSelectedMovies(upcomingMovies);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(movies && genreId && genreId !== 'all') {
            setSelectedMovies(
                movies.filter(movie => 
                    movie.genre_ids.indexOf(genreId) !== -1
                )
            );
        } else {
            setSelectedMovies(movies);
        }
    },[movies, genreId]);

    if(loading) {
        return <MovieListBox>Loading...</MovieListBox>;
    }

    if(!movies) {
        return null;
    }

    if(genreId && selectedMovies.length === 0) {
        return <MovieListBox>No item</MovieListBox>
    }

    return (
        <MovieListBox>
            {selectedMovies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </MovieListBox>
    )
};

export default MovieList;
