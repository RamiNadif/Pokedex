async function info() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
    );

    const data = await response.json();
    const pokemons = data.results.slice(0, 1328);
    const pokemoninfo = document.getElementById("box");
    pokemoninfo.innerHTML = "";

    pokemons.forEach((pokemon) => {
      const item1 = document.createElement("div");
      const item2 = document.createElement("p");
      const name = pokemon.name;
      const url = pokemon.url;
      item1.textContent = name;
      item2.textContent = url;
      item1.appendChild(item2);
      pokemoninfo.appendChild(item1);
    });
  } catch (error) {
    console.error("Virhe");
  }
}
info();
