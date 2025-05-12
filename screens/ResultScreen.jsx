import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { guessedNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I guess your number is:</Text>
      <Text style={styles.number}>{guessedNumber}</Text>
      <Button title="Play Again" onPress={() => navigation.navigate('WelcomeScreen')} />
    </View>
  );
};

export default ResultScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007aff',
    marginBottom: 30,
  },
});
