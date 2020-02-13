import React from 'react';
import { Route } from 'react-router-dom';
import MoviePages from 'pages/MoviePages';

const App = () => {
    return (
        // `?` means optional
        <Route path="/:genre?" component={MoviePages} />
    );
}

export default App;
