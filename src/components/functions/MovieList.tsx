import React from "react";
import { Movie } from '../Pages/Home';
import { FaHeart } from "react-icons/fa";

interface Props {
    movies: Movie[];
    currentPage: number;
    totalPages: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
}

const MovieList: React.FC<Props> = ({ movies, currentPage, totalPages, handleNextPage, handlePrevPage }) => {
    return (
        <>
            <div className="title"><h2>Movies:</h2></div>
            <div className="App">
                {movies.map((movie) => (
                    <div className="movie-container" key={movie.id}>
                        <h2>{movie.title}</h2>
                        {movie.poster_path && (
                            <div className="image-container">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} Poster`} />
                                <div className='overlay d-flex align-items-center justify-content-center'><button>Add to Favourites<FaHeart color="darkred" /></button></div>
                            </div>
                        )}
                        <p>Release date: {movie.release_date}</p>
                        <p>Vote average: {movie.vote_average}</p>
                    </div>
                ))}
            </div>
            {(totalPages!==1)&&(
                <div className="pagination">
                    <footer>
                        <button className="prevBtn" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <span className="pageNumber">{currentPage} of {totalPages}</span>
                        <button className="nextBtn" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </footer>
                </div>)}
        </>
    );
};

export default MovieList;
