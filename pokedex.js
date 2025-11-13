let allPokemons = [];
let visiblecount = 12;
let currentlist = [];

const typelist = {
  normal: "/kuvat/normalreal.png",
  fire: "/kuvat/fire.png",
  water: "/kuvat/water.svg",
  grass: "/kuvat/leaf.png",
  electric: "/kuvat/electricr.png",
  ice: "/kuvat/ice.png",
  fighting: "/kuvat/fighting.png",
  poison: "/kuvat/poison.png",
  ground: "/kuvat/ground.png",
  flying: "/kuvat/flying.png",
  psychic: "/kuvat/psychic.png",
  bug: "/kuvat/bug.svg",
  rock: "/kuvat/rock.png",
  ghost: "/kuvat/ghost.png",
  dragon: "/kuvat/dragon.png",
  dark: "/kuvat/dark.png",
  steel: "/kuvat/steel.png",
  fairy: "/kuvat/fairy.png",
};

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

sortmodal.style.display = "none";

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
  const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data1 = await response1.json();
  return data1.types.map((t) => t.type.name).join(", ");
}

async function pokemongen(id) {
  const response2 = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );
  const data2 = await response2.json();
  return data2.generation.name;
}

async function renderList(list) {
  const box = document.getElementById("box");
  currentlist = list;
  box.innerHTML = "";

  for (const p of list.slice(0, visiblecount)) {
    const card = document.createElement("div");
    card.id = "card";

    const link = document.createElement("a");
    link.href = "info.html";

    const types = await pokemontype(p.id);
    const gen = await pokemongen(p.id);

    let gennumber = "?";
    if (gen && gen.startsWith("generation-")) {
      const bettergen = gen.split("-")[1];
      gennumber = generationstonumbers[bettergen] || "?";
    }

    const typeDiv = document.createElement("div");
    typeDiv.textContent = `Generation ${gennumber}`;
    typeDiv.style.display = "flex";
    typeDiv.style.gap = "5px";

    for (const t of types.split(", ")) {
      const imgType = document.createElement("img");
      imgType.src = typelist[t] || "";
      imgType.style.width = "30px";
      imgType.style.height = "30px";
      typeDiv.appendChild(imgType);
    }

    const name = document.createElement("p");
    name.textContent = `${p.name} #${p.id}`;

    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
    img.alt = p.name;
    img.id = "image";

    link.appendChild(img);
    card.appendChild(link);
    card.appendChild(name);
    card.appendChild(typeDiv);

    box.appendChild(card);
  }
}

document.getElementById("loadmore").addEventListener("click", () => {
  visiblecount += 12;
  renderList(currentlist);
});
function sortpokemons() {}

function searchPokemons(term) {
  term = term.toLowerCase();
  if (term === "") {
    renderList(allPokemons);
    return;
  }
  const filtered = allPokemons.filter(
    (p) => p.name.toLowerCase().includes(term) || p.id.toString().includes(term)
  );
  renderList(filtered);
}

document.getElementById("SearchBar").addEventListener("input", function () {
  searchPokemons(this.value);
});

info();
sortpokemons();
