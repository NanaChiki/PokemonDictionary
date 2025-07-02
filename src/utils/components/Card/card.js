// rafce: component 1
import React from 'react';
import './Card.css';

const card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>

      <h3 class="cardName">{pokemon.name}</h3>

      <div className="cardTypes">
        <h4>{pokemon.types.length > 1 ? 'Types' : 'Type'}</h4>
        {pokemon.types.map((type, i) => {
          return (
            <div key={i}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>

      <div className="cardInfo">
        <div className="cardData">
          <p className="title">Id: {pokemon.id}</p>
        </div>
        <div className="cardData">
          <p className="title">Weight: {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">Height: {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">Ability: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default card;
