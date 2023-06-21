import React from 'react';
import './characterCard.css';

function CharacterCard({ character, onClick }) {
  return (
    <div className='card' onClick={onClick}>
      <h4>{character.name}</h4>
      <h5>{character.birth_year}</h5>
    </div>
  );
}

export default CharacterCard;
