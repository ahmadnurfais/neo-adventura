/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { database } from '../../config/firebase'; // Import the firebase database

export default function Chat() {
    const [isLoading, setIsLoading] = useState(true);

    const user_target_ID = 'USER001'; // The ID of the other user in the chat
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
                const response = await axios.get(`https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=getUser&id=${user_target_ID}`);
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
    });

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
                    return {
                        _id: doc.id,
                        text: firebaseData.message,
                        createdAt: firebaseData.timestamp.toDate(),
                        user: {
                            _id: firebaseData.userID,
                            avatar: avatarSender,
                        },
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
            // eslint-disable-next-line no-unused-vars
            const { _id, createdAt, text, user } = newMessages[0];
            addDoc(collection(database, 'chats'), {
                userID,
                user_target_ID,
                message: text,
                timestamp: createdAt,
            });

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, newMessages)
            );
        }
    }, [userID, user_target_ID]);

    return (
        <>
            {isLoading ? (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0400f4" />
                </View>
            ) : (
                <GiftedChat
                    // renderLoading={() => isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    messages={messages}
                    // eslint-disable-next-line no-shadow
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: userID, // Assuming the user ID is the same as the one used for sending messages
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
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
