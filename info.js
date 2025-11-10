// Hae URL-parametri 'id', joka kertoo mikä Pokémon valittiin
// Esim. jos käyttäjä klikkasi Bulbasauria, URL on info.html?id=1
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Funktio, joka hakee Pokémonin tiedot PokeAPI:sta
async function loadPokemon() {
  try {
    // Haetaan JSON-data API:sta käyttäen id:tä
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    // Haetaan container-elementti, johon tiedot rendataan
    const container = document.getElementById("pokemon-info");

    // Haetaan front ja back spritet (kuvat)
    const frontSprite = data.sprites.front_default;
    const backSprite = data.sprites.back_default;

    // Haetaan Pokémonin tyypit listaksi
    const types = data.types.map((t) => t.type.name);

    // Rendataan tiedot HTML:ksi containeriin
    container.innerHTML = `
      <h2 class="pokemon-name">${data.name.toUpperCase()}</h2>
      <div class="sprites">
        <!-- Front sprite aina -->
        <img src="${frontSprite}" alt="${data.name} front" class="sprite">
        <!-- Back sprite vain jos saatavilla -->
        ${
          backSprite
            ? `<img src="${backSprite}" alt="${data.name} back" class="sprite">`
            : ""
        }
      </div>
      <div class="details">
        <p><b>Height:</b> ${data.height}</p>
        <p><b>Weight:</b> ${data.weight}</p>
        <p><b>Types:</b> ${types.join(", ")}</p>
      </div>
    `;
  } catch (err) {
    // Virheen käsittely, jos API haku ei wörki
    container.innerHTML = "Pokémonia ei löytynyt 😢";
    console.error("Virhe haettaessa Pokémonia:", err);
  }
}

loadPokemon();
