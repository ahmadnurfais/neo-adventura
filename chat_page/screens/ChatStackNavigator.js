import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Conversations from './Conversations';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

const ChatStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Conversations">
        <Stack.Screen name="Conversations" component={Conversations} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChatStackNavigator;
