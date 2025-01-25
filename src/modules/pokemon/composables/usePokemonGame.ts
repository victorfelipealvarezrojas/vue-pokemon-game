import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]); //pokemones en pantalla

  const randomPokemon = computed(
    () => pokemonOptions.value[Math.floor(Math.floor(Math.random() * pokemonOptions.value.length))],
  );
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemon = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemons = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');

      return {
        id: urlParts ? parseInt(urlParts[urlParts.length - 2]) : 0,
        name: pokemon.name,
      };
    });

    return pokemons.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howmany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howmany); // pokemons que se van a mostrar
    pokemons.value = pokemons.value.slice(howmany); // pokemons que faltan, se van a mostrar en la siguiente ronda
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 3000,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }

    gameStatus.value = GameStatus.Lost;

    //getNextOptions();
  };

  // esto se llama cuando se carga el componente o se reinicia el juego (destroy)
  // se obtienen los pokemones y se llama a getNextOptions para mostrar los primeros 4
  // pokemones en pantalla y los demas se guardan en pokemons.value para mostrarlos en la siguiente ronda
  onMounted(async () => {
    pokemons.value = await getPokemon();
    getNextOptions();
    console.log('pokemons', pokemonOptions.value);
  });

  return {
    gameStatus,
    getNextOptions,
    isLoading,
    randomPokemon,
    pokemonOptions,
    checkAnswer,
  };
};
