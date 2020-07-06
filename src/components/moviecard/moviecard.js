import React from 'react';
import Axios from 'axios';


class MovieCard extends React.Component {
    state = {
        moviesList: ['tt3896198'],
        searchTerm: ''
        //movieData: {}
    };

    componentDidMount() {
        Axios.get(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${this.props.movieID}&plot=full`
        ).then(res => res.data)
        .then(res => {
            this.setState({ movieData: res });
        });
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating
        } = this.state.movieData;

        if (!Poster || Poster === 'N/a') {
            return null;
        }

        return (
            <div className="movie-card-container">
                <div className="image-container">
                    <div className="bg-image" style={{ backgroundImage: `url(${Poster})` }}>

                    </div>
                </div>
                <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                        <h1>{Title}</h1>
                        <small>Released Date: {Released}</small>
                    </div>
                    <h4>Rating: {imdbRating} / 10</h4>
                    <p>{Plot && Plot.substr(0, 350)}</p>
                    <div className="tags-container">
                        {Genre && Genre.split(', ').map(g => (
                            <span key={g}>{g}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}