let allPokemons = [];
let visiblecount = 12;
let currentlist = [];

const typelist = {
  normal: "/kuvat/normalreal.png",
  fire: "/kuvat/fire.png",
  water: "/kuvat/water.svg",
  grass: "/kuvat/leaf.png",
  electric: "/kuvat/electric.png",
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
let selectedtypes = [];
let modal = document.getElementById("myModal");
let sortmodal = document.getElementById("sortmodal");
let SortGenerations = document.getElementById("SortGenerations");
let span = document.getElementsByClassName("close")[0];
const searchbar = document.getElementById("SearchBar");
let pokemondata = {};
