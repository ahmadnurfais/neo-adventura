// Test.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

const Test = () => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const destination = {
        title: 'Example Destination',
        description:
            'Explore the breathtaking beauty of Example Destination, nestled in the heart of nature. This enchanting place offers a perfect blend of serenity and adventure. Whether you are a nature lover, a hiking enthusiast, or simply seeking tranquility, this destination has it all. Immerse yourself in lush green landscapes, explore scenic trails, and camp under the starry sky. Unwind and connect with nature like never before.',
        address: '123 Main St, City, Country',
        uniqueness: 'Unique features of this place go here.',
        attributes: ['Scenic Views', 'Hiking Trails', 'Camping'],
        images: [
            require('../1.jpg'),
            require('../1.jpg'),
            require('../1.jpg'),
        ],
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>{destination.title}</Title>
            <Card style={styles.card}>
                <Card.Cover source={require('../1.jpg')} />
                <Card.Content>
                    <Paragraph style={styles.description}>{destination.description}</Paragraph>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.text}>{destination.address}</Text>
                    <Text style={styles.label}>Uniqueness:</Text>
                    <Paragraph style={styles.text}>{destination.uniqueness}</Paragraph>
                    <Text style={styles.label}>Attributes:</Text>
                    <View style={styles.attributesContainer}>
                        {destination.attributes.map((attribute, index) => (
                            <Text key={index} style={styles.attribute}>
                                {attribute}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.label}>Additional Images:</Text>
                    <ScrollView horizontal>
                        {destination.images.map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleImageClick(image)}
                            >
                                <Image source={image} style={styles.imageThumbnail} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Card.Content>
                <Card.Actions>
                    <Button icon="map" mode="outlined" style={styles.mapButton}>
                        View on Map
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
    imageThumbnail: {
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

export default Test;
