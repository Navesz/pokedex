const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(300).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types}) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)

  
  accumulator += `
    <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
      <div class="card-text">
        <h2 class="card-title">${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </div>
    </li>
  `
  return accumulator
}, '')


const insertPokemonIntoPage = pokemon => {
  const ul = document.querySelector('.pokedex')
  ul.innerHTML = pokemon
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonIntoPage)
