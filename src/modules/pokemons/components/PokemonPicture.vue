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

interface PokemonPictureProps {
  pokemon_id: number;
  show_pokemon?: boolean;
}

// esto es para que se pueda usar props del componente padre
const props = withDefaults(defineProps<PokemonPictureProps>(), {
  show_pokemon: false, // por defecto no se muestra la imagen, withDefaults es una función de vue que permite definir valores por defecto
});

const pokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemon_id}.svg`,
);
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
