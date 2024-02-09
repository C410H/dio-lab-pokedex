const idList = document.getElementById("listPokemon");
const loadMoreButton = document.getElementById("loadMoreButton");
const detailPokemon = document.getElementById("detailPokemon");
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemonList = []) => {
      const newHTML = pokemonList
        .map(
          (pokemon) =>
            ` <li class="pokemon ${pokemon.type}" onclick="ModelDetail()">
                    <span class="number">${pokemon.number}</span>
                    <samp class="name">${pokemon.name}</samp>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>    
                </li>`
        )
        .join("");

      const modalHTML = pokemonList
        .map(
          (pokemon) =>
            `<div class="pokemonDetail ${pokemon.type}" id="${
              pokemon.name
            }" style="display=none">

                    <div class="modal-content">
                        
                        <h2>${pokemon.name}</h2>

                        <div class="modal-img">

                            <img src="${pokemon.photo}" alt="${pokemon.name}">

                        </div>

                        <hr>

                        <div class="modal-detail">
                            <h3>Types</h3>
                            <ol class="modal-types">
                                ${pokemon.types
                                  .map(
                                    (type) =>
                                      `<li class="type ${type}">${type}</li>`
                                  )
                                  .join("")}
                            </ol>
                        </div>

                        <div class="modal-status">
                            <h3>Base Status</h3>
                            <ol class="status">
                                <li class="">HP: ${pokemon.stats[0]}</li>
                                <li class="">Attack: ${pokemon.stats[1]}</li>

                                <li class="">Defense: ${pokemon.stats[2]}</li>
                                <li class="">Special-attack: ${
                                  pokemon.stats[3]
                                }</li>

                                <li class="">Special-defense: ${
                                  pokemon.stats[4]
                                }</li>
                                <li class="">Speed: ${pokemon.stats[5]}</li>
                            </ol>
                        </div>

                    </div>

                </div>`
        )
        .join("");
      idList.innerHTML += newHTML;
      detailPokemon.innerHTML += modalHTML;
    })
    .catch((error) => console.log(error));
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  debugger;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function ModelDetail() {
  detailPokemon.style.display = "block";

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    detailPokemon.style.display = "none";
    modal.style.display = "none";
  };
}
