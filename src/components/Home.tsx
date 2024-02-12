import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from '../env';
import './Home.css';


interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }
  
interface Page {
    page: number;
    total_pages: number;
    results: Movie[];
    total_results: number;
  }

  interface HomeVars {
    searchQuery: string;
  }

export const Home = ({ searchQuery }: HomeVars) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
  
    useEffect(() => {
        if (searchQuery) {
          searchMovies(searchQuery);
        } else {
          fetchData(1);
        }
      }, [searchQuery]);

  
    const fetchData = (page: number) => {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
        .then((response) => {
          const result: Page = response.data;
          setMovies(result.results);
          setTotalPages(result.total_pages);
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    const searchMovies = (query: string) => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
          .then((response) => {
            const result: Page = response.data;
            setMovies(result.results);
            setTotalPages(result.total_pages);
          }).catch(error => {
            console.error('Error fetching search data:', error);
          });
      };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };

    return (
        <><div className="App">
            {movies.map((movie) => (
                <div className="movie-container" key={movie.id}>
                    <h2>{movie.title}</h2>
                    {movie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} Poster`} />
                    )}
                    <p>{movie.release_date}</p>
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