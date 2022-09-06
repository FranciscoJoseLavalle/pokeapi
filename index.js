// VARIABLES
const pokeContainer = document.querySelector('.pokeContainer');
const search = document.querySelector('.search');

// EVENTOS
search.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase();
    userAction(value);
});

// FUNCIONES
const userAction = async (pokemon) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    fetch(URL)
        .then(res => {
            if (res.status == 404) {
                return "error"
            } else {
                return res.json()
            }
        })
        .then(res => {
            if (res == "error") {
                createCard(res);
            } else {
                console.log(res)
                createCard(res)
            }
        })
}

function createCard(pokemon) {
    pokeContainer.textContent = '';
    if (pokemon != "error") {
        const div = document.createElement('div');

        const info = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('h2');
        const id = document.createElement('p');

        const stats = document.createElement('div');
        const hp = document.createElement('p');
        const attack = document.createElement('p');
        const defense = document.createElement('p');

        info.classList.add('info');
        stats.classList.add('stats');

        img.src = pokemon.sprites.other.home.front_default;
        name.textContent = pokemon.name;
        id.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
        hp.textContent = `HP: ${pokemon.stats[0].base_stat}`;
        attack.textContent = `ATTACK: ${pokemon.stats[1].base_stat}`;
        defense.textContent = `DEFENSE: ${pokemon.stats[2].base_stat}`;

        stats.append(hp);
        stats.append(attack);
        stats.append(defense);

        info.append(img);
        info.append(name);
        info.append(id);

        div.append(info);
        div.append(stats);

        pokeContainer.append(div);
    } else {
        const div = document.createElement('div');
        const error = document.createElement('h2');
        const text = document.createElement('p');

        div.classList.add('info');
        error.textContent = "Error..."
        text.textContent = "Pokémon no encontrado."

        div.append(error);
        div.append(text);

        pokeContainer.append(div);
    }
}
