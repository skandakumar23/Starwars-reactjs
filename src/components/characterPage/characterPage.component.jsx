import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CharacterDetails from '../characterDetails/characterDetails.component';

function CharacterPage() {
  const { characterId } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCharacterIds, setFavoriteCharacterIds] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${characterId}/`);
        const character = response.data;
        setCharacterData(character);
        fetchCharacterFilms(character);
        fetchStarships(character);
      } catch (error) {
        setError(error.message);
      }
    };

    if (characterId) {
      fetchCharacterData();
    }
  }, [characterId]);

  useEffect(() => {
    const storedFavoriteCharacterIds = JSON.parse(localStorage.getItem('favoriteCharacterIds')) || [];
    setFavoriteCharacterIds(storedFavoriteCharacterIds);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCharacterIds', JSON.stringify(favoriteCharacterIds));
  }, [favoriteCharacterIds]);

  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      try {
        const favoriteCharacterPromises = favoriteCharacterIds.map(async (id) => {
          const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
          return response.data.name;
        });
        const favoriteCharacterNames = await Promise.all(favoriteCharacterPromises);
        setFavoriteCharacters(favoriteCharacterNames);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFavoriteCharacters();
  }, [favoriteCharacterIds]);

  const fetchCharacterFilms = async (character) => {
    try {
      const filmsData = await Promise.all(
        character.films.map(async (filmUrl) => {
          const filmResponse = await axios.get(filmUrl);
          return filmResponse.data.title;
        })
      );
      setFilms(filmsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchStarships = async (character) => {
    try {
      const starshipsData = await Promise.all(
        character.starships.map(async (starshipUrl) => {
          const starshipResponse = await axios.get(starshipUrl);
          return starshipResponse.data.name;
        })
      );
      setStarships(starshipsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    setFavoriteCharacterIds((prevFavoriteCharacterIds) =>
      prevFavoriteCharacterIds.includes(characterId)
        ? prevFavoriteCharacterIds.filter((id) => id !== characterId)
        : [...prevFavoriteCharacterIds, characterId]
    );
  };

  useEffect(() => {
    setIsFavorite(favoriteCharacterIds.includes(characterId));
  }, [characterId, favoriteCharacterIds]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!characterData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CharacterDetails
        characterData={characterData}
        films={films}
        starships={starships}
        isFavorite={isFavorite}
        handleFavoriteToggle={handleFavoriteToggle}
        favoriteCharacters={favoriteCharacters}
      />
    </div>
  );
}

export default CharacterPage;
