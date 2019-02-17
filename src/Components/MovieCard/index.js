import React, {Component} from 'react';

import './style.css';

export default class MovieCard extends Component {
    render() {

        const backgroundImage = this.props.posterurl;

        return (
            <div className={'MovieCard'} style={{'backgroundImage' : `url(${backgroundImage})`}}>
                <span className={'movieRating'}>{this.props.rating}</span>
                <div className={'cardFooter'}>
                    <span className={'movieTitle'}>{this.props.title}</span>
                    <span className={'movieYear'}>{this.props.year}</span>
                    <p className={'movieDescription'}>{this.props.description}</p>
                </div>
            </div>
        )
    }
}