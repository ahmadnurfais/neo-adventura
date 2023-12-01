// FriendsItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FriendItem = ({ name, description, picture, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.friend}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: picture }} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
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
  friend: {
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 18,
    color: 'blue',
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: 'gray',
  },
});

export default FriendItem;
