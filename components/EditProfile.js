import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const UserProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedDOB, setEditedDOB] = useState('');


  const handleDOBChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, ''); 
    if (cleanedText.length <= 8) {
      let formattedDOB = '';
  
      if (cleanedText.length >= 1) {
        formattedDOB += `${cleanedText.slice(0, 2)}`;
      }
      if (cleanedText.length >= 1) {
        formattedDOB += `-${cleanedText.slice(2, 4)}`;
      }
      if (cleanedText.length > 1) {
        formattedDOB += `-${cleanedText.slice(4, 8)}`;
      }
  
      setEditedDOB(formattedDOB);
    } else {
      setEditedDOB(cleanedText.slice(0, 8));
    }
  };
  
  

  
  
  
  
  const handleImageSelect = async () => {
    try {
      const image = await ImagePicker.openPicker({ mediaType: 'photo' });

      const currentUser = auth().currentUser;
      if (currentUser) {
        const reference = storage().ref(`/profileImages/${currentUser.uid}`);
        await reference.putFile(image.path);
        const imageURL = await reference.getDownloadURL();
        setImageUrl(imageURL);
        await firestore().collection('users').doc(currentUser.uid).update({ profileImage: imageURL });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(userData.username);
    setEditedPhone(userData.phone);
    setEditedDOB(userData.dob);
    setEditedAddress(userData.address);
  };

  const handleSave = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.log('No user signed in');
        return;
      }

      await firestore().collection('users').doc(currentUser.uid).update({
        username: editedName,
        phone: editedPhone,
        dob: editedDOB,
        address: editedAddress,
      });

      setIsEditing(false);
      setUserData({
        ...userData,
        username: editedName,
        phone: editedPhone,
        dob: editedDOB,
        address: editedAddress,
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    const fetchUserDataAndImage = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
            setImageUrl(userDoc.data().profileImage);
            setEditedName(userDoc.data().username);
            setEditedPhone(userDoc.data().phone);
            setEditedDOB(userDoc.data().dob);
            setEditedAddress(userDoc.data().address);
          } else {
            console.log('User data not found');
          }
        } else {
          console.log('No user signed in');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndImage();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {userData ? (
            <View style={styles.profileContainer}>
               <TouchableOpacity onPress={handleImageSelect}>
                <View style={styles.imageContainer}>
                {imageUrl ? ( // Check if imageUrl exists
                <Image source={{ uri: imageUrl }} style={styles.profileImage} />
              ) : (
                    <Text>Add Photo</Text>
                  )}
                </View>
              </TouchableOpacity>
              <Text style={[styles.headerText, { color: 'black' }]}>User Profile</Text>
              {isEditing ? (
                <View>
                  <TextInput
                    style={styles.inputField}
                    value={editedName}
                    onChangeText={(text) => setEditedName(text)}
                    placeholderTextColor="gray" // Set placeholder text color here
                  />

                  <TextInput
                    style={styles.inputField}
                    value={editedPhone}
                    onChangeText={(text) => setEditedPhone(text)}
                    placeholderTextColor="gray" // Set placeholder text color here
                  />

                  <TextInput
                        style={styles.inputField}
                        value={editedDOB}
                        onChangeText={handleDOBChange}
                        placeholder="Date of Birth (D-M-Y) "
                        placeholderTextColor="gray"
                        maxLength={10} // Limit the input length
                      />

                  <TextInput
                    style={styles.inputField}
                    value={editedAddress}
                    onChangeText={(text) => setEditedAddress(text)}
                    placeholder="Address"
                    placeholderTextColor="gray"
                  />

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.save} onPress={handleSave}>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                 

                  <View style={styles.editableField}>
                    <ScrollView horizontal>
                      <Text style={[styles.userInfo, { color: 'black' }]}>Email: </Text>
                      <Text  style={[styles.userInfo, { color: 'gray' ,marginLeft:-20}]}>{userData.email}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={handleEdit} disabled={true} style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 20, marginHorizontal: 7, transform: [{ rotate: '45deg' }] }}>🚫</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.editableField}>
                    <ScrollView horizontal>
                      <Text style={[styles.userInfo, { color: 'black' }]}>Name :</Text>
                      <Text  style={[styles.userInfo, { color: 'gray' ,marginLeft:-10}]}>{userData.username}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={{ fontSize: 20, marginHorizontal: 7, transform: [{ rotate: '90deg' }] }}>✏️</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.editableField}>
                    <ScrollView horizontal>
                      <Text style={[styles.userInfo, { color: 'black' }]}>Phone:</Text>
                      <Text  style={[styles.userInfo, { color: 'gray' ,marginLeft:-10}]}>{userData.phone}</Text>
                    </ScrollView>
                    
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={{ fontSize: 20, marginHorizontal: 7, transform: [{ rotate: '90deg' }] }}>✏️</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.editableField}>
                    <ScrollView horizontal>
                      <Text style={[styles.userInfo, { color: 'black' }]}>DOB  :</Text>
                      <Text  style={[styles.userInfo, { color: 'gray' ,marginLeft:-10}]}>{userData.dob}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={{ fontSize: 20, marginHorizontal: 7, transform: [{ rotate: '90deg' }] }}>✏️</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.editableField}>
                    <ScrollView horizontal>
                        <Text style={[styles.userInfo, { color: 'black' }]}>Addrs:</Text>
                        <Text  style={[styles.userInfo, { color: 'gray' ,marginLeft:-10}]}>{userData.address}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={{ fontSize: 20, marginHorizontal: 7, transform: [{ rotate: '90deg' }] }}>✏️</Text>
                    </TouchableOpacity>
                  </View>
 
                </>
              )}
            </View>
          ) : (
            <Text>No user data found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal:20,
    fontFamily:'monospace',   

  },
  editableField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop:10,
    backgroundColor:'#fff',
    borderRadius:4,
    borderColor:'#fff',
    borderWidth:1,
    elevation: 5, 
    shadowColor:'#000fff',
    shadowOpacity:0.8,
    shadowRadius:4,
  },
  editIcon: {
    alignSelf: 'flex-end',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginBottom: 10,
    width: '100%',
    color:'#000',
    backgroundColor:'#fff',
    width:'100',
    borderRadius:10,
    fontSize:20,
    paddingStart:20,
    fontWeight:'600',
    marginTop:15,
    borderColor:'#fff',
    fontFamily:'monospace'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  save: {
    borderWidth: 5,
    borderColor: 'white',
    padding: 8,
    width: '40%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
    elevation: 5, 
    backgroundColor:'green',
    shadowColor:'#000fff',
    shadowOpacity:0.8,
    shadowRadius:4,
  },
  cancel: {
    borderWidth: 5,
    borderColor: 'white',
    padding: 8,
    width: '40%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
    elevation: 5, 
    backgroundColor:'red',
    shadowColor:'#000fff',
    shadowOpacity:0.8,
    shadowRadius:4,
  },
});

export default UserProfileScreen;