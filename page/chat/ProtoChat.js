import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { database } from '../../config/firebase'; // Import the firebase database

export default function Chat() {
    const user_target_ID = 'USER002'; // Dummy static data, will be fixed based on the route
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setUserID(value);
            }
        });
    }, []);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadChatMessages = async () => {
            if (userID) {
                const chatCollection = collection(database, 'chats');
                // First query for messages where the current user is the sender
                const sentMessagesQuery = query(
                    chatCollection,
                    where('userID', '==', userID),
                    where('user_target_ID', '==', 'USER002'),
                    orderBy('timestamp', 'desc')
                );

                // Second query for messages where the current user is the recipient
                const receivedMessagesQuery = query(
                    chatCollection,
                    where('userID', '==', 'USER002'),
                    where('user_target_ID', '==', userID),
                    orderBy('timestamp', 'desc')
                );

                try {
                    // Fetch the messages from both queries
                    const [sentMessagesSnapshot, receivedMessagesSnapshot] = await Promise.all([
                        getDocs(sentMessagesQuery),
                        getDocs(receivedMessagesQuery),
                    ]);

                    // Combine the message documents from both snapshots
                    const chatMessages = [...sentMessagesSnapshot.docs, ...receivedMessagesSnapshot.docs]
                        .map(doc => ({ ...doc.data(), _id: doc.id }))

                        // Sort by timestamp after combining
                        .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
                        .map(message => ({
                            _id: message._id,
                            text: message.message,
                            createdAt: new Date(message.timestamp.seconds * 1000),
                            user: {
                                _id: message.userID,
                            },
                        }));
                    setMessages(chatMessages);
                } catch (error) {
                    console.error('Error fetching chat messages:', error);
                }
            }
        };

        loadChatMessages();
    }, [userID]);

    const onSend = useCallback(async (newMessages = []) => {
        if (userID) {
            try {
                const chatCollection = collection(database, 'chats');
                await addDoc(chatCollection, {
                    userID,
                    user_target_ID,
                    message: newMessages[0].text,
                    timestamp: new Date(),
                });

                console.log('Message sent to Firebase successfully');
            } catch (error) {
                console.error('Error sending message to Firebase:', error);
            }
        }

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages),
        );
    }, [userID]);

    return (
        <GiftedChat
            messages={messages}
            // eslint-disable-next-line no-shadow
            onSend={messages => onSend(messages)}
            user={{
                _id: userID,
            }}
        />
    );
}
