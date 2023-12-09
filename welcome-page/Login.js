import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
    const navigation = useNavigation();

    useEffect(() => {
        // Check if the user is logged in when the app starts
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                // User is already logged in, reset the stack and navigate to the home screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }
        });
    }, [navigation]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const url = `https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=login&username=${username}&pw=${password}`;
            const response = await fetch(url);
            console.log('Response status code:', response.status); // 200 means success

            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data);

                if (data.success) {
                    // Store user data in AsyncStorage for future use.
                    await AsyncStorage.setItem('user_id', data.user_id);
                    // Navigate to the user's dashboard or profile screen.
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
                } else {
                    // Handle login error, e.g., display an error message to the user.
                    setError(data.error_message);
                }
            } else {
                // Handle HTTP error.
                setError('Network error: There is an error in the login process.');
            }
        } catch (e) {
            // Handle network errors.
            console.error('Network error_Second:', error);
            setError('Network error_Second');
        }
    };

    return (
        <ImageBackground source={require('../bg.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Login with Account</Text>
                <TextInput
                    theme={{ colors: { onSurfaceVariant: 'white' } }}
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="white"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    autoCapitalize="none"
                />
                <TextInput
                    theme={{ colors: { onSurfaceVariant: 'white' } }}
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signUpButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    forgotPassword: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 18,
        color: 'white',
    },
    signUpButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue',
        marginLeft: 5,
        backgroundColor: 'white',
        borderColor: 'white',
        paddingTop: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        borderRadius: 5,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Login;
