/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { API_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const Bookmarks = () => {
    const [userID, setUserID] = useState(null);
    const [bookmarksData, setBookmarksData] = useState([]);
    const [isNoData, setIsNoData] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('user_id').then((value) => {
            if (value !== null) {
                setUserID(value);
            }
        });
    }, []);

    const getBookmarks = async () => {
        if (userID) {
            try {
                const response = await axios.get(`${API_BASE_URL}?type=getBookmarks&userID=${userID}`);
                const data = response.data.result;
                if (data && data.length > 0 && !data[0].error) {
                    setBookmarksData(data);
                    setIsNoData(false);
                    setIsLoading(false);
                } else {
                    console.log('No bookmarks data found.');
                    setIsNoData(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
                setIsNoData(true);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            getBookmarks();
        }, [userID])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getBookmarks().then(() => setRefreshing(false));
    }, [userID]);

    const deleteBookmark = async (userId, destinationId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}?type=deleteBookmark&userID=${userId}&destinationID=${destinationId}`);

            console.log(response.data);

            if (response.data.success === true) {
                onRefresh();
                Alert.alert('Success', 'Bookmark deleted successfully');
            } else {
                Alert.alert('Failed', 'Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error deleting bookmark:', error);
            Alert.alert('Error', 'An error occurred while deleting the bookmark');
        }
    };

    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const flatListRef = useRef();

    const handleDeleteBookmark = () => {
        if (selectedBookmark) {
            deleteBookmark(userID, selectedBookmark.destination_id);
            setIsModalVisible(false);
        }
    };

    const openModal = (bookmark) => {
        setSelectedBookmark(bookmark);
        setIsModalVisible(true);
        flatListRef.current.scrollToOffset({ offset: bookmark.id * 100 });
    };

    const CustomModal = ({ isVisible, onClose, onConfirm }) => (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalView}>
                <TouchableOpacity onPress={onConfirm}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Remove Bookmark</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.modalText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

    const UserNotLogin = () => {
        return (
            <View style={styles_d.container}>
                <Text style={styles_d.infoText}>
                    This page can only be accessed by users who have <Text style={{ fontWeight: 'bold' }}>logged</Text> in to their accounts.
                    {'\n\n'}
                    Please <Text style={{ fontWeight: 'bold' }}>login</Text> first, or if you do not have an account yet, please <Text style={{ fontWeight: 'bold' }}>create</Text> it through the following register button.
                </Text>
                <TouchableOpacity style={styles_d.button} onPress={() => { navigation.navigate('Login'); }}>
                    <Text style={styles_d.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles_d.button} onPress={() => { navigation.navigate('Register'); }}>
                    <Text style={styles_d.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {userID === null ? (
                <UserNotLogin />
            ) : (
                <View style={styles.container}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#0400f4" />
                    ) : isNoData ? (
                        <ScrollView
                            contentContainerStyle={styles.noDataView}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <Text style={styles.noDataText}>There are no bookmarks data</Text>
                        </ScrollView>
                    ) : (
                        <>
                            <View style={{ marginTop: 25 }} />
                            <FlatList
                                ref={flatListRef}
                                data={bookmarksData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.bookmarkItem}>
                                        <View style={{ flex: 1, marginRight: 10 }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.destination_id })}>
                                                <Text style={styles.bookmarkName}>{item.name}</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.bookmarkInfo}>{item.alamat}</Text>
                                            <Text style={styles.bookmarkCategory}>{item.kategori}</Text>
                                        </View>
                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${item.picture}` }}
                                            style={styles.bookmarkImage}
                                        />
                                        <TouchableOpacity onPress={() => openModal(item)}>
                                            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                        </>
                    )}
                    <CustomModal
                        isVisible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        onConfirm={handleDeleteBookmark}
                    />
                </View>
            )}
        </>
    );
};

const styles_d = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    infoText: {
        fontSize: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#007bff',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'flex-start',
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
    },
    bookmarkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        elevation: 5,
    },
    bookmarkName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    bookmarkInfo: {
        fontSize: 16,
        color: '#333',
    },
    bookmarkCategory: {
        fontSize: 15,
        color: '#1e2c3a',
    },
    bookmarkImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    noDataView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        color: '#333',
    },
});

export default Bookmarks;
