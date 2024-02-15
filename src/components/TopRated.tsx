import { useEffect, useState } from "react";
import { Movie, Page, HomeVars } from './Home';
import axios from "axios";
import { API_KEY } from '../env';
import './Home.css';

export const TopRated = ({ searchQuery }: HomeVars) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (searchQuery) {
          searchMovies(searchQuery, 1);
        } else {
          fetchData(1);
        }
      }, [searchQuery]);


    const fetchData = (page: number) => {
      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`)
        .then((response) => {
          const result: Page = response.data;
          setMovies(result.results);
          setTotalPages(result.total_pages);
          setCurrentPage(page);
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    const debounce = (func: Function, delay: number) => {
        let timeoutId: number;
        return function (this: any, ...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => func.apply(this, args), delay);
        };
    };

    const searchMovies = debounce((query: string, page: number) => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
            .then((response) => {
                const result: Page = response.data;
                setMovies(result.results);
                setTotalPages(result.total_pages);
                setCurrentPage(page);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
    }, 750);
  
    const handleNextPage = () => {
        let nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
          if (searchQuery) {
              searchMovies(searchQuery, nextPage);
          } else {
              fetchData(nextPage);
          }
      }
      };
      
      const handlePrevPage = () => {
        let prevPage = currentPage - 1;
        if (prevPage >= 1) {
          if (searchQuery) {
              searchMovies(searchQuery, prevPage);
          } else {
              fetchData(prevPage);
          }
      }
      };


    return (
            <>
            <div className="title"><h2>Top Rated:</h2></div>
            <div className="App">
            {movies.map((movie) => (
                <div className="movie-container" key={movie.id}>
                    <h2>{movie.title}</h2>
                    {movie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} Poster`} />
                    )}
                    <p>{movie.release_date}</p>
                    <p>Vote average: {movie.vote_average}</p>
                </div>
            ))}
            </div>
            <div className="pagination">
            <footer>
                <button className="prevBtn" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span className="pageNumber">{currentPage} of {totalPages}</span>
                <button className="nextBtn" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </footer>
            </div></>
    );
};
