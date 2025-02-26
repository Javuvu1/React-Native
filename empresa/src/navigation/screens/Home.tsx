import React from 'react';
import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, Image } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la gestión de empleados de Software Tremendo Inc</Text>
      <Image
        source={{ uri: 'https://sbainformatica.com/wp-content/uploads/2023/12/12-845x321.jpg' }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 600,
    height: 300,
    resizeMode: 'cover',
  },
});
