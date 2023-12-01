import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FriendItem from './FriendsItem';

const FriendsScreen = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchText);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Friends"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FriendItem
        name="Murphy Patrick"
        description="Adventurous soul exploring life's wonders."
        picture="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <FriendItem
        name="Mark James"
        description="Tech enthusiast and coffee lover."
        picture="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <FriendItem
        name="Nina Gomez"
        description="Description for Friend 3."
        picture="https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <FriendItem
        name="Jack Randolph"
        description="Description for Friend 4."
        picture="https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <FriendItem
        name="Stephany Garcia"
        description="Description for Friend 5."
        picture="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      {/* Add more FriendItems as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5', // Change this to your desired background color
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#3498db', // Change this to your desired button color
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff', // Change this to your desired text color
  },
});

export default FriendsScreen;
