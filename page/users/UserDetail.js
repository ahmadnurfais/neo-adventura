import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function UserDetail() {
    const [profileData, setProfileData] = useState(null);
    const route = useRoute();
    const { userID } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        let isActive = true;

        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=getUser&id=${userID}`);
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
        return <Text>Loading...</Text>; // Or any other loading indicator
    }

    return (
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
        backgroundColor: '#007bff',
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
