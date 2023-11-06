import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Define a functional component for the Bookmarks screen
const Bookmarks = () => {
  // State variables for managing bookmarks and the delete modal
  const [bookmarkedDestinations, setBookmarkedDestinations] = useState([
    { id: '1', name: 'Sungai Tamborasi' },
    { id: '2', name: 'Tanjung Malaha' },
    { id: '3', name: 'Pulau Padamarang' },
    { id: '4', name: 'Pantai Kalomang' },
    { id: '5', name: 'Tanjung Kayu Angin' },
    { id: '6', name: 'Permandian Kea-Kea' },
    // Add more bookmarks as needed
  ]);

  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();
  const flatListRef = useRef();

  // Handle deleting a bookmark
  const handleDeleteBookmark = () => {
    if (selectedBookmark) {
      setBookmarkedDestinations((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.id !== selectedBookmark.id)
      );
      setIsModalVisible(false);
    }
  };

  // Function to open the delete modal and scroll to the middle of the FlatList
  const openModal = (bookmark) => {
    setSelectedBookmark(bookmark);
    setIsModalVisible(true);
    // Scroll to the middle of the FlatList
    flatListRef.current.scrollToOffset({ offset: flatListRef.current.scrollHeight / 4 });
  };

  return (
    // Outer container for the Bookmarks screen
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Saved Destinations</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={bookmarkedDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Individual bookmark item
          <View style={styles.bookmarkItem}>
            <Text style={styles.bookmarkName}>{item.name}</Text>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Ionicons name="ellipsis-vertical" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Delete Bookmark Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => handleDeleteBookmark()}>
            <Text style={styles.modalText}>Remove Bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Change the background color to white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#1167b1',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  bookmarkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#333',
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
});

export default Bookmarks;
