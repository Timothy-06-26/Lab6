const form = document.getElementById("search-form");
const input = document.getElementById("pokemon-input");
const message = document.getElementById("message");
const result = document.getElementById("result");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = input.value.trim().toLowerCase();
    message.textContent = "Loading...";
    result.hidden = true;

    try {
        //Live Data from API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error("Pokemon not found.");
        const pokemon = await response.json();


        //JSON data and page update
        document.getElementById("pokemon-name").textContent = pokemon.name;
        const picture = document.getElementById("pokemon-image");
        picture.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
        picture.alt = pokemon.name;
        document.getElementById("pokemon-type").textContent = pokemon.types.map(item => item.type.name).join(", ");
        document.getElementById("pokemon-height").textContent = (pokemon.height / 10) + " m";
        document.getElementById("pokemon-weight").textContent = (pokemon.weight / 10) + " kg";

    } catch (error){
        message.textContent = error.message;
    }
    

    
});