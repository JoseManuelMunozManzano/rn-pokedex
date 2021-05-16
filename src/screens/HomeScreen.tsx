import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{marginTop: 50}}>
      <Text>Home Screen</Text>
      <Button
        title="Pokemon Screen"
        onPress={() => navigation.navigate('PokemonScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
