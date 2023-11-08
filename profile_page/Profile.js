import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => alert('Back button pressed')}
        >
          <Icon2 name="arrow-back" size={20} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => alert('Notifications pressed')}
        >
          <Icon1 name="bell" size={20} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profilePictureContainer}>
          <Icon3 name="user-circle" size={100} style={styles.avatar} />
          <TouchableOpacity onPress={() => alert('Change Profile Picture')}>
            <Text style={styles.changeProfileText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileDetails}>Computer Science Student</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonShadow]}
          onPress={() => navigation.navigate('ManageProfile')}
        >
          <Icon1 name="settings" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Manage Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonShadow]}
          onPress={() => navigation.navigate('ReviewHistory')}
        >
          <Icon3 name="history" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Review History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonShadow]}
          onPress={() => navigation.navigate('SavedDestination')}
        >
          <Icon1 name="bookmark" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Saved Destination</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, styles.buttonShadow]}
          onPress={() => alert('Logout pressed')}
        >
          <Icon4 name="logout" size={20} style={styles.buttonIcon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
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
    backgroundColor: '#1167b1', 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  navButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    padding: 10,
    marginRight: 10,
  },
  notificationIcon: {
    color: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    marginBottom: 10,
    color: '#3498db',
  },
  changeProfileText: {
    color: 'blue',
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  profileDetails: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    padding: 15,
    borderRadius: 20,
    marginBottom: 30,
  },
  buttonIcon: {
    marginRight: 10,
    color: '#3498db',
  },
  buttonText: {
    fontSize: 18,
    color: '#3498db',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Profile;
