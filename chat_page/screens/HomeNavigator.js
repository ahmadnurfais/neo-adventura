import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../components/theme';
import ConversationScreen from './ConversationScreen';
import CallScreen from './CustomerService';
import StoriesScreen from './FriendsScreen';
import ChatScreen from './ChatScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator initialRouteName="ConversationsStack">
    <Stack.Screen
      name="ConversationsStack"
      component={ConversationScreen}
      options={({ navigation }) => ({
        title: 'Chats',
        headerRight: () => (
          <Icon
            name="search"
            size={24}
            color={theme.colors.white}
            style={{ marginRight: 15 }}
            // Implement your search logic here
            onPress={() => navigation.navigate('SearchScreen')} // Navigate to search screen
          />
        ),
      })}
    />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

const HomeNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Conversations"
        tabBarOptions={{
          activeTintColor: theme.colors.primary, // Custom color for active tab
          inactiveTintColor: theme.colors.gray, // Custom color for inactive tab
          style: {
            backgroundColor: theme.colors.primary, // Use theme color for bottom navigation bar
          },
          labelStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Conversations"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="chatbox-ellipses" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={StoriesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Customer Services"
          component={CallScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="call" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;