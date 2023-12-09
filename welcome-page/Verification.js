import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Verification = () => {
    const [verificationcode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const route = useRoute();
    const { email } = route.params;

    const handleVerification = async () => {
        try {
            const verificationUrl = 'https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=register';

            const verificationData = {
                email,
                verificationcode,
            };

            const response = await fetch(verificationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verificationData),
            });

            if (response.ok) {
                // Verification successful, handle the response as needed
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    // Registration was successful, you can handle it here
                    // For example, navigate to a login screen
                    navigation.navigate('Login');
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
            setError('Network error');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Your Account</Text>
            <TextInput
                placeholder="Verification Code"
                value={verificationcode}
                onChangeText={(text) => setVerificationCode(text)}
                style={styles.input}
                keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleVerification}>
                <Text style={styles.registerButtonText}>Verify Now</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signInContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signInText: {
        fontSize: 16,
    },
    signInButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginLeft: 5,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Verification;
