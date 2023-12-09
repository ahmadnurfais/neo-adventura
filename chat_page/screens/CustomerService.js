import React from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import MessageItem from './MessageItem';
import { theme } from '../components/theme';
import { commonStyles } from './ChatScreen'; // Import common styles

const CustomerScreen = () => {
  // Dummy data for messages, replace it with your actual data
  const messages = [
    { id: 1, text: 'Hello!', sender: 'customer' },
    { id: 2, text: 'Hi there!', sender: 'support' },
    // Add more messages as needed
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.map((message) => (
          <MessageItem key={message.id} text={message.text} sender={message.sender} />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={theme.colors.light}
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
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomerScreen;
