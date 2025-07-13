import React from 'react';

const MovieCard = ({movie}) => {
  return (
    <div className='movie'>
      <div className='movie-image'>
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/400'} alt={movie.Title}/>
      </div>
      <div className='movie-info'>
        <span className='type'>{movie.Type}</span>
        <h3>{movie.Title}</h3>
        <p className='year'>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard
