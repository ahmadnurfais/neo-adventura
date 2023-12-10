import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_BASE_URL } from '@env';

const DestinationPlaces = () => {
    const [destinationPlaces, setDestinationPlaces] = useState([]);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('user_id')
            .then((userId) => {
                console.log('User ID:', userId);
                if (userId) {
                    fetchData(userId); // Fetch data with user ID
                } else {
                    fetchData(null); // Fetch data without user ID
                }
            })
            .catch((error) => {
                console.error('AsyncStorage error:', error);
            });
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        AsyncStorage.getItem('user_id')
            .then((userId) => {
                if (userId) {
                    fetchData(userId)
                        .finally(() => setRefreshing(false)); // Fetch data with user ID
                } else {
                    fetchData(null)
                        .finally(() => setRefreshing(false)); // Fetch data without user ID
                }
            })
            .catch((error) => {
                console.error('AsyncStorage error:', error);
                setRefreshing(false);
            });
    };

    const fetchData = (userId) => {
        let url = `${API_BASE_URL}?type=get`;
        if (userId !== null) {
            url = `${API_BASE_URL}?type=getWithBookmark&id=${userId}`;
        }

        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const placesFromAPI = data.result.map((place) => ({
                    user_id: userId,
                    id: place.id_tempat_wisata,
                    title: place.nama_wisata,
                    address: place.alamat,
                    picture: `data:image/jpeg;base64,${place.picture1}`,
                    category: place.kategori,
                    bookmarked: place.bookmarked,
                    isLoading: false,
                }));

                setDestinationPlaces(placesFromAPI);
                setIsLoading(false);
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
            {item.isLoading ? (
                <ActivityIndicator size="large" color="#1e2c3a" />
            ) : (
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => item.user_id !== null ? toggleBookmark(item.user_id, item) : Alert.alert('Oops!', 'This feature is only available for logged-in users. Create your own account now!')}
                >
                    <Icon
                        name={item.bookmarked === 'true' ? 'heart' : 'heart-outline'}
                        size={24}
                        color="#ff0000"
                    />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );

    const createFormData = (body) => {
        const data = new FormData();
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };

    const toggleBookmark = async (userId, item) => {
        const isCurrentlyBookmarked = item.bookmarked === 'true';
        const newBookmarkStatus = !isCurrentlyBookmarked;

        // Update UI optimistically
        setDestinationPlaces(prevPlaces =>
            prevPlaces.map(place =>
                place.id === item.id ? { ...place, isLoading: true } : place
            )
        );

        try {
            let response;
            if (newBookmarkStatus) {
                // Add bookmark
                response = await fetch(`${API_BASE_URL}?type=addBookmark`, {
                    method: 'POST',
                    body: createFormData({ userID: userId, destinationID: item.id }),
                });
            } else {
                // Delete bookmark
                response = await fetch(`${API_BASE_URL}?type=deleteBookmark&userID=${userId}&destinationID=${item.id}`, { method: 'POST' });
            }

            const responseData = await response.json();
            console.log('Bookmark update response: ', responseData);

            // Update isLoading to false for all cases
            setDestinationPlaces(prevPlaces =>
                prevPlaces.map(place =>
                    place.id === item.id ? { ...place, isLoading: false } : place
                )
            );

            if (responseData.success === true) {
                // Update the bookmark status based on the operation performed
                setDestinationPlaces(prevPlaces =>
                    prevPlaces.map(place =>
                        place.id === item.id ? { ...place, bookmarked: newBookmarkStatus ? 'true' : 'false' } : place
                    )
                );
                Alert.alert(newBookmarkStatus ? 'Bookmarked Successfully' : 'Bookmark Deleted Successfully', responseData.message);
            } else {
                Alert.alert('Failed', responseData.message);
            }
        } catch (error) {
            console.error('Error updating bookmark:', error);
            Alert.alert('Error', 'An error occurred while updating the bookmark');
        }
    };

    return (
        <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
            {isLoading ? (
                // eslint-disable-next-line react-native/no-inline-styles
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#1e2c3a" />
                </View>
            ) : (
                <>
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
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </>
            )}
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
        color: '#efa663',
        marginTop: 8,
    },
    favoriteButton: {
        padding: 8,
    },
});

export default DestinationPlaces;
