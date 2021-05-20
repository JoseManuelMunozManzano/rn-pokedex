import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {
  AndroidImageColors,
  IOSImageColors,
} from 'react-native-image-colors/lib/typescript/types';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  // Para evitar error cuando hay cambio de estado en un compomente desmontado
  // Cuando el componente fue desmontado no se va a llamar a getColors
  const isMounted = useRef(true);

  const getColor = useCallback(async () => {
    const colors: AndroidImageColors | IOSImageColors =
      await ImageColors.getColors(pokemon.picture, {fallback: 'grey'});

    if (!isMounted.current) {
      return;
    }

    colors.platform === 'android'
      ? setBgColor(colors.dominant || 'grey')
      : setBgColor(colors.background || 'grey');
  }, []);

  useEffect(() => {
    getColor();

    return () => {
      isMounted.current = false;
    };
  }, [getColor]);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        {/* Nombre del pokemon y ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  // Truco para que la pokebola no se salga del View
  // El truco comprende pokebolaContainer y pokebola
  pokebolaContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
