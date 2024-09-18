import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Snackbar from 'react-native-snackbar'; 
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, navigate to the Home page
        navigation.replace('Home');
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigation]);
  const handleLogin = async () => {
    try {
      // Field validation
      if (!email.trim() || !password.trim()) {
        Snackbar.show({
          text: 'Please enter both email/username and password.',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
  
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      if (user) {
        // Check if the user data exists in Firestore
        const userRef = firestore().collection('users').doc(user.uid);
        const snapshot = await userRef.get();
  
        if (snapshot.exists) {
          // User data found, navigate to home screen
          navigation.navigate('Home');
          Snackbar.show({
            text: 'Login successful!',
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          // User data not found in Firestore
          Snackbar.show({
            text: 'User data not found',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        // Handle invalid email format without showing an error message
        // console.error('Invalid email or password');
        Snackbar.show({
          text: 'Invalid email or password',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        // console.error('Login error:', error.code, error.message);
        Snackbar.show({
          text: 'Login failed. Please check your email and password.',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  };
  

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };

  const handleOTPLogin = () => {
    // Implement OTP login functionality here
    navigation.navigate('LoginWithOTP');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} // Replace with the correct path to your image
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="darkgray"  // Set the placeholder text color
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="darkgray"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#6CB4EE" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={{ color: '#6CB4EE' }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={{ color: '#6CB4EE' }}>Create new account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOTPLogin}>
        <Text style={{ color: '#6CB4EE' }}>Login with OTP</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Match the color with the registration screen's title
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000', // Match the color with the registration screen's input text
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  passwordInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'contain', // Or 'cover', 'stretch', etc. based on your preference
    marginTop: -180,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
});




export default LoginScreen;