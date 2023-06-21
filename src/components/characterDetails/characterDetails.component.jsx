import React from 'react';
import './characterDetails.css';

function CharacterDetails({ characterData, films, starships, isFavorite, handleFavoriteToggle, favoriteCharacters }) {
  const handleGoBack = () => {
    window.history.back();
  };

  const renderFilms = () => {
    if (films.length === 0) return null;

    return (
      <>
        <h3>Films:</h3>
        <ul>
          {films.map((film, index) => (
            <li key={index}>{film}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderStarships = () => {
    if (starships.length === 0) return null;

    return (
      <>
        <h3>Starships:</h3>
        <ul>
          {starships.map((starship, index) => (
            <li key={index}>{starship}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderFavoriteCharacters = () => {
    if (favoriteCharacters.length === 0) return null;

    return (
      <>
        <h3>Favorites:</h3>
        <ul>
          {favoriteCharacters.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="card">
      <h2>Character Details</h2>
      <h3>Name: {characterData.name}</h3>
      <h3>birth year{characterData.birth_year}</h3>
      <h3>Height: {characterData.height}</h3>
      <h3>Mass {characterData.mass}</h3>
      <h3>Gender: {characterData.gender}</h3>
      <h3>Skin Color: {characterData.skin_color}</h3>
      <h3>Hair Color: {characterData.hair_color}</h3>
      <h3>Eye Color: {characterData.eye_color}</h3>


      {renderFilms()}
      {renderStarships()}

      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      {renderFavoriteCharacters()}

      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default CharacterDetails;
