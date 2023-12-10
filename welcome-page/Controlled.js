/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Login';
import Register from './Register';
import Verification from './Verification';
import WelcomePage from './WelcomePage';
import WelcomeSwiper from './WelcomeSwiper';

import DestinationDetailPage from '../page/destination/Detail';
import CommentPage from '../page/comment/CommentPage';
import Chat from '../page/chat/Chat';

import BottomNav from '../page/BottomNav';

const Stack = createStackNavigator();

function App() {
    const [userID, setUserID] = useState(null);
    const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('user_id').then((value) => {
            setUserID(value); // It's okay to set it to null if the value doesn't exist
            setIsInitialCheckComplete(true); // Mark the check as complete
        });
    }, []);

    const WelcomeStack = createStackNavigator();
    const WelcomeStackScreen = () => (
        <WelcomeStack.Navigator
            initialRouteName="WelcomeSwiper"
            screenOptions={{ headerShown: false }}
        >
            <WelcomeStack.Screen
                name="WelcomePage"
                component={WelcomePage}
            />
            <WelcomeStack.Screen
                name="WelcomeSwiper"
                component={WelcomeSwiper}
            />
        </WelcomeStack.Navigator>
    );

    if (!isInitialCheckComplete) {
        // Return a loading indicator instead of null
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#1e32c3a" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={userID === null ? 'Welcome' : 'HomeScreen'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeStackScreen} />
                <Stack.Screen name="HomeScreen" component={BottomNav} options={{ title: 'App' }} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Verification" component={Verification} />
                {/* Additional Stack */}
                <Stack.Screen name="Detail" component={DestinationDetailPage} />
                <Stack.Screen name="CommentPage" component={CommentPage} />
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
