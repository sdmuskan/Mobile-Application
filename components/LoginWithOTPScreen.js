import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth'; // Import Firebase authentication module

const LoginWithOTPScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);

  const handlePhoneVerification = async () => {
    try {
      const fullPhoneNumber = `+91${phoneNumber}`; // Assuming India country code '+91', modify according to your country code
      const confirmationResult = await auth().signInWithPhoneNumber(fullPhoneNumber);
      setConfirmation(confirmationResult);
      Alert.alert('OTP Sent', 'Please enter the OTP received.');
    } catch (error) {
      console.error('OTP Verification Request Error:', error.code, error.message);
      setError('OTP Verification Request failed. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (!confirmation) {
        Alert.alert('Error', 'Please request OTP first.');
        return;
      }

      const credential = auth.PhoneAuthProvider.credential(
        confirmation.verificationId,
        verificationCode
      );

      await auth().signInWithCredential(credential);
      navigation.navigate('Home'); // Replace 'Home' with your desired destination
    } catch (error) {
      console.error('OTP Verification Error:', error.code, error.message);
      setError('OTP Verification failed. Please enter the correct OTP.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/logo.png')} // Replace with the correct path to your image
          style={styles.logo}
        />
        <Text style={styles.title}>Enter Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
            placeholderTextColor="darkgray"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <TouchableOpacity onPress={handlePhoneVerification} style={styles.button}>
          <Text style={styles.buttonText}>Request OTP</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="OTP"
            placeholderTextColor="darkgray"
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleVerifyOTP} style={styles.button}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ffff',
  },
  scrollView: {
    
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color:'black'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});


export default LoginWithOTPScreen;
