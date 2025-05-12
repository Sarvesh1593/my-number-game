import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen'
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen'

const Stack = createNativeStackNavigator ();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen'>

        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>
        <Stack.Screen name='Game' component={GameScreen}/>
        <Stack.Screen name='Result' component={ResultScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}