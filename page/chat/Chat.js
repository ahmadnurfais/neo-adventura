/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, InputToolbar, Composer } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { database } from '../../config/firebase'; // Import the firebase database
import { API_BASE_URL } from '@env';

export default function Chat({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);

    const route = useRoute();
    const { user_target_ID } = route.params; // The ID of the other user in the chat (partner of the current user)

    const [userID, setUserID] = useState(null);
    useEffect(() => {
        // Retrieve the user ID from AsyncStorage
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setUserID(value);
            }
        });
    }, []);

    const [avatarSender, setAvatarSender] = useState(null);
    const [nameSender, setNameSender] = useState(null);
    useEffect(() => {
        const fetchAvatarSender = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}?type=getUser&id=${user_target_ID}`);
                const data = response.data.result[0];
                if (data) {
                    setAvatarSender(data.picture);
                    setNameSender(data.name);
                } else {
                    console.log('No avatar data found in the response.');
                }
            } catch (error) {
                console.log('Error fetching data avatar:', error);
            }
        };
        fetchAvatarSender();
    }, [user_target_ID]);

    // Function to mark a message as read
    const updateRead = async (messageId) => {
        const messageRef = doc(collection(database, 'chats'), messageId);
        await updateDoc(messageRef, {
            isRead: true,
        }).catch(error => console.log('Error updating read status:', error));
    };

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (userID) {
            const chatCollection = collection(database, 'chats');
            // Query for messages in chats between the current user and the target user
            const q = query(
                chatCollection,
                where('userID', 'in', [userID, user_target_ID]),
                where('user_target_ID', 'in', [userID, user_target_ID]),
                orderBy('timestamp', 'desc')
            );

            // Listen for real-time updates
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedMessages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    // Mark message as read if it's received by the current user
                    if (firebaseData.user_target_ID === userID && firebaseData.isRead === false) {
                        updateRead(doc.id);
                    }
                    return {
                        _id: doc.id,
                        text: firebaseData.message,
                        createdAt: firebaseData.timestamp.toDate(),
                        user: {
                            _id: firebaseData.userID,
                            avatar: avatarSender,
                        },
                        sent: true,
                        received: firebaseData.isRead,
                    };
                }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                setMessages(fetchedMessages);
                setIsLoading(false);
            });

            // Detach the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [avatarSender, userID, user_target_ID]);

    const onSend = useCallback((newMessages = []) => {
        if (userID) {
            const { _id, createdAt, text, user } = newMessages[0];
            addDoc(collection(database, 'chats'), {
                userID,
                user_target_ID,
                message: text,
                timestamp: createdAt,
                isRead: false,
            });

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, newMessages)
            );
        }
    }, [userID, user_target_ID]);

    return (
        <View style={styles.container}>
            <View style={styles2.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles2.backButton}>
                        <Icon name="arrow-back" size={25} />
                    </Text>
                </TouchableOpacity>
                <Image style={styles2.avatar} source={avatarSender ? { uri: avatarSender } : { uri: 'https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png' }} />
                <View>
                    <Text style={styles2.username}>{nameSender}</Text>
                </View>
            </View>
            {isLoading ? (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#1e2c3a" />
                </View>
            ) : (
                <GiftedChat
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: userID,
                    }}
                    showAvatarForEveryMessage
                    renderChatEmpty={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ transform: [{ rotate: '180deg' }], alignItems: 'center' }}>
                                <Image
                                    source={{ uri: avatarSender }}
                                    style={{ width: 100, height: 100, borderRadius: 50, marginVertical: 10 }}
                                />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 5 }}>{nameSender}</Text>
                                <Text>No messages yet. Start the conversation!</Text>
                            </View>
                        </View>
                    )}
                    renderInputToolbar={(props) => (
                        <InputToolbar
                            {...props}
                            containerStyle={{
                                borderTopColor: '#E8E8E8',
                                borderTopWidth: 0,
                                paddingRight: 5,
                                backgroundColor: 'white',
                            }}
                        />
                    )}
                    renderComposer={(props) => (
                        <Composer
                            {...props}
                            textInputStyle={{
                                backgroundColor: '#EDF1F7',
                                borderRadius: 20,
                                borderColor: '#E4E9F2',
                                paddingHorizontal: 12,
                                margin: 0,
                            }}
                        />
                    )}
                    style={{ marginBottom: 10 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

const styles2 = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        color: '#1e2c3a',
        fontSize: 16,
        marginRight: 10,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
