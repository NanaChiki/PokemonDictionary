import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './utils/components/Card/card.js';
import Navbar from './utils/components/Navbar/Navbar.js';
import MyFooter from './utils/components/MyFooter/MyFooter.js';

function App() {
  // Initial Endpoint
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  // State to store all pokemon data
  const [loading, setLoading] = useState(true);
  // State to store each pokemon's detailed data
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // Fetch all pokemon data till the end of the page
      let res = await getAllPokemon(initialURL);
      console.log('All pokemon data : ', res);
      console.log('All pokemon data results : ', res.results);

      // Fetch detailed data of each pokemon
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // Promise.all receives an array as an argument and ensures that all the data in the array is fetched

    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // pokemon.url is the endpoint path to the pokemon's detailed data
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData); // Store the fetched data in state
  };
  // since _pokemonData is stored in state, we can access it outside of the loadPokemon function
  console.log('Detailed data 2: ', pokemonData);

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div className="pokemonCardContainer">
            {/* <h1 class="appName">Pokemon Dictionary</h1> */}
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        )}
      </div>
      <MyFooter />
    </>
  );
}

export default App;
