import { describe, expect, test, vi, type Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

describe('PokemonGmae', () => {
  test('should initialize with default values', async () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: true,
      randomPokemon: undefined,
      gameStatus: GameStatus.Playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextOptions: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Espere porfavor');
  });
});
