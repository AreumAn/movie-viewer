import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviePages from 'pages/MoviePages';
import MovieDetail from './components/MovieDetail';

const App = () => {
    return (
        // ? means optional
        <Switch>
            <Route path="/:genre?" component={MoviePages} />
            <Route path="/:id?" component={MovieDetail} />
        </Switch>
    );
}

export default App;
