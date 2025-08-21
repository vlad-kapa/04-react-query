import { useEffect, useState } from "react";
import css from "../App/App.module.css";
import type { Movie } from "../../types/movie";
import { getMovies } from "../../services/movieService";
import {Toaster, toast} from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from 'react-paginate';


function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => getMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isSuccess || data.total_results > 0) {
      return;
    }
    toast.error("No movies found for your request.");
  }, [data, isSuccess]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectedMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" reverseOrder={false} />
      {data?.total_pages && data.total_pages > 1 ? (
        <ReactPaginate
        pageCount={data.total_pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
      ) : null}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length && (
        <MovieGrid movies={data.results} onSelect={handleSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;