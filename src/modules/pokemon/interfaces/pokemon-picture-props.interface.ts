import type { Pokemon } from './pokemon.interface';

export interface PokemonPictureProps {
  pokemon_id: number;
  show_pokemon?: boolean;
}

export interface pokemonOptions {
  options: Pokemon[];
  blockSelection: boolean;
}
