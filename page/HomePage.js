import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DestinationPlaces = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [destinationPlaces, setDestinationPlaces] = useState([]);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user_id')
            .then((userId) => {
                console.log('User ID:', userId);
                if (userId) {
                    setIsLoggedIn(true);
                    fetchData(userId); // Fetch data with user ID
                } else {
                    setIsLoggedIn(false);
                    fetchData(null); // Fetch data without user ID
                }
            })
            .catch((error) => {
                console.error('AsyncStorage error:', error);
            });
    }, []);

    const fetchData = (userId) => {
        let url = 'https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=get';
        if (userId !== null) {
            url = `https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=getWithBookmark&id=${userId}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const placesFromAPI = data.result.map((place) => ({
                    id: place.id_tempat_wisata,
                    title: place.nama_wisata,
                    address: place.alamat,
                    picture: `data:image/jpeg;base64,${place.picture1}`,
                    category: place.kategori,
                    bookmarked: place.bookmarked,
                }));

                setDestinationPlaces(placesFromAPI);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            style={styles.itemContainer}
            activeOpacity={0.7}
        >
            <Image source={{ uri: item.picture }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavoritePress(item.id)}>
                <Icon
                    name={item.bookmarked === 'true' ? 'heart' : 'heart-outline'}
                    size={24}
                    color="#ff0000"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const createFormData = (body) => {
        const data = new FormData();
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };

    const handleFavoritePress = (itemID) => {
        fetch('https://ahmadnurfais.my.id/react-native/neo-adventura/api?type=addBookmark', {
            method: 'POST',
            body: createFormData({ userID: 'USER001', destinationID: itemID }),
        }).then(response => response.json())
            .then(response => {
                console.log('Update response: ', response);
                if (response.success === true) {
                    Alert.alert('Update Successful', response.message);
                    setDestinationPlaces(prevPlaces =>
                        prevPlaces.map(place =>
                            place.id === itemID ? { ...place, bookmarked: place.bookmarked === 'true' ? 'false' : 'true' } : place
                        )
                    );
                } else {
                    Alert.alert('Update Failed', response.message);
                }
            })
            .catch(error => {
                console.log('Update error: ', error);
                Alert.alert('Update Failed', 'Network issue. Please try again.');
            });
    };

    return (
        <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
            <SearchBar
                placeholder="Search destinations..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.searchBarInput}
                inputStyle={styles.searchBarText}
            />
            <FlatList
                data={destinationPlaces.filter((place) =>
                    place.title.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: 16,
        marginTop: -5,
        marginBottom: -10,
    },
    searchBarInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
    },
    searchBarText: {
        color: 'black',
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    category: {
        fontSize: 16,
        color: 'green',
        marginTop: 8,
    },
    favoriteButton: {
        padding: 8,
    },
});

export default DestinationPlaces;
