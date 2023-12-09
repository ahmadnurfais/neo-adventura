import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Register() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleRegistration = async () => {
        try {
            // Construct the registration URL
            const registrationUrl = 'https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=register';

            // Create a JSON object with user registration data
            const registrationData = {
                username,
                name,
                email,
                pw: password,
            };

            const response = await fetch(registrationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                // Registration successful, handle the response as needed
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    // Registration was successful, you can handle it here
                    // For example, navigate to a login screen
                    navigation.navigate('Verification', { email: email });
                } else {
                    // Handle registration error, e.g., display an error message to the user
                    setError(data.message);
                }
            } else {
                // Handle HTTP error
                setError('Network error');
            }
        } catch (e) {
            // Handle network errors
            setError('Enter your registration data correctly');
        }
    };

    return (
        <ImageBackground source={require('../bg.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="white"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="white"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signInButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signInContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signInText: {
        fontSize: 18,
        color: 'white',
    },
    signInButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
        marginLeft: 5,
        backgroundColor: 'white',
        borderColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3,
        borderRadius: 5,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Register;
