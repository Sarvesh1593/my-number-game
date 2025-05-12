import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const TOTAL_ROUNDS = 3;

const generateRandomSet = () => {
  const allNumbers = Array.from({ length: 30 }, (_, i) => i + 1);
  const shuffled = allNumbers.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 9);
};

const GameScreen = ({ navigation }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [numberSets, setNumberSets] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Animation values for each number
  const fadeAnim = useRef(numberSets.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const sets = Array.from({ length: TOTAL_ROUNDS }, generateRandomSet);
    setNumberSets(sets);
  }, []);

  useEffect(() => {
    if (numberSets.length > 0) {
      // Staggered animation for each number
      const animations = fadeAnim.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1, // Fade to full opacity
          duration: 500, // Duration of the fade-in
          delay: index * 300,  // Staggered delay based on index
          useNativeDriver: true,
        })
      );

      // Start all animations with stagger effect
      Animated.stagger(300, animations).start(() => {
        setAnimationCompleted(true); // Mark animation as complete
      });
    }
  }, [numberSets]);

  const handleAnswer = (isPresent) => {
    const updatedResponses = [...userResponses, isPresent];

    if (currentRound + 1 === TOTAL_ROUNDS) {
      const guessedNumber = calculateResult(numberSets, updatedResponses);
      navigation.navigate('Result', { guessedNumber });
    } else {
      setCurrentRound(currentRound + 1);
    }

    setUserResponses(updatedResponses);
  };

  const calculateResult = (sets, responses) => {
    const possibleNumbers = {};
    sets.forEach((set, index) => {
      if (responses[index]) {
        set.forEach((num) => {
          possibleNumbers[num] = (possibleNumbers[num] || 0) + 1;
        });
      }
    });
    const sorted = Object.entries(possibleNumbers).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : 'Not sure!';
  };

  if (numberSets.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round {currentRound + 1}</Text>
      <Text style={styles.question}>Is your number in this list?</Text>

      {/* Display Grid of Numbers */}
      <View style={styles.gridContainer}>
        {numberSets[currentRound].map((number, index) => (
          <Animated.View
            key={number}
            style={[
              styles.numberBox,
              { opacity: fadeAnim[index], transform: [{ scale: fadeAnim[index] }] },
            ]}
          >
            <TouchableOpacity
              style={styles.numberBoxContent}
              onPress={() => {
                if (animationCompleted) {
                  // Handle the logic for user selecting a number
                  handleAnswer(true); // Or false based on user input
                }
              }}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Disable the buttons until animation is complete */}
      {animationCompleted && (
        <View style={styles.buttonRow}>
          <Button title="Yes" onPress={() => handleAnswer(true)} />
          <Button title="No" onPress={() => handleAnswer(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  question: {
    fontSize: 22,
    marginBottom: 30,
    color: '#222',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numberBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  numberBoxContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default GameScreen;
