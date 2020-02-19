import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { moviesApi } from 'api';

const Container = styled.div`
    height: calc(100vh - 50px);
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;


const MovieDetail = ({ pathMovieId }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                if(pathMovieId) {
                    const {
                        data: movieDetails
                    } = await moviesApi.movieDetail(pathMovieId);
                    setMovie(movieDetails);
                }
            } catch(e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [pathMovieId]);

    if(loading) {
        return <Container>Loading...</Container>;
    }

    if(!movie) {
        return null;
    }

    return (
        <>
            <Container>
                <title>
                {movie.original_title ? movie.original_title : movie.original_name}{" "}
                </title>
                <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
                <Content>
                    <Cover
                        bgImage={
                            movie.poster_path && `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        }
                    />
                    <Data>
                        <Title>
                            {movie.original_title
                            ? movie.original_title
                            : movie.original_name}
                        </Title>
                        <ItemContainer>
                            <Item>
                            {movie.release_date
                                ? movie.release_date.substring(0, 4)
                                : movie.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                            {movie.runtime ? movie.runtime : movie.episode_run_time[0]} min
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                            {movie.genres &&
                                movie.genres.map((genre, index) =>
                                index === movie.genres.length - 1
                                    ? genre.name
                                    : `${genre.name} / `
                                )}
                            </Item>
                        </ItemContainer>
                        <Overview>{movie.overview}</Overview>
                    </Data>
                </Content>
            </Container>
        </>
    )

}

export default MovieDetail;
