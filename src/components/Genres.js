import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { genresApi } from 'api';
import { NavLink } from 'react-router-dom';

const GenresBox = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

const Genre = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }
    
    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        margin-right: 1rem;
        &:hover {
            color: #3bc9db;
        }
    }

    & + & {
        margin-left: 1rem;
    }
`;

const Genres = ({ onSelect, genreId }) => {
    const [ genres, setGenres ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const {
                    data: { genres: genresResult }
                } = await genresApi.genreList();
                setGenres(genresResult.slice(0, 7));
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if(loading) {
        return <GenresBox>Loading...</GenresBox>;
    }

    if(!genres) {
        return null;
    }

    return (
        <GenresBox>
            <Genre
                key='all'
                activeClassName='active'
                exact={true}
                to={{
                        pathname: '/',
                        pathGenreId: 'all'
                    }}>Home</Genre>
            {genres.map((gen) => (
                <Genre 
                    key={gen.id}
                    activeClassName="active"
                    exact={false}
                    to={{
                            pathname: `/${gen.name}`,
                            pathGenreId: gen.id
                        }}>
                    {gen.name}
                </Genre>
            ))}
        </GenresBox>
    );
}

export default Genres;
