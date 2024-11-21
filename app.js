const searchButton = document.getElementById("searchButton");
const pokemonInput = document.getElementById("pokemonInput");
const resultDiv = document.getElementById("result");
const warningDiv = document.getElementById("warning");

searchPokemon.addEventListener("click", () => {
  const pokemonName = pokemonInput.value.trim();
  warningDiv.textContent = "";
  resultDiv.innerHTML = "";

  if (!pokemonName) {
    warningDiv.textContent = "Please enter a Pokémon name";
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      displayPokemon(data);
    })
    .catch((error) => {
      warningDiv.textContent = error.message;
    });
});

function displayPokemon(data) {
  const card = document.createElement("div");
  card.className = "card";

  const name = document.createElement("h2");
  name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  card.appendChild(name);

  const img = document.createElement("img");
  img.src = data.sprites.front_default;
  card.appendChild(img);

  const stats = document.createElement("p");
  stats.textContent = "Stats:";
  card.appendChild(stats);
  data.stats.forEach((stat) => {
    const statItem = document.createElement("p");
    statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    card.appendChild(statItem);
  });

  const abilities = document.createElement("p");
  abilities.textContent = "Abilities:";
  card.appendChild(abilities);
  data.abilities.forEach((ability) => {
    const abilityItem = document.createElement("p");
    abilityItem.textContent = ability.ability.name;
    card.appendChild(abilityItem);
  });

  resultDiv.appendChild(card);
}
