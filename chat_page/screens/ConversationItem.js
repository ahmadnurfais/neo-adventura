import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../components/theme.js';

const ConversationItem = ({ picture, username, bio, lastMessage, time, isBlocked, isMuted, notification, hasStory }) => {
  const navigation = useNavigation();

  const showStoryCircle = () => {
    if (hasStory) {
      return {
        borderColor: theme.colors.storyBorder,
        borderWidth: 2,
      };
    }
  };

  const handleChatPress = () => {
    navigation.navigate('Chat', { params: { username, picture } });
  };

  const showNotification = (type) => {
    if (notification && type === 'number') {
      return (
        <View style={styles.notificationContainer}>
          <View style={styles.notificationCircle}>
            <Text style={styles.notification}>{notification}</Text>
          </View>
        </View>
      );
    } else if (notification && type === 'imageCircle') {
      return {
        borderColor: theme.colors.primary,
      };
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleChatPress}>
      <View style={styles.conversation}>
        <TouchableOpacity style={[styles.imageContainer, showStoryCircle()]}>
          <Image style={styles.image} source={{ uri: picture }} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View style={styles.usernameContainer}>
            <Text numberOfLines={1} style={styles.username}>
              {username}
            </Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{lastMessage}</Text>
            {showNotification('number')}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  conversation: {
    flexDirection: 'row',
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 10,
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
    borderRadius: 25,
    height: 50,
    width: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  username: {
    flex: 1,
    fontSize: theme.fontSize.title,
    color: theme.colors.title,
  },
  message: {
    flex: 1,
    fontSize: theme.fontSize.message,
    color: theme.colors.subTitle,
  },
  time: {
    fontSize: theme.fontSize.subTitle,
    color: theme.colors.subTitle,
    fontWeight: '300',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  notificationCircle: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default ConversationItem;
