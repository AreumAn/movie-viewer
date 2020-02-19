import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "94abad8b6e42cfebed4f0232a57158d4",
        language: "en-US"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get('movie/now_playing'),
    movieDetail: id => 
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos"
            }
        }),
};

export const genresApi = {
    genreList: () => api.get('genre/movie/list'),
};
