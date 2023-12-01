// Navigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import ManageProfile from './ManageProfile';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Profile' component={App} />
        <Stack.Screen name='ManageProfile' component={ManageProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
