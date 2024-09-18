
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      setResetMessage('Reset password link sent successfully.');
      console.log(`Reset password link sent to: ${email}`);
    } catch (error) {
      setResetMessage(`Error sending reset email: ${error.message}`);
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} // Replace with the correct path to your image
        style={styles.logo}
      />
      <Text>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="darkgray"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      {resetMessage ? <Text>{resetMessage}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#6CB4EE' }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0ffff',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginTop:20,
    borderRadius:10,
    color:'black'
  },
  button: {
     backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
   logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'contain', // Or 'cover', 'stretch', etc. based on your preference
    marginTop: -180,
  },
});

export default ForgotPasswordScreen;
