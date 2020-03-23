var teste = () => {
    fetch("https://swapi.co/api/films/")
      .then(response => response.json())
      .then(films => console.log(films.results))
}


teste()