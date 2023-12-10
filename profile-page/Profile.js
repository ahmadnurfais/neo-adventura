/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = ({ navigation }) => {
    const [userID, setUserID] = useState(null);
    useEffect(() => {
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setUserID(value);
            }
        });
    }, []);

    const [profileData, setProfileData] = useState(null);

    useFocusEffect(
        useCallback(() => {
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
                isActive = false; // This will cancel the async operation if the component is unmounted.
            };
        }, [userID])
    );

    console.log(profileData);

    const handleConfirmation = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to proceed to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Handle the user's confirmation here
                        AsyncStorage.removeItem('user_id').then(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {userID !== null ? (
                    <>
                        <View style={styles.profileInfo}>
                            <View style={styles.profilePictureContainer}>
                                {profileData?.picture ? (
                                    <Image
                                        source={{ uri: profileData.picture }}
                                        style={styles.avatar2}
                                    />
                                ) : (
                                    <Icon name="user-circle" size={100} style={styles.avatar} />
                                )}
                                <TouchableOpacity onPress={() => navigation.navigate('ChangeProfilePicture', { picture: profileData?.picture, userId: userID })}>
                                    <Text style={styles.changeProfileText}>Change Profile Picture</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.profileName}>{profileData?.name || 'Loading...'}</Text>
                            <Text style={styles.profileDetails}>{profileData?.description || 'Loading...'}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={() => navigation.navigate('ManageProfile', { name: profileData?.name, email: profileData?.email, username: profileData?.username, description: profileData?.description, picture: profileData?.picture, userID: userID })}>
                                <Icon name="cog" size={20} style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Manage Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={() => navigation.navigate('ReviewHistory')}>
                                <Icon name="history" size={20} style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Review History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={() => navigation.navigate('Bookmarks')}>
                                <Icon name="bookmark" size={20} style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Saved Destination</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.logoutButton, styles.buttonShadow]} onPress={handleConfirmation}>
                                <Icon name="sign-out" size={20} style={{ color: 'white' }} />
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles_d.container}>
                        <Text style={styles_d.infoText}>
                            This page can only be accessed by users who have <Text style={{ fontWeight: 'bold' }}>logged</Text> in to their accounts.
                            {'\n\n'}
                            Please <Text style={{ fontWeight: 'bold' }}>login</Text> first, or if you do not have an account yet, please <Text style={{ fontWeight: 'bold' }}>create</Text> it through the following register button.
                        </Text>
                        <TouchableOpacity style={styles_d.button} onPress={() => {navigation.navigate('Login');}}>
                            <Text style={styles_d.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles_d.button} onPress={() => {navigation.navigate('Register');}}>
                            <Text style={styles_d.buttonText}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles_d = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#1e2c3a',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navButton: {
        marginRight: 10,
    },
    profileInfo: {
        alignItems: 'center',
        padding: 20,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        marginBottom: 10,
        color: '#1e2c3a',
    },
    avatar2: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensures the Image doesn't bleed outside the borderRadius
        marginBottom: 10,
    },
    changeProfileText: {
        marginTop: 5,
        color: '#efa663',
    },
    profileName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    profileDetails: {
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
    },
    buttonIcon: {
        marginRight: 10,
        color: '#1e2c3a',
    },
    buttonText: {
        fontSize: 18,
        color: '#1e2c3a',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e2c3a',
        width: '90%',
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    logoutButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    buttonShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Profile;
