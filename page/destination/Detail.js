import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { Card, Button, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from '@env';

const LocationLabel = ({ text, iconName }) => (
    <View style={styles.locationLabelContainer}>
        <Icon name={iconName} size={20} color="#1e2c3a" />
        <Text style={styles.locationLabelText}>{text}</Text>
    </View>
);

const DestinationDetailPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [destinationData, setDestinationData] = useState(null);
    const [userID, setUserID] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('user_id')
            .then((userId) => {
                if (userId) {
                    setUserID(userId);
                    console.log('User ID:', userId);
                }
            })
            .catch((error) => {
                console.error('AsyncStorage error:', error);
            });

        axios.get(`${API_BASE_URL}?type=getByID&id=${id}`)
            .then(response => {
                // const data = JSON.parse(response.data.replace('<pre>', '').replace('</pre>', '')).result[0];
                // console.log(response.data.result[0].hal_unik.split(','));
                const data = response.data.result[0];
                if (data) {
                    setDestinationData(data);
                } else {
                    console.log('No data found in the response.');
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }, [id]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    const destination = {
        name: destinationData?.nama_wisata || 'Loading...',
        description: destinationData?.deskripsi || 'Loading...',
        address: destinationData?.alamat || 'Loading...',
        uniqueness: destinationData?.hal_unik || 'Loading...',
        kategori: destinationData?.kategori || 'Loading...',
        embed_map: destinationData?.embed_map || 'https://www.google.com/maps/embed?pb=',
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
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon2 name="arrow-back" size={25} color="#1e2c3a" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{destination.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.contentContainer}>
                    <Card style={styles.card}>
                        <Card.Cover style={styles.mainPicture} source={{ uri: `data:image/jpeg;base64,${destinationData?.picture1}` }} />
                        <Card.Content>
                            <Paragraph style={styles.description}>{destination.description}</Paragraph>
                            <Text style={styles.label}>Label:</Text>
                            <Text style={styles.text}>{destination.kategori}</Text>
                            <Text style={styles.label}>Fun Fact:</Text>
                            <View style={styles.attributesContainer}>
                                {destination.attributes.map((attribute, index) => (
                                    <Text key={index} style={styles.attribute}>
                                        {attribute}
                                    </Text>
                                ))}
                            </View>
                            <LocationLabel text={destination.address} iconName="map-marker" />
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
                            <Button icon="comment" textColor="#1e2c3a" mode="outlined" style={styles.commentButton} onPress={() => navigation.navigate('CommentPage', { id: id, userID: userID })}>
                                Comment
                            </Button>
                        </Card.Actions>
                    </Card>
                    <TouchableOpacity onPress={() => navigation.navigate('MapView', { embed_map: destination.embed_map, name: destination.name })} style={styles.mapButton}>
                        <Icon name="map" size={20} color="white" />
                        <Text style={styles.mapButtonText}>View Map</Text>
                    </TouchableOpacity>

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
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    backButton: {
        color: '#0084FF',
        fontSize: 16,
        marginRight: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    contentContainer: {
        padding: 16,
    },
    card: {
        borderRadius: 10,
        marginBottom: 16,
    },
    mainPicture: {
        height: 200,
        borderRadius: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
    attributesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    commentButton: {
        alignSelf: 'flex-end',
        marginRight: 16,
        marginBottom: 16,
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
        width: '100%',
        aspectRatio: 1,
    },
    locationLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15,
    },
    locationLabelText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#333',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: '#333',
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e2c3a',
        padding: 10,
        borderRadius: 5,
        margin: 16,
        alignSelf: 'center',
    },
    mapButtonText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
    },
});

export default DestinationDetailPage;
