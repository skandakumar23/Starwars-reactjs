import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../characterCard/characterCard.component';
import PaginationButtons from '../paginationButtons/paginationButtons.component';
import Heading from '../heading/heading.component';
import './posts.css';
import './background.css';

function Posts() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
        const charactersWithId = response.data.results.map((character, index) => ({
          ...character,
          id: (currentPage - 1) * 10 + index + 1,
          isFavorite: favorites.includes((currentPage - 1) * 10 + index + 1),
        }));
        console.log(charactersWithId);
        setCharacters(charactersWithId);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.log('Error getting data:', error);
      }
    };

    fetchCharacters();
  }, [currentPage, favorites]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleCardClick = characterId => {
    navigate(`/characters/${characterId}`);
  };

  const handleFavoriteToggle = characterId => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(characterId)) {
        return prevFavorites.filter(id => id !== characterId);
      } else {
        return [...prevFavorites, characterId];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="container">
      <Heading heading>STAR WARS</Heading>
      <div className="card-for-detail">
        {characters.map(character => (
          <CharacterCard
            key={character?.id}
            character={character}
            isFavorite={character?.isFavorite}
            onClick={() => handleCardClick(character?.id)}
            onFavoriteToggle={() => handleFavoriteToggle(character?.id)}
          />
        ))}
      </div>
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default Posts;
