import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

const TOTAL_ROUNDS = 3;
const ROWS = 4;
const COLS = 4;
const TOTAL_CELLS = ROWS * COLS;

const generateRandomSet = () => {
  const allNumbers = Array.from({ length: 30 }, (_, i) => i + 1);
  const shuffled = allNumbers.sort(() => 0.5 - Math.random());
  const randomCount = Math.floor(Math.random() * 7) + 10; // 10 to 16 numbers
  return shuffled.slice(0, randomCount);
};

const GameScreen = ({ navigation }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [numberSets, setNumberSets] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Animation values for all 16 cells
  const fadeAnim = useRef(
    Array(TOTAL_CELLS)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const sets = Array.from({ length: TOTAL_ROUNDS }, generateRandomSet);
    setNumberSets(sets);
  }, []);

  useEffect(() => {
    if (numberSets.length === 0) return;

    // Reset animation
    fadeAnim.forEach((anim) => anim.setValue(0));
    setAnimationCompleted(false);

    // Animate only existing numbers, sequentially
    const currentSet = numberSets[currentRound];
    const count = Math.min(currentSet.length, TOTAL_CELLS);

    const animations = [];
    for (let i = 0; i < count; i++) {
      animations.push(
        Animated.timing(fadeAnim[i], {
          toValue: 1,
          duration: 400,
          delay: i * 150,
          useNativeDriver: true,
        })
      );
    }

    Animated.stagger(150, animations).start(() => {
      setTimeout(() => setAnimationCompleted(true), 1000);
    });
  }, [currentRound, numberSets]);

  const handleAnswer = (isPresent) => {
    const updatedResponses = [...userResponses, isPresent];

    if (currentRound + 1 === TOTAL_ROUNDS) {
      const guessedNumber = calculateResult(numberSets, updatedResponses);
      navigation.navigate('Result', { guessedNumber });
    } else {
      setCurrentRound((prev) => prev + 1);
      setAnimationCompleted(false);
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

  const currentSet = numberSets[currentRound];

  // Fill up to 16 cells, extra cells are empty
  const numbersToShow = [...currentSet];
  while (numbersToShow.length < TOTAL_CELLS) {
    numbersToShow.push(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round {currentRound + 1}</Text>
      <Text style={styles.question}>Is your number in this list?</Text>

      <View style={styles.gridContainer}>
        {Array(ROWS)
          .fill(0)
          .map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array(COLS)
                .fill(0)
                .map((_, colIndex) => {
                  const index = rowIndex * COLS + colIndex;
                  const number = numbersToShow[index];
                  const opacity = fadeAnim[index];

                  return (
                    <Animated.View
                      key={colIndex}
                      style={[
                        styles.numberBox,
                        {
                          opacity: number === null ? 0 : opacity,
                          transform: [{ scale: opacity }],
                        },
                      ]}
                    >
                      <Text style={styles.number}>{number !== null ? number : ''}</Text>
                    </Animated.View>
                  );
                })}
            </View>
          ))}
      </View>

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
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  question: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
  },
  gridContainer: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  numberBox: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ccc',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
});

export default GameScreen;
