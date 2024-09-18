import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const KYCUserScreen = ({ navigation }) => {
  const [businessData, setBusinessData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth().currentUser;

        if (user) {
          const businessRef = firestore().collection('BusinessListing').where('user', '==', user.uid);
          const snapshot = await businessRef.get();

          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              setBusinessData(doc.data());
            });
          } else {
            console.log('No business data found for the user');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchData();
  }, []);
  const { fullName} = businessData;
  const sendKYCRequest = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const db = firestore();
        await db.collection('KYCUnderProcess').add({
          userId: user.uid,
          userName: fullName, 
          status: 'pending',
        });
        Alert.alert(
          'Request Sent',
          'Your KYC request has been sent. Our customer care will contact you soon.'
        );
        navigation.navigate('BusinessProfile');
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error sending KYC request:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`Hi ${fullName || 'User'}, your KYC is not completed. Please complete your KYC.`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={sendKYCRequest}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color:'black'
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default KYCUserScreen;

