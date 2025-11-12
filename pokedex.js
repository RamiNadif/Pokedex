let allPokemons = [];
let visiblecount = 12;
let currentlist = [];
const typelist = {};

sortmodal.style.display = "none";
const generationstonumbers = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
};
document.getElementById("sort").addEventListener("click", function () {
  sortmodal.style.display =
    sortmodal.style.display === "none" ? "block" : "none";
});
async function info() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
    );
    const data = await response.json();

    allPokemons = data.results.slice(0, 1328).map((p) => ({
      name: p.name,
      id: p.url.split("/")[6],
    }));

    renderList(allPokemons);
  } catch (error) {
    console.error("Virhe", error);
  }
}

async function pokemontype(id) {
  try {
    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data1 = await response1.json();
    const types = data1.types.map((t) => t.type.name);
    return types.join(", ");
  } catch (error) {
    console.log("virhe", error);
  }
}
async function pokemongen(gen) {
  try {
    const response2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${gen}/`
    );
    const data2 = await response2.json();
    const generations = data2.generation.name;
    return generations;
  } catch (error) {
    console.log("virhe", error);
  }
}
async function renderList(list) {
  const box = document.getElementById("box");
  currentlist = list;
  box.innerHTML = "";

  for (const p of list.slice(0, visiblecount)) {
    const card = document.createElement("div");
    card.id = "card";
    const modal = document.createElement("div");
    modal.id = `modal-${p.id}`;
    const link = document.createElement("a");
    link.href = "info.html";
    const types = await pokemontype(p.id);
    const gen = await pokemongen(p.id);
    const bettergen = gen.split("-")[1];
    const gennumber = generationstonumbers[bettergen];
    modal.textContent = `Type: ${types} \n Generation: ${gennumber}`;
    modal.style.whiteSpace = "pre-line";
    modal.style.display = "none";
    card.addEventListener("click", function () {
      modal.style.display = modal.style.display === "none" ? "block" : "none";
    });

    const name = document.createElement("p");
    const number = p.id;
    name.textContent = p.name + " #" + number;

    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    img.alt = p.name;
    img.id = "image";
    link.appendChild(img);
    card.appendChild(link);
    card.appendChild(name);

    card.appendChild(modal);
    box.appendChild(card);
  }
}
document.getElementById("loadmore").addEventListener("click", function () {
  visiblecount += 12;
  renderList(currentlist);
});

function searchPokemons(term) {
  term = term.toLowerCase();
  if (term === "") {
    return allPokemons, renderList(currentlist);
  } else {
    return allPokemons.filter(
      (p) =>
        p.name.toLowerCase().includes(term) || p.id.toString().includes(term)
    );
  }
}

document.getElementById("SearchBar").addEventListener("input", function () {
  const term = this.value;
  const filtered = searchPokemons(term);
  renderList(filtered);
});

info();
