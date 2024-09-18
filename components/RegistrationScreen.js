import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePhoneChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');

    const limitedText = formattedText.slice(0, 10);

    setPhone(limitedText);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleRegistration = async () => {
    if (!email || !phone || !password || !confirmPassword || !username) {
      setError('All fields are required');
      return;
    }
  
    try {
      const emailExists = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
  
      const phoneExists = await firestore()
        .collection('users')
        .where('phone', '==', phone)
        .get();
  
      if (!emailExists.empty) {
        setError('Email already in use');
        return;
      }
  
      if (!phoneExists.empty) {
        setError('Phone number already in use');
        return;
      }
  
      // Create user in Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
  
      // If user creation is successful
      if (user) {
        const newDocumentID = user.uid; // Use Firebase Authentication uid as Firestore document ID
  
        // Storing additional user details in Firestore
        await firestore().collection('users').doc(newDocumentID).set({
          uid: newDocumentID,
          email,
          phone,
          username,
        });
  
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        Alert.alert('Registration Successful', 'You can now log in with your credentials.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/logo.png')} // Replace with your image path
            style={styles.logo}
          />
          <Text style={styles.title}>Registration</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="darkgray"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="darkgray"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
      placeholder="Phone"
            placeholderTextColor="darkgray"
      value={phone}
      onChangeText={handlePhoneChange}
      style={styles.input}
      keyboardType="phone-pad"
      maxLength={10} // Limit the input to 10 characters
    />
          <View style={styles.passwordInputContainer}>
            <View style={styles.passwordInput}>
              <TextInput
                style={{ flex: 1 }} // Adjust the style of the TextInput as needed
                placeholder="Password"
                placeholderTextColor="darkgray"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={showPassword}
                color="black"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#6CB4EE"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.passwordInputContainer}>
            <View style={styles.passwordInput}>
              <TextInput
                style={{ flex: 1 }} // Adjust the style of the TextInput as needed
                placeholder="Confirm Password"
                placeholderTextColor="darkgray"
                color="black"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={showConfirmPassword}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#6CB4EE"
                />
              </TouchableOpacity>
            </View>
          </View>


          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={{ color: '#6CB4EE' }}>Already have an account? Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegistration} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f0ffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 150,
  },
  buttonText: {
    // backgroundColor: '#ccc',
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 25,
  },
  passwordInputContainer: {
    width: '80%',
    marginVertical: 10,
    color:'black'
  },
  passwordInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 10,
    alignItems: 'center',
    color:'black'
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default RegistrationScreen;
