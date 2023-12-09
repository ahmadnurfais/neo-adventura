/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { View, TouchableOpacity, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';

import GetHeaderTitle from '../functions/GetHeaderTitle';

import DestinationPlaces from './HomePage';
import Bookmarks from './bookmarks/Bookmarks';
import Profile from '../profile-page/Profile';
import ChangeProfilePicture from '../profile-page/ChangeProfilePicture';
import ManageProfile from '../profile-page/ManageProfile';
import ChatScreen from './chat/ChatScreen';
import Users from './users/Users';
import UserDetail from './users/UserDetail';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

const ProfileScreen = () => (
    <ProfileStack.Navigator
        screenOptions={{ headerShown: false }}
    >
        <ProfileStack.Screen
            name="ProfileDefault"
            component={Profile}
        />
        <ProfileStack.Screen
            name="ChangeProfilePicture"
            component={ChangeProfilePicture}
        />
        <ProfileStack.Screen
            name="ManageProfile"
            component={ManageProfile}
        />
    </ProfileStack.Navigator>
);

const UserScreen = () => (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
        <UserStack.Screen
            name="UserDefault"
            component={Users}
        />
        <UserStack.Screen
            name="UserDetail"
            component={UserDetail}
        />
    </UserStack.Navigator>
);

const BottomNav = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Bookmarks') {
                        iconName = focused ? 'bookmark' : 'bookmark-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'ChatScreen') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'Users') {
                        iconName = focused ? 'people-sharp' : 'people-outline';
                    }
                    return <Icon1 name={iconName} size={size} style={{ marginTop: 10 }} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginBottom: 5,
                },
                tabBarStyle: {
                    backgroundColor: 'white', // Light gray background
                    height: 60,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'blue',
                },
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                marginRight: 10,
                                backgroundColor: '#fff',
                                padding: 10,
                                borderRadius: 15,
                                elevation: 2,
                            }}
                            onPress={() => navigation.navigate('Chat', { user_target_ID: 'ADMIN' })}
                        >
                            <Icon2 name="customerservice" size={20} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginRight: 15,
                                backgroundColor: '#fff',
                                padding: 10,
                                borderRadius: 15,
                                elevation: 2,
                            }}
                            onPress={() => Linking.openURL('https://neo-adventura.ngapain.my.id')}
                        >
                            <Icon1 name="globe-outline" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                ),
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 15,
                },
                headerStyle: {
                    height: 55,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
            })}
        >
            <Tab.Screen name="Home" component={DestinationPlaces} options={{ title: 'Home' }} />
            <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ title: 'Bookmarks' }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={({ route }) => ({
                    headerTitle: GetHeaderTitle(route),
                })} />
            <Tab.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }} />
            <Tab.Screen name="Users" component={UserScreen} options={{ title: 'Friends' }} />
        </Tab.Navigator>
    );
};

export default BottomNav;
