import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManageProfile from './ManageProfile';
import Profile from './Profile';
import ReviewHistory from './ReviewHistory';
import SavedDestination from './SavedDestination';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ManageProfile" component={ManageProfile} />
        <Stack.Screen name="ReviewHistory" component={ReviewHistory} />
        <Stack.Screen name="SavedDestination" component={SavedDestination} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
