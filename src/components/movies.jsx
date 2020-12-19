import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "AllGenres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    console.log(movie._id);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleChange = (e) => {
    const word = e.target.value;
    this.setState({ word });
  };

  handleSearch = (query) => {
    console.log(query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      genres,
      selectedGenres,
    } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There is no movie in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="movies/new"
              className="btn btn-primary"
              style={{ marginTop: 7 }}
            >
              New Movie
            </Link>
          )}
          <SearchBox onChange={this.handleSearch} value={searchQuery} />
          <p className="p-3">Showing {totalCount} movies in the databse.</p>
          <MoviesTable
            user={user}
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
