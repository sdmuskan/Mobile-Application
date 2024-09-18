import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';

const Profile = ({ navigation }) => {
  const [language, setLanguage] = useState('English');
  const [userImage, setUserImage] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log('User data not found');
        }
      } else {
        console.log('No user signed in');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  // Function to handle changing the app language
  const handleLanguageChange = (selectedLanguage) => {
    // Code to change the app's language
    setLanguage(selectedLanguage);
    // In a real app, you might have logic to change the app's language based on selectedLanguage
    Alert.alert('Change Language', `App language changed to ${selectedLanguage}.`);
  };



  // Function to handle logging out
  

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        // Successfully logged out
        console.log('User signed out');
        // Reset the navigation stack and navigate to the Login page
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  // Function to handle editing the profile
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
   
  };

  

  // Memoized image component to efficiently render user image or a placeholder
  const UserImage = useMemo(() => {
    return (
      <Image
        source={userData?.profileImage ? { uri: userData.profileImage } : require('../assets/images/profile/no-profile.png')}
        style={styles.profileImage}
      />
    );
  }, [userData]);

  return (<SafeAreaView>
    <ScrollView>
  
    <View style={styles.container}>
      <View style={styles.header}>
        {UserImage}
        <View style={styles.buttonsContainer}>
         
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                <Image source={require('../assets/images/profile/profile-edit.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              
            </View>
          
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BusinessProfile')}>
              <Image source={require('../assets/images/profile/businessprofile.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Business Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BusinessListing')}>
              <Image source={require('../assets/images/profile/business-listing.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Business Listing</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Setting')}>
              <Image source={require('../assets/images/profile/setting.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
              <Image source={require('../assets/images/profile/about.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>About Us</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleLanguageChange('Spanish')}>
              <Image source={require('../assets/images/profile/language.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Change Language</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Image source={require('../assets/images/profile/logout.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </View>

    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 75,
    marginVertical: 30,
    borderColor:'#F1EFEF',
    borderWidth: 7,
    shadowColor: 'black', 
    shadowOffset: { width: 10, height: 12 }, 
    shadowOpacity: 0.9, 
    shadowRadius: 4, 
    
  },
  
  buttonsContainer: {
    alignItems: 'left',
    marginTop:20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 5,
    shadowColor: 'blue',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    marginBottom:6,
    borderBottomColor: 'rgb(30, 144, 255)',
    borderRadius:15
  },
  
  button: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2, 
    marginLeft:18,
  },
});

export default Profile;