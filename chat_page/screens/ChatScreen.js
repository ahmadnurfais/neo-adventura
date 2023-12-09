import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
  // Hardcoded dummy name and profile picture for demonstration purposes
  const dummyUsername = "Murphy Patrick";
  const dummyProfilePicture = "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  // Dummy data for chat messages
  const messages = [
    { id: 1, text: 'Hi there!', sender: 'Murphy' },
    { id: 2, text: 'Hello!', sender: 'User' },
    { id: 3, text: 'How can I help you today?', sender: 'Murphy' },
    { id: 4, text: 'I have a question about the destination.', sender: 'User' },
  ];

  // Handle header click
  const handleHeaderClick = () => {
    // You can navigate to the user's profile or perform other actions here
    // For example, navigate to a UserProfileScreen:
    navigation.navigate('UserProfileScreen', { username: dummyUsername, picture: dummyProfilePicture });
  };

  return (
    <View style={styles.container}>
      {/* User profile header */}
      <TouchableOpacity onPress={handleHeaderClick}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: dummyProfilePicture }} />
          <View>
            <Text style={styles.username}>{dummyUsername}</Text>
            {/* You can add additional user information here, such as status, last seen, etc. */}
          </View>
        </View>
      </TouchableOpacity>

      {/* Chat messages */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={item.sender === 'User' ? styles.userMessage : styles.otherMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      {/* Input field for typing messages */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#B2B2B2"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084FF', // User message background color
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA', // Other user message background color
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#0084FF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

export default ChatScreen;
