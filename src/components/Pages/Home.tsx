import { useEffect, useState } from "react";
import { searchMovies, fetchMovies } from '../functions/Api';
import MovieList from '../functions/MovieList';
import '../../components/Home.css';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface Page {
  page: number;
  total_pages: number;
  results: Movie[];
  total_results: number;
}

export interface HomeVars {
  searchQuery: string;
}

export const Home = ({ searchQuery }: HomeVars) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (searchQuery && searchQuery.trim() !== "") {
            const timeoutId = setTimeout(() => {
                searchMovies(searchQuery, 1)
                    .then(result => {
                        setMovies(result.results);
                        setTotalPages(result.total_pages);
                        setCurrentPage(1);
                    });
            }, 1000); 
            return () => clearTimeout(timeoutId); 
        } else {
            if (!loaded) {
                fetchData(1);
                setLoaded(true);
            }
        }
    }, [searchQuery, loaded]);

    const fetchData = (page: number) => {
      fetchMovies('/movie/popular', page)
        .then(result => {
          setMovies(result.results);
          setTotalPages(result.total_pages);
          setCurrentPage(page);
        }).catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            if (searchQuery && searchQuery.trim() !== "") {
                searchMovies(searchQuery, nextPage)
                    .then(result => {
                        setMovies(result.results);
                        setTotalPages(result.total_pages);
                        setCurrentPage(nextPage);
                    });
            } else {
                fetchData(nextPage);
            }
        }
    };
      
    const handlePrevPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            if (searchQuery && searchQuery.trim() !== "") {
                searchMovies(searchQuery, prevPage)
                    .then(result => {
                        setMovies(result.results);
                        setTotalPages(result.total_pages);
                        setCurrentPage(prevPage);
                    });
            } else {
               fetchData(prevPage);
            }
        }
    };

    return (
        <MovieList
            movies={movies}
            currentPage={currentPage}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}/>
    );
};