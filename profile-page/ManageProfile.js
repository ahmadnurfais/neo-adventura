import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const ManageProfile = () => {
    const route = useRoute();
    const { userID, name, email, username, description, picture } = route.params;

    const [profileName, setProfileName] = useState(name);
    const [profileEmail, setProfileEmail] = useState(email);
    const [profileUsername, setProfileUsername] = useState(username);
    const [profileDescription, setProfileDescription] = useState(description);

    const [isUploading, setIsUploading] = useState(false);

    const createFormData = (body) => {
        const data = new FormData();
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };

    const handleSave = () => {
        setIsUploading(true);
        fetch('https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=manageProfile', {
            method: 'POST',
            body: createFormData({ id: userID, name: profileName, username: profileUsername, description: profileDescription }),
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        }).then(response => response.json())
            .then(response => {
                setIsUploading(false); // Stop the spinner when the upload is done
                console.log('Update response: ', response);
                if (response.success === true) {
                    Alert.alert('Update Successful', response.message);
                } else {
                    Alert.alert('Update Failed', response.message);
                }
            })
            .catch(error => {
                setIsUploading(false); // Stop the spinner if there is an error
                console.log('Update error: ', error);
                Alert.alert('Update Failed', 'Network issue. Please try again.');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.avatarContainer}>
                    {picture ? (
                        <Image
                            source={{ uri: picture }}
                            style={styles.profilePic}
                        />
                    ) : (
                        <Avatar.Icon size={100} icon="account" style={styles.avatar} />
                    )}
                </View>
                <TextInput
                    label="Name"
                    value={profileName}
                    onChangeText={setProfileName}
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="#0400f4"
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    value={profileEmail}
                    onChangeText={setProfileEmail}
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="#0400f4"
                    style={styles.input}
                    keyboardType="email-address"
                    disabled={true}
                />
                <TextInput
                    label="Username"
                    value={profileUsername}
                    onChangeText={setProfileUsername}
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="#0400f4"
                    style={styles.input}
                />
                <TextInput
                    label="Description"
                    value={profileDescription}
                    onChangeText={setProfileDescription}
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="#0400f4"
                    style={styles.input}
                    multiline
                    numberOfLines={2}
                />
                {isUploading ? (
                    <ActivityIndicator size="small" color="#0400f4" />
                ) : (
                    <Button
                        mode="contained"
                        onPress={handleSave}
                        style={styles.button}>
                        Save Profile
                    </Button>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        backgroundColor: '#f0eded',
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 16,
        paddingHorizontal: 0,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#0400f4',
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60, // Circular image
        marginBottom: 20,
        borderColor: '#DDE2E5', // Border color for the image
    },
});

export default ManageProfile;
