/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

export default function UserDetail() {
    const [profileData, setProfileData] = useState(null);
    const route = useRoute();
    const { userID } = route.params;
    const navigation = useNavigation();

    const [currentUserID, setCurrentUserID] = useState(null);
    useEffect(() => {
        // Retrieve the user ID from AsyncStorage
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setCurrentUserID(value);
            }
        });
    }, []);

    useEffect(() => {
        let isActive = true;

        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}?type=getUser&id=${userID}`);
                const data = response.data.result[0];
                if (data && isActive) {
                    setProfileData(data);
                } else {
                    console.log('No data found in the response.');
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchProfileData();

        return () => {
            isActive = false;
        };
    }, [userID]);

    if (!profileData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#1e2c3a" />
            </View>
        );
    }

    return (
        <>
            {currentUserID === null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f0f0f0' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#555', fontWeight: 'bold', marginBottom: 15 }}> Privacy is our Top Priority</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#666' }}>To access the information of this user,</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#666' }}>please log in</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Image source={{ uri: profileData.picture || 'https://ahmadnurfais.my.id/react-native/doraemon.jpg' }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{profileData.name}</Text>
                        <Text style={styles.description}>{profileData.description || 'No Description'}</Text>
                        <Text style={styles.email}>{profileData.email}</Text>
                        {/* Other user details can be added here */}
                    </View>
                    <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat', { user_target_ID: userID })}>
                        <Text style={styles.chatButtonText}>Chat with {profileData.username}</Text>
                    </TouchableOpacity>
                </View>
            )}

        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },
    email: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    chatButton: {
        backgroundColor: '#1e2c3a',
        padding: 15,
        borderRadius: 25,
        marginTop: 20,
    },
    chatButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
