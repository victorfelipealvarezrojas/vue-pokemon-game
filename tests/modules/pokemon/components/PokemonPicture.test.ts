import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonPicture from '@pokemon/components/PokemonPicture.vue';

describe('PokemonPicture', () => {
  test('should render the hidden image when showPokemon props is false', async () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemon_id: 25,
        show_pokemon: false,
      },
    });

    const img = wrapper.find('img');
    const attribute = img.attributes();
    expect(attribute).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
      }),
    );
  });

  test('should render the pokemon image when showPokemon props is true', async () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemon_id: 25,
        show_pokemon: true,
      },
    });

    const img = wrapper.find('img');
    const attribute = img.attributes();
    expect(attribute).not.toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
      }),
    );
  });
});
