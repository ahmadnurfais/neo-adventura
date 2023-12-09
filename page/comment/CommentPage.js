import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, Button, Card, Avatar, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const CommentPage = () => {
    const route = useRoute();
    const { id, userID } = route.params;
    const [isUploading, setIsUploading] = useState(false);
    const [comments, setComments] = useState([]);

    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const imageUri = 'https://ahmadnurfais.my.id/react-native/neo-adventura/picture/comment/mushishi.jpg';

    // Function to fetch comments from the API
    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=getComment&id=${id}`);
            setComments(response.data.result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateAverageRating = (comments) => {
        // Filter out any comments without a rating
        const ratedComments = comments.filter(comment => comment.rating != null);

        // Calculate the sum of all ratings
        const sumOfRatings = ratedComments.reduce((acc, comment) => acc + parseInt(comment.rating, 10), 0);

        // Calculate the average rating
        const averageRating = sumOfRatings / ratedComments.length;

        // Return the average rating, or 0 if there are no rated comments
        return ratedComments.length ? averageRating.toFixed(2) : 0;
    };

    // Image selection logic
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

    const createFormData = (photo, body) => {
        const data = new FormData();
        data.append('picture', {
            name: 'pc.jpg',
            type: 'image/jpeg',
            uri: image,
        });
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };

    // Comment submission logic
    const submitComment = () => {
        setIsUploading(true); // Start the spinner when the upload starts
        fetch('https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=postComment', {
            method: 'POST',
            body: createFormData(image, { userID: userID, id: id, rating: rating, comment: comment }),
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.json())
            .then(response => {
                setIsUploading(false); // Stop the spinner when the upload is done
                console.log('Upload response: ', response);
                if (response.success === true) {
                    fetchComments();
                    setComment('');
                    setRating('');
                    removeImage();
                    Alert.alert('Upload Successful', 'Your comment has been sent.');
                } else {
                    // Handle any errors according to your API's response structure
                    Alert.alert('Upload Failed', response.message);
                }
            })
            .catch(error => {
                setIsUploading(false); // Stop the spinner if there is an error
                console.log('Upload error: ', error);
            });
    };

    // Render item for FlatList
    const renderItem = ({ item }) => (
        <Card style={styles.commentCard}>
            <Card.Title
                title={item.name}
                subtitle={`Rating: ${item.rating} Stars`}
                left={(props) => <Avatar.Icon {...props} backgroundColor="#0400f4" icon="account" />}
                leftStyle={styles.avatar}
            />
            <Card.Content>
                <Text>{item.comment}</Text>
                {item.imageUri ? (
                    <Image style={styles.commentImage} source={{ uri: item.imageUri }} />
                ) : null}
            </Card.Content>
        </Card>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 25}
        >
            <View style={styles.overallRatingContainer}>
                <Text style={styles.overallRatingText}>
                    Overall Rating: {calculateAverageRating(comments)} / 5
                </Text>
            </View>
            {comments[0] !== 'error' ? (
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.commentsList}
                />
            ) : null
            }
            <View style={styles.writeCommentSection}>
                <TextInput
                    placeholder="Comment"
                    value={comment}
                    onChangeText={setComment}
                    style={styles.input}
                    mode="outlined"
                    activeOutlineColor="#0400f4"
                />
                <TextInput
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChangeText={setRating}
                    keyboardType="numeric"
                    maxLength={1} // Ratings are typically a single digit
                    style={styles.ratingInput}
                    mode="flat"
                    activeUnderlineColor="#0400f4"
                />
                <TouchableOpacity onPress={selectImage} style={styles.iconButton}>
                    <Avatar.Icon backgroundColor="#0400f4" size={24} icon="camera" />
                </TouchableOpacity>
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
                <Button
                    icon="send"
                    mode="contained"
                    onPress={submitComment}
                    disabled={isUploading || comment === '' || rating === '' || !image}
                    style={styles.sendButton}
                    buttonColor="#0400f4"
                >
                    Post
                </Button>
            </View>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    commentsList: {
        flex: 1,
    },
    writeCommentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    iconButton: {
        padding: 6,
        marginRight: 8,
    },
    sendButton: {
        paddingVertical: 6,
    },
    commentCard: {
        marginVertical: 4,
        marginHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    avatar: {
        marginRight: 8,
    },
    commentImage: {
        width: '100%',
        height: 200,
        marginTop: 8,
        borderRadius: 4,
    },
    imageIndicator: {
        // flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
        marginRight: 5,
        backgroundColor: '#e1e1e1', // A light gray background for the indicator
        borderRadius: 4,
    },
    imageName: {
        marginRight: 8,
        fontSize: 10,
    },
    removeImageButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
    },
    overallRatingContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    overallRatingText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ratingInput: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        width: 5,
    },
});

export default CommentPage;
