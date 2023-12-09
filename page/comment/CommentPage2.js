import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

const CommentInputArea = () => {
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = response.assets && response.assets[0] ? response.assets[0].uri : null;
                const name = response.assets && response.assets[0] ? response.assets[0].fileName : null;

                if (source && name) {
                    setImage(source);
                    setImageName(name);
                }
            }
        });
    };

    const removeImage = () => {
        setImage(null);
        setImageName('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Write a comment..."
                style={styles.input}
                value={comment}
                onChangeText={setComment}
                mode="outlined"
            />
            <IconButton
                icon="camera"
                size={24}
                onPress={selectImage}
                style={styles.iconButton}
            />
            {imageName ? (
                <View style={styles.imageIndicator}>
                    <Text style={styles.imageName}>{imageName}</Text>
                    <IconButton
                        icon="close"
                        size={20}
                        onPress={removeImage}
                        style={styles.removeImageButton}
                    />
                </View>
            ) : null}
            <IconButton
                icon="send"
                size={24}
                onPress={() => {
                    console.log('Comment and image sent', { comment, image });
                    // Implement the logic to handle the submission of the comment and the image
                }}
                disabled={!comment || !image} // Disable the button if there is no comment or image
                style={styles.iconButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    input: {
        flex: 1,
        marginRight: 8,
    },
    iconButton: {
        marginHorizontal: 4,
    },
    imageIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#e1e1e1', // A light gray background for the indicator
        borderRadius: 4,
    },
    imageName: {
        marginRight: 8,
        fontSize: 14,
    },
    removeImageButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
    },
});

export default CommentInputArea;
