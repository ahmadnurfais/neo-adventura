import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define a functional component for the Profile screen
const Profile = ({ navigation }) => {
  return (
    // Outer container for the Profile screen
    <View style={styles.container}>

      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton} // Style for the back button
          onPress={() => alert('Back button pressed')}
        >
          <Icon name="chevron-left" size={20} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* User's profile information */}
      <View style={styles.profileInfo}>
        <View style={styles.profilePictureContainer}>
          <Icon name="user-circle" size={100} style={styles.avatar} />
          <TouchableOpacity onPress={() => alert('Change Profile Picture')}>
            <Text style={styles.changeProfileText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileDetails}>Computer Science Student</Text>
      </View>

      {/* Buttons for different profile actions */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonShadow]} // Added shadow to buttons
          onPress={() => navigation.navigate('ManageProfile')}
        >
          <Icon name="cog" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Manage Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonShadow]} // Added shadow to buttons
          onPress={() => navigation.navigate('ReviewHistory')}
        >
          <Icon name="history" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Review History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonShadow]} // Added shadow to buttons
          onPress={() => navigation.navigate('SavedDestination')}
        >
          <Icon name="bookmark" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Saved Destination</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, styles.buttonShadow]} // Added shadow to the logout button
          onPress={() => alert('Logout pressed')}
        >
          <Icon name="sign-out" size={20} style={styles.buttonIcon} />
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
  },
  navButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  profileDetails: {
    fontSize: 20,
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
