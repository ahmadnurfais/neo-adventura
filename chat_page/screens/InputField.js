import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../components/theme.js';

const InputField = ({ placeholder }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // Implement your logic to send the message
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <Icon name="send" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',  
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',  
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default InputField;
