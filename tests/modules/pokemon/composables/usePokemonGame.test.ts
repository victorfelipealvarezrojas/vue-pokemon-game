import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { flushPromises } from '@vue/test-utils';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import MockAdapter from 'axios-mock-adapter';
import { arrayPokemon } from '../../../configFile/setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import confetti from 'canvas-confetti';

let mockPokemonApi: MockAdapter;
const NOT_VALID_ID = 999;

beforeEach(() => {
  mockPokemonApi = new MockAdapter(pokemonApi);
  mockPokemonApi.onGet('/?limit=151').reply(200, {
    results: arrayPokemon,
  });

  vi.mock('canvas-confetti', () => ({
    default: vi.fn(),
  }));
});

afterEach(() => {
  mockPokemonApi.restore();
});

describe('UsePokemon Composable', async () => {
  test('should initialize with the correct default values', async () => {
    const [result] = withSetup(usePokemonGame);

    expect(result.gameStatus.value).toBe('playing');
    expect(result.isLoading.value).toBe(true);
    expect(result.pokemonOptions.value).toEqual([]);
    expect(result.randomPokemon.value).toBe(undefined);

    await flushPromises(); // esperar a que se resuelvan las promesas

    expect(result.isLoading.value).toBe(false);
    expect(result.pokemonOptions.value.length).toBe(4);
    expect(result.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
    expect(result.pokemonOptions.value[0]).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly handle getNextRound', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();
    result.gameStatus.value = 'won';
    expect(result.gameStatus.value).toBe('won');

    result.getNextOptions(1);
    expect(result.gameStatus.value).toBe('playing');
    expect(result.pokemonOptions.value.length).toBe(1);

    result.getNextOptions(1);
    expect(result.gameStatus.value).toBe('playing');
    expect(result.pokemonOptions.value.length).toBe(1);
  });

  test('should correctly handle a incorrect answer', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();
    const { checkAnswer, gameStatus } = result;
    checkAnswer(NOT_VALID_ID);
    expect(confetti).not.toHaveBeenCalled();
    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correctly handle a correct answer', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();
    const { checkAnswer, gameStatus, randomPokemon } = result;
    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 3000,
      spread: 150,
      origin: { y: 0.6 },
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
