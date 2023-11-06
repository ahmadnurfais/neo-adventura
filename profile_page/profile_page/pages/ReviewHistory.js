import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Define a functional component for the ReviewHistory screen
const ReviewHistory = () => {
  // State variables for managing reviews and the edit modal
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Use useEffect to fetch mock reviews when the component mounts
  useEffect(() => {
    // Mock reviews
    const mockReviews = [
      { id: '1', title: 'Sungai Tamborasi', content: 'Breathtaking views and crystal clear waters. An amazing experience!', rating: 5 },
      { id: '2', title: 'Tanjung Malaha', content: 'Had a great time exploring, but the trails were a bit confusing. Would recommend a tour guide.', rating: 4 },
      { id: '3', title: 'Pulau Padamarang', content: 'Lovely island with stunning beaches. Snorkeling here was fantastic!', rating: 5 },
      { id: '4', title: 'Pantai Kalomang', content: 'Beautiful beach, but could use better facilities for visitors.', rating: 3 },
      { id: '5', title: 'Puncak Kayangan Kolaka', content: 'A challenging hike, but the panoramic views from the top are absolutely worth it.', rating: 4 },
      { id: '6', title: 'Tanjung Kayu Angin', content: 'Peaceful and serene spot. Great for a relaxing day out.', rating: 4 },
      { id: '7', title: 'Goa Firdaus', content: 'The cave formations are stunning. A must-visit for adventure seekers.', rating: 4 },
      { id: '8', title: 'Permandian Kea-Kea', content: 'A refreshing natural spring. Perfect for a quick dip and relaxation.', rating: 4 }
    ];
    setReviews(mockReviews);
  }, []);

    // Handle editing a review
    const handleEditReview = (review) => {
      setSelectedReview(review);
      setModalVisible(true);
    };
  
    // Handle deleting a review
    const handleDeleteReview = (reviewId) => {
      setReviews(reviews.filter(review => review.id !== reviewId));
    };
  
    // Handle saving an edited review
    const handleSaveReview = (editedReview) => {
      setReviews(reviews.map(review => (review.id === editedReview.id ? editedReview : review)));
      setModalVisible(false);
    };
  
    return (
      // Outer container for the ReviewHistory screen
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Review History</Text>
        </View>
  
        {/* FlatList to display reviews */}
        <FlatList
          data={reviews}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            // Individual review item
            <View style={styles.reviewItem}>
              <View style={styles.reviewContentContainer}>
                <Text style={styles.reviewTitle}>{item.title}</Text>
                <Text style={styles.reviewContent}>{item.content}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.reviewRating}>Rating:</Text>
                  <Text style={styles.ratingValue}>{item.rating}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleEditReview(item)}>
                <Icon name="ellipsis-vertical" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        />
  
        {/* Edit Review Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Review</Text>
            <TextInput
              value={selectedReview?.title}
              onChangeText={(text) => setSelectedReview({ ...selectedReview, title: text })}
              style={styles.input}
              placeholder="Edit Title"
            />
            <TextInput
              value={selectedReview?.content}
              onChangeText={(text) => setSelectedReview({ ...selectedReview, content: text })}
              style={[styles.input, styles.multilineInput]}
              placeholder="Edit Content"
              multiline
            />
            <TextInput
              value={selectedReview?.rating.toString()}
              onChangeText={(text) => setSelectedReview({ ...selectedReview, rating: parseInt(text) })}
              style={styles.input}
              placeholder="Edit Rating"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveReview(selectedReview)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    color: 'white',
  },
  reviewItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    marginHorizontal: 20,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  reviewContentContainer: {
    flex: 1,
  },
  reviewContent: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  reviewRating: {
    fontSize: 16,
    color: 'green',
    marginRight: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 16,
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#e53935',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReviewHistory;
