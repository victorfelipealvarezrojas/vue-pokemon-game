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
    <h3>{{ randomPokemon }}</h3>
    <PokemonPicture
      :pokemon_id="randomPokemon.id"
      :show_pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, randomPokemon, gameStatus } = usePokemonGame();
</script>
