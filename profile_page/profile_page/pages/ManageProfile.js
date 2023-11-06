import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Define a functional component for the ManageProfile screen
const ManageProfile = () => {
  const navigation = useNavigation();

  // State variables for managing username and description
  const [username, setUsername] = useState('John Doe');
  const [description, setDescription] = useState('Computer Science Student');

  // Handle saving changes to the profile
  const handleSaveChanges = () => {
    console.log('New username:', username);
    console.log('New description:', description);
    navigation.goBack();
  };

  return (
    // Outer container for the ManageProfile screen
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Manage Profile</Text>
      </View>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Enter your username"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.multilineInput}
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={4}
        placeholder="Enter your description"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveChanges}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20, 
  },
  input: {
    height: 50,
    borderColor: '#1167b1',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 20, 
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#1167b1',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 20, 
  },
  saveButton: {
    backgroundColor: '#1167b1',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20, 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageProfile;
