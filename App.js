import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import HomeScreen from './Home';
import Simulate from './Simulate';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Setup parameters' }}
        />
        <Stack.Screen 
          name="Simulate"
          component={Simulate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
