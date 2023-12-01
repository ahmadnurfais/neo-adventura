import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import ConversationItem from './ConversationItem.js';
import { useNavigation } from '@react-navigation/native';

const Conversations = () => {
  const navigation = useNavigation();

  const handleChatPress = (username, picture) => {
    navigation.navigate('Chat', { username, picture });
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => handleChatPress("Murphy Patrick", "https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")}>
        <ConversationItem
          picture="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          username="Murphy Patrick"
          bio="Adventurous soul exploring life's wonders."
          lastMessage="Sure, I'll be there in 10 minutes."
          time="5:30 PM"
          notification="3"
          isBlocked
          isMuted
          hasStory
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleChatPress("Mark James", "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")}>
        <ConversationItem
          picture="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          username="Mark James"
          bio="Tech enthusiast and coffee lover."
          lastMessage="How's your day going?"
          time="3:45 PM"
          notification="1"
          isBlocked
          isMuted
          hasStory
        />
      </TouchableOpacity>
      {/* Repeat the same for other conversation items */}
    </ScrollView>
  );
};

export default Conversations;
