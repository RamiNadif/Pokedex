let selectedtypes = [];
let modal = document.getElementById("myModal");
let sortmodal = document.getElementById("sortmodal");
let SortGenerations = document.getElementById("SortGenerations");
let span = document.getElementsByClassName("close")[0];
const searchbar = document.getElementById("SearchBar");
let pokemondata = {};
sortmodal.style.display = "none";

SortGenerations.style.display = "none";
document.getElementById("sort").addEventListener("click", function () {
  this.innerHTML =
    this.innerHTML === "Show advanced search"
      ? "Hide advanced search"
      : "Show advanced search";

  sortmodal.style.display =
    sortmodal.style.display === "none" ? "block" : "none";
  SortGenerations.style.display =
    SortGenerations.style.display === "none" ? "block" : "none";
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

  box.innerHTML = "";
  currentlist = list;
  for (const p of list.slice(0, visiblecount)) {
    const card = document.createElement("div");
    card.id = "card";

    const types = await pokemontype(p.id);
    const gen = await pokemongen(p.id);

    let gennumber = "";
    const bettergen = gen.split("-")[1];
    gennumber = generationstonumbers[bettergen];

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

    card.addEventListener("click", async function () {
      try {
        const response = await fetch(
          // Hakee Pokémonin perustiedot painot jne pokeapin /pokemon/{id} endpointista
          `https://pokeapi.co/api/v2/pokemon/${p.id}/`
        );
        const data = await response.json(); // await odottaa että api vastaa, sen jälkeen jatkaa

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${p.id}/`
        );
        const speciesData = await speciesResponse.json(); // hakee lajin tiedot kuten sukupolven ja pienen kuvaus tekstin /pokemon-species/{id} endpointista

        const detailsDiv = document.getElementById("pokemonDetails");
        detailsDiv.innerHTML = ""; // ennen kun valitaan uusi pokemon, se tyhjentää vanhan tiedon.
        // estää myös vanhojen tietojen jäämisen näkyviin kun uudesta pokemonista painetaan

        const nameEl = document.createElement("h2");
        nameEl.textContent = `${data.name} #${data.id}`; // tehään uus <h2> ja asetetaan siihen pokemonin nimi ja numero

        const imgEl = document.createElement("img");
        imgEl.src = data.sprites.front_default; // // näytetään kuva modalissa
        imgEl.alt = data.name; // alt on siksi että jos sivu ei lataudu, niin hän saa silti tiedon mikä pokemon on

        // näyttää pokemonin tyypit (esim fire, water, poison, rock tai vaikka flying)
        const typesEl = document.createElement("p");
        typesEl.textContent =
          "Type: " + data.types.map((t) => t.type.name).join(", ");

        // kertoo mistä generaatiosta pokemon on
        const genEl = document.createElement("p");
        const genNumber =
          generationstonumbers[speciesData.generation.name.split("-")[1]];
        genEl.textContent = `Generation: ${genNumber}`;

        // Näyttää pokemonin painon kiloina ja pituuden metreinä
        const weightEl = document.createElement("p");
        weightEl.textContent = `Weight: ${data.weight / 10} kg`;
        const heightEl = document.createElement("p");
        heightEl.textContent = `Height: ${data.height / 10} m`;

        // listaa pokemonin kyvyt/ominaisuudet
        const abilitiesEl = document.createElement("p");
        abilitiesEl.textContent =
          "Abilities: " + data.abilities.map((a) => a.ability.name).join(", ");

        // Kertoo minkä tyypin liikkeet/hyökkäykset ns tupla damagee (heikkoudet)
        const weaknessPromises = data.types.map(async (t) => {
          const typeResp = await fetch(t.type.url);
          const typeData = await typeResp.json();
          return typeData.damage_relations.double_damage_from.map(
            (d) => d.name
          );
        });
        const weaknessesArr = await Promise.all(weaknessPromises);
        const weaknesses = [...new Set(weaknessesArr.flat())];
        const weaknessesEl = document.createElement("p");
        weaknessesEl.textContent = "Weaknesses: " + weaknesses.join(", ");

        const flavorEl = document.createElement("p");
        const flavorText = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        ).flavor_text; // valitaan englannin kieli tekstiin ja siksi englanti koska sitä on muuallakin
        flavorEl.textContent = flavorText.replace(/\n|\f/g, " "); // korvaa rivinvaihdot jotta teksti on paljon cleanimpi

        // jokane luotu elementti liitetään modaliin (pokemondetails diviin)
        // niin modalissa näkyy kaikki data näkyy yhellä kertaa samaa aikaa
        detailsDiv.appendChild(nameEl);
        detailsDiv.appendChild(imgEl);
        detailsDiv.appendChild(typesEl);
        detailsDiv.appendChild(genEl);
        detailsDiv.appendChild(weightEl);
        detailsDiv.appendChild(heightEl);
        detailsDiv.appendChild(abilitiesEl);
        detailsDiv.appendChild(weaknessesEl);
        detailsDiv.appendChild(flavorEl);

        modal.style.display = "block"; //Modal tulee ikkunaksi sivun päälle ruudun keskelle
      } catch (err) {
        console.error("Modalin dataa ei voitu hakea:", err);
      }
    });

    span.addEventListener("click", function () {
      //klikkaamalla sulkemis nappia Modal sulkeutuu
      modal.style.display = "none";
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(typeDiv);

    box.appendChild(card);
  }
}

document.getElementById("loadmore").addEventListener("click", () => {
  visiblecount += 12;
  renderList(currentlist);
});

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
const typesort = document.querySelectorAll(".type-checkbox");
typesort.forEach((sort) => {
  sort.addEventListener("change", sortchange);
});
function applysort() {
  if (selectedtypes.length === 0) {
    renderList(allPokemons);
    return;
  }
  const filtered = allPokemons.filter((p) => {
    const types = pokemondata[p.id].types;

    return selectedtypes.every((t) => types.includes(t));
  });

  renderList(filtered);
}

function sortchange(e) {
  const ischecked = e.target.checked;

  const value = e.target.value;
  if (ischecked) {
    selectedtypes.push(value);
    console.log(selectedtypes);
  } else {
    selectedtypes = selectedtypes.filter((t) => t !== value);
    console.log(selectedtypes);
  }
  applysort();
}
searchbar.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchPokemons(searchbar.value);
  }
});
document.getElementById("searchbtn").addEventListener("click", function () {
  searchPokemons(searchbar.value);
});

info();
