import React, {Component} from 'react';

import './style.css';

import MovieCard from '../MovieCard';
import PagesBar from '../PagesBar';

export default class MovieList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            err: null,
            isLoaded: true,
            movies: [],
            numberMovies: null,
            selectedPage: 1
        }
    }

    componentDidMount() {
        fetch('http://dev.bittenred.com:61537/movies')
            .then(result => result.json())
            .then((res) => {
                    this.setState({
                        isLoaded: false,
                        movies: res.movies,
                        numberMovies: res.found
                    });
                    },
                (error) => {
                    this.setState({
                        err: error,
                        isLoaded: true
                    });
                });
    }

    goToPage = (number) => {
        fetch(`http://dev.bittenred.com:61537/movies?start=${(number-1)*30}`)
            .then(result => result.json())
            .then((res) => {
                    this.setState({
                        isLoaded: false,
                        movies: res.movies,
                        selectedPage: number
                    });
                },
                (error) => {
                    this.setState({
                        err: error,
                        isLoaded: true
                    });
                });
    };

    render() {
        const isLoaded = this.state.isLoaded;
        const error = this.state.err;
        const numberPages = parseInt(this.state.numberMovies / 30);
        const selectedPage = this.state.selectedPage;
        const movies = this.state.movies.map((movie,index) => {
            return (
                <li key={index}><MovieCard
                    title={movie.title}
                    rating={movie.imdbRating}
                    year={movie.year}
                    posterurl={movie.posterurl}
                    description={movie.storyline}
                /></li>
            )
        });
        let result = null;
        if (error) {
            result = <h1 className={'error'}>Ошибка загрузки</h1>
        } else if(isLoaded) {
            result = <h1 className={'info'}>Данные загружаются...</h1>
        } else {
            result = movies;
        }
        
        return (
            <ul className={'MovieList'}>
                {result}
                <PagesBar
                    handle={this.goToPage}
                    numberPages={numberPages}
                    selectedPage={selectedPage}
                />
            </ul>
        )
    }
}
