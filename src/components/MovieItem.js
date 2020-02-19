import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const MovieItemBox = styled.div `
    display: flex;

    & + & {
        margin-top: 3rem;
    }
`;

const Thumbnail = styled.div `
    margin-right: 1rem;
    img {
        display: block;
        width: 100px;
        height: 160px;
        object-fit: cover;
    }
`;

const MovieItemInfo = styled.div `
    h2 {
        margin: 0;
        a {
            color: black;
        }
    }
    p {
        margin: 0;
        line-height: 1.5;
        margin-top: 0.5rem;
        white-space: normal;
    }
`;

const MovieItem = ({ movie }) => {
    const {id, title, overview, poster_path, homepage} = movie;
    return (
            <MovieItemBox>
                {poster_path && (
                    <Link
                        to={{
                            pathMovieId: id
                        }}>
                        <Thumbnail>
                            <img
                                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                                target="_blank"
                                alt="thumbnail"/>
                        </Thumbnail>
                    </Link>
                )}
                <MovieItemInfo>
                    <h2>
                        <a href={homepage} target="_blank" rel="noopener noreferrer">
                            {title}
                        </a>
                    </h2>
                    <p>{overview}</p>
                </MovieItemInfo>
            </MovieItemBox>
    );
}

export default MovieItem;
