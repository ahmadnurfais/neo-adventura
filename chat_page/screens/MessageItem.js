import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../components/theme';

const MessageItem = ({ text, sender }) => {
  const isUser = sender === 'User';

  return (
    <View style={[styles.container, isUser ? styles.userMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.primary,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.white, // Use white for other user's messages
  },
  messageText: {
    fontSize: 16,
    color: theme.black, // Use black for message text
  },
});

export default MessageItem;
