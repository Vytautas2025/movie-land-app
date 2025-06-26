import {useState, useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// 16577566

const API_URL = 'https://www.omdbapi.com?apikey=16577566'

const movie =
  {
    "Title": "The Thirteenth Floor",
    "Year": "1999",
    "imdbID": "tt0139809",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNGY0NjNiMGQtNGQwNy00YmMwLThhZmQtNzQ1OWUwOTE3NzhjXkEyXkFqcGc@._V1_SX300.jpg"
}


const App = () => {

  const [movies, setMovies] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    if (title) {

      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } else {

      const currentYear = new Date().getFullYear();
      const fetchPromises = [];

      for (let page = 1; page <= 5; page++) {
        fetchPromises.push(fetch(`${API_URL}&s=movie&y=${currentYear}&page=${page}`));
      }

      const responses = await Promise.all(fetchPromises);
      const data = await Promise.all(responses.map(res => res.json()));

      const allMovies = data.flatMap(result => result.Search || []);
      setMovies(allMovies);
    }
  }

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className="search-container">
        <input
          type="text" placeholder="Search..."
          className="search-bar" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          className="search-icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

    {movies.length > 0
      ? (
        <div className='container'>
          {movies.map((movie) =>
            <MovieCard movie={movie} />
          )}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
