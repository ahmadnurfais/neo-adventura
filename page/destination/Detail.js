/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const DestinationDetailPage = () => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    const route = useRoute();
    const { id } = route.params;
    const [destinationData, setDestinationData] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('user_id')
            .then((userId) => {
                if (isLoggedIn) {
                    console.log('User ID:', userId); // Log the retrieved user ID
                }
                if (userId) {
                    setIsLoggedIn(true);
                    setUserID(userId);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch((error) => {
                console.error('AsyncStorage error:', error);
            });

        axios.get(`https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=getByID&id=${id}`)
            .then(response => {
                // const data = JSON.parse(response.data.replace('<pre>', '').replace('</pre>', '')).result[0];
                // console.log(response.data.result[0].hal_unik.split(','));
                const data = response.data.result[0];
                if (data) {
                    setDestinationData(data); // Set the data in state
                } else {
                    console.log('No data found in the response.');
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }, [id, isLoggedIn]);

    useFocusEffect(
        React.useCallback(() => {
            if (destinationData) {
                navigation.setOptions({ title: destinationData?.alamat });
            }
        }, [destinationData, navigation])
    );

    const destination = {
        description: destinationData?.deskripsi || 'Loading...',
        address: destinationData?.alamat || 'Loading...',
        uniqueness: destinationData?.hal_unik || 'Loading...',
        kategori: destinationData?.kategori || 'Loading...',
        attributes: (destinationData?.hal_unik || '').split(',').filter(attribute => attribute.trim() !== '') || [],
        // images: [
        //     { uri: `data:image/jpeg;base64,${destinationData?.picture1}` },
        //     { uri: `data:image/jpeg;base64,${destinationData?.picture2}` },
        //     { uri: `data:image/jpeg;base64,${destinationData?.picture3}` },
        //     { uri: `data:image/jpeg;base64,${destinationData?.picture4}` },
        // ],
        images: [
            destinationData?.picture1 && {
                uri: `data:image/jpeg;base64,${destinationData.picture1}`,
            },
            destinationData?.picture2 && {
                uri: `data:image/jpeg;base64,${destinationData.picture2}`,
            },
            destinationData?.picture3 && {
                uri: `data:image/jpeg;base64,${destinationData.picture3}`,
            },
            destinationData?.picture4 && {
                uri: `data:image/jpeg;base64,${destinationData.picture4}`,
            },
            destinationData?.picture5 && {
                uri: `data:image/jpeg;base64,${destinationData.picture5}`,
            },
        ].filter(Boolean),
    };

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>{destinationData?.nama_wisata || 'Loading...'}</Title>
            <Card style={styles.card}>
                <Card.Cover style={styles.mainPicture} source={{ uri: `data:image/jpeg;base64,${destinationData?.picture1}` }} />
                <Card.Content>
                    <Paragraph style={styles.description}>{destination.description}</Paragraph>
                    <Text style={styles.label}>Lokasi:</Text>
                    <Text style={styles.text}>{destination.address}</Text>
                    <Text style={styles.label}>Label:</Text>
                    <Paragraph style={styles.text}>{destination.kategori}</Paragraph>

                    <Text style={styles.label}>Hal-hal unik:</Text>
                    <View style={styles.attributesContainer}>
                        {destination.attributes.map((attribute, index) => (
                            <Text key={index} style={styles.attribute}>
                                {attribute}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.label}>Additional Images:</Text>
                    {/* <ScrollView horizontal>
                        {destination.images.map((image, index) => (
                            <Image key={index} source={image} style={styles.image} />
                        ))}
                    </ScrollView> */}
                    <ScrollView horizontal>
                        {destination.images.map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleImageClick(image)}
                            >
                                <Image source={image} style={styles.image} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Card.Content>
                <Card.Actions>
                    <Button icon="map" mode="outlined" style={[styles.mapButton, {marginRight: 30}]} textColor="#0400f4">
                        Map
                    </Button>
                    <Button icon="comment" mode="outlined" style={styles.mapButton} textColor="#0400f4" onPress={ () => navigation.navigate('CommentPage', { id: id, userID: userID })}>
                        Check Commentar
                    </Button>
                </Card.Actions>
            </Card>
            {/* Image Modal */}
            <Modal
                visible={showImageModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowImageModal(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Image
                        source={selectedImage}
                        style={styles.modalImage}
                        resizeMode="contain"
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainPicture: {
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light background color
    },
    card: {
        margin: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: '#333',
    },
    description: {
        fontSize: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        lineHeight: 24,
        color: '#555',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 10,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        color: '#555',
    },
    attributesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    attribute: {
        fontSize: 14,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
        padding: 8,
        borderRadius: 5,
        color: '#333',
    },
    image: {
        width: 200,
        height: 150,
        marginRight: 16,
        marginBottom: 16,
        borderRadius: 10,
    },
    mapButton: {
        alignSelf: 'flex-end',
        marginRight: 16,
        marginBottom: 16,
    },
    imageThumbnail: {
        width: 200,
        height: 150,
        marginRight: 16,
        marginBottom: 16,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalImage: {
        width: '80%',
        aspectRatio: 1, // Maintain aspect ratio
    },
});

export default DestinationDetailPage;
