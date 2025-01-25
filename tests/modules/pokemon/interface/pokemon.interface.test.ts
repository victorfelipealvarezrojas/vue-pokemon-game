import type { Pokemon } from '@/modules/pokemon/interfaces';
import { test, expect, describe } from 'vitest';

describe('Pokemon Interface', () => {
  test('should have and id property of type number', () => {
    const pokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
    };
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  test('should have a name property of type string', () => {
    const pokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
    };
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
