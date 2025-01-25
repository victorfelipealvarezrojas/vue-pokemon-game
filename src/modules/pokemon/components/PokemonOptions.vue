<template>
  <section class="mt-5 flex flex-col">
    <button
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id === correctPokemonId && blockSelection,
          incorrect: id !== correctPokemonId && blockSelection,
        },
      ]"
      v-for="{ name, id } in options"
      :key="id"
      @click="$emit('selectPokemonOptions', id)"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  blockSelection?: boolean;
  correctPokemonId: number;
}

defineProps<Props>();
defineEmits<{ selectPokemonOptions: [id: number] }>();
</script>

<style scoped>
button {
  @apply bg-white
          shadow-md
          rounded-lg
          p-3
          m-2
          cursor-pointer
          w-40
          text-center
          transition-all
          hover:bg-gray-100;
}

.correct {
  @apply bg-green-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}
</style>
