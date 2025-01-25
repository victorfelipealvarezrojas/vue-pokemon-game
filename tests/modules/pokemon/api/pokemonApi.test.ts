import { pokemonApi } from '@pokemon/api/pokemonApi';
import { describe, expect, test } from 'vitest';

describe('Pokemon API', () => {
  test('should get pokemon', async () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
  });
});
