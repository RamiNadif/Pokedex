let allPokemons = [];
let visiblecount = 12;
async function info() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
    );
    const data = await response.json();

    // Muodostetaan lista, jossa on nimi + id
    allPokemons = data.results.slice(0, 1328).map((p) => ({
      name: p.name,
      id: p.url.split("/")[6],
    }));

    renderList(allPokemons);
  } catch (error) {
    console.error("Virhe", error);
  }
}

// Piirtää annetun listan ruudulle
function renderList(list) {
  const box = document.getElementById("box");
  box.innerHTML = "";

  list.slice(0, visiblecount).forEach((p) => {
    const card = document.createElement("div");

    const name = document.createElement("p");
    const number = p.id;
    name.textContent = p.name + " #" + number;

    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    img.alt = p.name;

    card.appendChild(img);
    card.appendChild(name);
    box.appendChild(card);
  });
  renderList(allPokemons);
}
document.getElementById("loadmore").addEventListener("click", function () {
  visiblecount += 12;
  renderList(allPokemons);
});
// Suodattaa Pokémonit nimen perusteella
function searchPokemons(term) {
  term = term.toLowerCase();
  return allPokemons.filter(
    (p) => p.name.toLowerCase().includes(term) || p.id.toString().includes(term)
  );
}

// "Live search" (haku kirjoittaessa)
document.getElementById("SearchBar").addEventListener("input", function () {
  const term = this.value;
  const filtered = searchPokemons(term);
  renderList(filtered);
});

info();
