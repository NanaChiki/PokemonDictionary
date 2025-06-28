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

export const getPokemon = () => {}