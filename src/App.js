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
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');


  useEffect(() => {
    const fetchPokemonData = async () => {
      // Fetch all pokemon data till the end of the page
      let res = await getAllPokemon(initialURL);
      
      console.log('All pokemon data : ', res);
      console.log('All pokemon data results : ', res.results);
     
      // Store the URL of the next & previous 20 pokemon
      setNextURL(res.next);
      setPrevURL(res.previous);
      
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

 const handleNextPage = async () => {
  setLoading(true);
  let nextData = await getAllPokemon(nextURL);
  await loadPokemon(nextData.results);
  setNextURL(nextData.next);
  setPrevURL(nextData.previous);
  setLoading(false);
 }

 const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true)
    let prevData = await getAllPokemon(prevURL);
    await loadPokemon(prevData.results);
    setNextURL(prevData.next);
    setPrevURL(prevData.previous);
    setLoading(false);
 }

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
      {/* <button onClick={handlePrevPage}>Previous</button> */}
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
      </div>
      <MyFooter />
    </>
  );
}

export default App;
