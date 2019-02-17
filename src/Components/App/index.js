import React, {Component} from 'react';

import './style.css';

import Header from '../Header';
import MovieList from '../MovieList';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <MovieList/>
            </div>
        )
    }
}