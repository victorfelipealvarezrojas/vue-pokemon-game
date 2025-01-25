<template>
  <section
    v-if="isLoading || randomPokemon.id == null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere porfavor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este pokémon?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextOptions()"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        ¿nuevo juego?
      </button>
    </div>
    <PokemonPicture
      :pokemon_id="randomPokemon.id"
      :show_pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-pokemon-id="randomPokemon.id"
      @selectPokemonOptions="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  isLoading,
  randomPokemon,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  getNextOptions,
} = usePokemonGame();

defineEmits<{ newGame: [] }>();
</script>
