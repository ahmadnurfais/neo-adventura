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

    if (!isInitialCheckComplete) {
        // Return a loading indicator instead of null
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', color: '#0400f4' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={userID === null ? 'Welcome' : 'HomeScreen'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomePage} />
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
