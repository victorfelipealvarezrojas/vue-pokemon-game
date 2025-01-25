<template>
  <section>
    <img
      v-if="!show_pokemon"
      :src="pokemonImage"
      class="brightness-0 h-[200px]"
      alt="pokemon image"
    />
    <img v-else :src="pokemonImage" class="fade-in h-[200px]" alt="pokemon image" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PokemonPictureProps } from '../interfaces';
import { URL_IMAGE } from '../api/utlis';

const props = withDefaults(defineProps<PokemonPictureProps>(), {
  show_pokemon: false,
});

const pokemonImage = computed(() => `${URL_IMAGE}${props.pokemon_id}.svg`);
</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
}
</style>
