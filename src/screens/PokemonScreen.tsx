import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParams} from '../navigator/Navigator';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const {height, width} = Dimensions.get('screen');

export const PokemonScreen = ({route, navigation}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      {/* Header Container */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* BackButton */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 5}}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        {/* Pokemon name */}
        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + '\n'}#{id}
        </Text>
        {/* Pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* Detalles y Loading */}
      <View style={styles.loadingIndicator}>
        <ActivityIndicator color={color} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.45,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: Platform.OS === 'ios' ? -20 : 0,
    opacity: 0.7,
  },
  pokemonImage: {
    width: width * 0.6,
    height: width * 0.6,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
