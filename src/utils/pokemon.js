// Get all pokemon data 
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // Fetch(): Fetch data from the url
    // .then(): After the fetch is complete, parse the data as JSON
    // .then(data => resolve(data)): then receive the data and resolve the promise
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data));
  });
}

// Get detailed data of each pokemon
export const getPokemon = (url) => {
  // The promise object returns an array of pokemon data
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log("Detailed data : ", data);
        resolve(data)
      });
  });
};