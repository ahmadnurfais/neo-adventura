import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChangeProfilePicture = () => {
    const route = useRoute();
    const { userId, picture } = route.params;
    const [profilePic, setProfilePic] = useState(picture);
    const [isUploading, setIsUploading] = useState(false);

    const updateProfilePicture = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });
        if (result.assets && result.assets.length > 0) {
            // Store the choosen picture the profilePic
            const newPicUri = result.assets[0].uri;
            setProfilePic(newPicUri);
        }
    };

    const createFormData = (photo, body) => {
        const data = new FormData();
        data.append('pp', {
            name: 'pp.jpg',
            type: 'image/jpeg',
            uri: photo,
        });
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };

    const handleUploadPhoto = () => {
        setIsUploading(true); // Start the spinner when the upload starts
        fetch('https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=changeProfilePicture', {
            method: 'POST',
            body: createFormData(profilePic, { id: userId }),
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.json())
            .then(response => {
                setIsUploading(false); // Stop the spinner when the upload is done
                console.log('Upload response: ', response);
                if (response.success === true) {
                    Alert.alert('Upload Successful', response.message);
                } else {
                    // Handle any errors according to the API's response structure
                    Alert.alert('Upload Failed', response.message);
                }
            })
            .catch(error => {
                setIsUploading(false); // Stop the spinner if there is an error
                console.log('Upload error: ', error);
                Alert.alert('Upload Error', 'Please choose the picture before clicking the send button.');
            });
    };

    return (
        <View style={styles.container}>
            {profilePic ? (
                <Image
                    source={{ uri: profilePic }}
                    style={styles.profilePic}
                />
            ) : (
                <Icon name="user-circle" size={120} style={styles.profilePic} />
            )}
            {isUploading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={updateProfilePicture}>
                        <Text style={styles.buttonText}>Select a Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonChange} onPress={handleUploadPhoto}>
                        <Text style={styles.buttonText}>Change</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F7', // Soft background color
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60, // Circular image
        marginBottom: 20,
        borderColor: '#DDE2E5', // Border color for the image
        borderWidth: 3,
    },
    button: {
        backgroundColor: '#4169E1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30, // Rounded corners
        shadowColor: '#000', // Shadow for button to make it 'pop'
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonChange: {
        marginTop: 10,
        backgroundColor: '#0400f4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5, // Rounded corners
        shadowColor: '#000', // Shadow for button to make it 'pop'
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '400',
    },
});

export default ChangeProfilePicture;
