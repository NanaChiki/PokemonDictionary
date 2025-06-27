import { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon.js';

function App() {
  // Initial Endpoint
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  useEffect(() => {
    const fetchPokemonData = async () => {
      // Fetch all pokemon data till the end of the page
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);
  
  return <div className="App"></div>;
}

export default App;
