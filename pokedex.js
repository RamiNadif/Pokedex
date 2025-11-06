async function info() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")

        const data = await response.json()
        const pokemons = data.slice(0,1000)
        const pokemoninfo = document.querySelector(".main")
        pokemoninfo.innerHTML =""

        pokemons.foreach((pokemon)) => {
            const item1 = document.createElement("div")
            const item2 = document.createElement("p")
            const name = pokemon.name
            const url = pokemon.url
        }

    }   
}
