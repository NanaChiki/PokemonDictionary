import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon.js';

function App() {
  // Initial Endpoint
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // State to store all pokemon data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPokemonData = async () => {
      // Fetch all pokemon data till the end of the page
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  
  return <div className="App">
    {loading ? <h1>Loading ...</h1> : <h1>Pokemon Cards have been loaded</h1>}
  </div>;
}

export default App;
