import {useEffect} from 'react';

import {pokemonApi} from '../api/pokemonAPI';

export const usePokemonPaginated = () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=40';

  const loadPokemons = async () => {
    const resp = await pokemonApi.get(url);
    console.log(resp.data);
  };

  useEffect(() => {
    loadPokemons();
  }, []);
};
