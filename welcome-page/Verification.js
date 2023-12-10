/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '@env';

const Verification = () => {
    const [verificationcode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const popSuccess = () => {
        Alert.alert(
            'Success',
            'Your account has been successfully created. You need to log in using this account on the login page of this application.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const route = useRoute();
    const { email } = route.params;

    const handleVerification = async () => {
        setIsLoading(true);
        try {
            const verificationUrl = `${API_BASE_URL}?type=register`;

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
                setIsLoading(false);
                // Verification successful, handle the response as needed
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    // Registration was successful, you can handle it here
                    // For example, navigate to a login screen
                    popSuccess();
                } else {
                    // Handle registration error, e.g., display an error message to the user
                    setError(data.message);
                }
            } else {
                setIsLoading(false);
                // Handle HTTP error
                setError('Network error');
            }
        } catch (e) {
            setIsLoading(false);
            // Handle network errors
            setError('Network error');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Confirmation Code</Text>
            <Text style={styles.infoText}>
                Enter the six-digit code that we sent to <Text style={{ fontWeight: 'bold' }}>{email}</Text> to verify your account
            </Text>
            <Text style={styles.subInfoText}>
                It may take up to a minute for you to receive this code. Please also check your spam inbox.
            </Text>
            <TextInput
                placeholder="Enter the verification code"
                vvalue={verificationcode}
                onChangeText={(text) => setVerificationCode(text)}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={6}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#1c2e3a" />
            ) : (
                <TouchableOpacity style={styles.confirmButton} onPress={handleVerification}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            )}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        background: 'white',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        paddingBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    subInfoText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 40,
        textAlign: 'center',
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
        textAlign: 'center', // Center the text
    },
    confirmButton: {
        backgroundColor: '#1e2c3a',
        paddingVertical: 15,
        width: '100%', // Full width
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10, // Add spacing between button and text
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: '#1e2c3a',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default Verification;
