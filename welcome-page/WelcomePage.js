import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WelcomePage() {
    const [showWelcomePage, setShowWelcomePage] = useState(true);
    const [initialCheckComplete, setInitialCheckComplete] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        // Check if the user has seen the Welcome Page before.
        AsyncStorage.getItem('hasSeenWelcomePage').then((value) => {
            if (value === 'true') {
                // User has seen the Welcome Page before, skip it.
                setShowWelcomePage(true); // Default is false
            } else {
                // User is opening the app for the first time.
                // Mark the Welcome Page as seen, so it won't show again.
                AsyncStorage.setItem('hasSeenWelcomePage', 'true');
            }

            // Set initial check as complete.
            setInitialCheckComplete(true);
        });
    }, []);

    useEffect(() => {
        // Conditionally navigate based on whether the user has seen the welcome page.
        // if (initialCheckComplete && !showWelcomePage) {
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Include initialCheckComplete in the dependencies array

    return (
        <View style={styles.container}>
            {/* {showWelcomePage && ( */}
                {/* <View style={styles.container}> */}
                    <Image source={require('../icon.png')} style={styles.logo} />
                    <Text style={styles.welcomeText}>Welcome to Neo Adventura</Text>
                    <Text style={styles.description}>Get started by signing in or using the app without an account.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login'); }}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => { navigation.navigate('HomeScreen'); }}>
                        <Text style={styles.secondaryButtonText}>Use Without an Account</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.orText}>OR</Text>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="facebook" size={24} color="blue" style={styles.icon} />
                        <Text style={styles.socialButtonText}>Sign In with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="google" size={24} color="blue" style={styles.icon} />
                        <Text style={styles.socialButtonText}>Sign In with Google</Text>
                    </TouchableOpacity> */}
                {/* </View> */}
            {/* )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        borderRadius: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    socialButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'lightgray',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: 'row', // Align icon and text horizontally
    },
    socialButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 10,
    },
});

export default WelcomePage;
