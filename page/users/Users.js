import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, TextInput, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const ChatScreen = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setUserID(value);
            }
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const getUsers = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}?type=getUsers`);
                    const data = response.data.result;
                    if (data && isActive) {
                        setUsers(data);
                    } else {
                        console.log('No data found in the response.');
                    }
                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };
            getUsers();
            return () => {
                isActive = false; // This will cancel the async operation if the component is unmounted.
            };
        }, [])
    );

    const getUsersRefresh = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}?type=getUsers`);
            const data = response.data.result;
            if (data) {
                setUsers(data);
            } else {
                console.log('No data found in the response.');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUsersRefresh().then(() => {
            setRefreshing(false);
        });
    }, []);

    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(user => user.user_id !== userID && user.user_id !== 'ADMIN');

    return (
        <View style={styles.container}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {filteredUsers.map(user => (
                    <UserItem key={user.user_id} user={user} />
                ))}
            </ScrollView>
        </View>
    );
};

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder="Search by name"
                placeholderTextColor="#888"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

const UserItem = ({ user }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.userItemContainer}>
            <Image source={{ uri: user.picture || 'https://ahmadnurfais.my.id/react-native/doraemon.jpg' }} style={styles.userImage} />
            <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { userID: user.user_id })}><Text style={styles.userName}>{user.name}</Text></TouchableOpacity>
                <Text style={styles.userDescription}>{user.description || 'No Description'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    searchBarContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    userItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    userDescription: {
        color: '#555',
        marginTop: 4,
    },
});

export default ChatScreen;
