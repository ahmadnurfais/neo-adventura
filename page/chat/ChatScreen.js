import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { database } from '../../config/firebase';
import moment from 'moment'; // Import moment.js
import { API_BASE_URL } from '@env';

export default function ChatScreen() {
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        // Retrieve the user ID from AsyncStorage
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setUserID(value);
            }
        });
    }, []);

    const navigation = useNavigation();

    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from MySQL
                const response = await axios.get(`${API_BASE_URL}?type=getUsers`);
                const usersData = response.data.result;

                // Fetch chat history from Firebase
                const chatCollection = collection(database, 'chats');
                const q = query(chatCollection, orderBy('timestamp', 'desc'));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const chatHistory = querySnapshot.docs.map(doc => doc.data());

                    // Combine user data with chat history
                    const usersWithChatHistory = usersData
                        .filter(user => chatHistory.some(history => (history.user_target_ID === user.user_id && history.userID === userID) || (history.user_target_ID === userID && history.userID === user.user_id)))
                        .map(user => {
                            const userChatHistory = chatHistory.find(history => (history.user_target_ID === user.user_id && history.userID === userID) || (history.user_target_ID === userID && history.userID === user.user_id)) || {};
                            // Count unread messages
                            const unreadCount = chatHistory.reduce((count, history) => {
                                if (history.user_target_ID === userID && history.userID !== userID && history.userID === userChatHistory.userID && history.isRead === false) {
                                    count++;
                                }
                                return count;
                            }, 0);
                            return {
                                ...user,
                                lastMessage: userChatHistory.message || '',
                                lastMessageTimestamp: userChatHistory.timestamp || 0,
                                unreadMessages: unreadCount,
                            };
                        });

                    // Sort the user data based on the newest chat timestamp
                    usersWithChatHistory.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

                    // Update state
                    setUsers(usersWithChatHistory);
                    setIsLoading(false);
                });

                // Detach the listener when the component unmounts
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userID]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { user_target_ID: item.user_id, nameSender: item.name, avatarSender: item.picture })}>
            <View style={styles.userItem}>
                <Image style={styles.avatar} source={{ uri: item.picture || 'https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png' }} />
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>{item.name}</Text>
                    {item.unreadMessages > 0 && (
                        <View style={styles.unreadBubble}>
                            <Text style={styles.unreadText}>{item.unreadMessages}</Text>
                        </View>
                    )}
                    {item.lastMessage && (
                        <>
                            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                            <Text style={styles.timestamp}>{formatTimestamp(item.lastMessageTimestamp)}</Text>
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    const formatTimestamp = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            timestamp = timestamp.toDate();
        }

        const currentDate = moment();
        const messageDate = moment(timestamp);

        // Calculate the time difference in hours
        const hoursDifference = currentDate.diff(messageDate, 'hours');

        if (hoursDifference < 24) {
            // Within the same day, show HH:MM AM/PM
            return messageDate.format('h:mm A');
        } else if (hoursDifference < 48) {
            // Within 48 hours, show 'Yesterday'
            return 'Yesterday';
        } else {
            // More than 48 hours, show DD/MM/YYYY
            return messageDate.format('DD/MM/YYYY');
        }
    };

    return (
        <>
            {isLoading ? (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0400f4" />
                </View>
            ) : (
                <View>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.user_id}
                        renderItem={renderItem}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userInfoContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    unreadBubble: {
        backgroundColor: 'red',
        borderRadius: 20,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: -1,
        zIndex: 1,
    },
    unreadText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    lastMessage: {
        color: '#555',
    },
    timestamp: {
        paddingTop: 2,
        color: '#888',
        fontSize: 12,
    },
});
