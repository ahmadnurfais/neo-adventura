// ConversationScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Conversations from './Conversations.js';
import SearchInput from '../components/SearchInput.js';
import { theme } from '../components/theme.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { fabStyles } from '../components/styles.js';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const ConversationScreen = () => {
  const navigation = useNavigation();  // Use useNavigation hook to get the navigation object

  const handleChatPress = () => {
    navigation.navigate('Chat');
  };
  

  return (
    <View style={{ backgroundColor: theme.colors.white, flex: 1 }}>
      <Conversations>
        <SearchInput />
        <TouchableOpacity onPress={handleChatPress} style={fabStyles.style}>
          <Icon name="chatbox-ellipses" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
      </Conversations>
    </View>
  );
};

export default ConversationScreen;
