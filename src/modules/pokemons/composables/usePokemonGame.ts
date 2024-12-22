import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]); // esta es un propidad de tipo ref que almacena un array de pokemons
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
    pokemons.value = pokemons.value.slice(howmany); // pokemons que quedan
  };

  onMounted(async () => {
    pokemons.value = await getPokemon();
    getNextOptions();
  });

  return {
    gameStatus,
    getNextOptions,
    isLoading,
    randomPokemon,
  };
};
