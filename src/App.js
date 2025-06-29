import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';

function App() {
  // Initial Endpoint
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // State to store all pokemon data
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPokemonData = async () => {
      // Fetch all pokemon data till the end of the page
      let res = await getAllPokemon(initialURL);
      console.log("All pokemon data : ",res);
      console.log("All pokemon data results : ", res.results);

      // Fetch detailed data of each pokemon
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = (data) => {
    // Promise.all receives an array as an argument and ensures that all the data in the array is fetched
    const _pokemonData = Promise.all(
      data.map(pokemon => {
          // pokemon.url is the endpoint path to the pokemon's detailed data
          let pokemonRecord = getPokemon(pokemon.url);
  
          return pokemonRecord;
        })
    );
  }

  return <div className="App">
    {loading ? <h1>Loading ...</h1> : <h1>Pokemon Cards have been loaded</h1>}
  </div>;
}

export default App;
