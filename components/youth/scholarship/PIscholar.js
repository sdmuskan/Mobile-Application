import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'; 

const PIscholar = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [dob, setEditedDOB] = useState('');
  const [qualification, setQualification] = useState('');
  const [gender, setGender] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const scrollViewRef = useRef();
  // const [editedDOB, setEditedDOB] = useState('');

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setDOB(date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      // Check if required fields are empty
      if (!fullName || !age || !email || !phoneNumber || !dob || !gender || !qualification || !description) {
        console.error('Please fill in all required fields');
        return;
      }
  
      // Save data to Firestore
      const docRef = await firestore().collection('Scholarship').add({
        fullName,
        age,
        email,
        phoneNumber,
        gender,
        description,
        dob,
        qualification,
      });
  
      // Get the document ID of the added data
      const docId = docRef.id;
  
      // Set success message
      setSubmitSuccess(true);
  
      // Navigate to 'FetchData' page with document ID as route parameter
      navigation.navigate('Fetchdata', { docId });
    } catch (error) {
      // console.error('Error saving data to Firestore:', error);
    }
  };
  
  
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
  
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" ref={scrollViewRef}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholderTextColor="darkgray" color="black" placeholder='Full Name' value={fullName} onChangeText={(text) => setFullName(text)} />

      <Text style={[styles.label, styles.extra]}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        color="black1"
        placeholderTextColor="darkgray"
        placeholder='Email'
      />

      <View style={styles.rowContainer}>
        <View style={styles.ageContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
            placeholderTextColor="darkgray"
            color="black"
            placeholder='Age'
          />
        </View>

        <View style={styles.phoneNumberContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
            placeholderTextColor="darkgray"
            color="black"
            placeholder='Phone'
          />
        </View>
      </View>

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={handleDOBChange}
        placeholder="Date of Birth (D-M-Y) "
        placeholderTextColor="gray"
        maxLength={10}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        customHeader={(headerProps) => (
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            {headerProps.children}
          </Text>
        )}
        headerTextIOS="Pick a Date"
        cancelTextIOS="Cancel"
        confirmTextIOS="Confirm"
      />


      


      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <RadioButton.Item
          label="Male"
          value="Male"
          status={gender === 'Male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Male')}
          
        />
        <RadioButton.Item
          label="Female"
          value="Female"
          status={gender === 'Female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Female')}
        />
        <RadioButton.Item
          label="Other"
          value="Other"
          status={gender === 'Other' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Other')}
        />
      </View>

      <Text style={styles.label}>Qualification</Text>
      <TextInput
        style={styles.input}
        value={qualification}
        onChangeText={(text) => setQualification(text)}
        color="black"
        placeholderTextColor="darkgray"
        placeholder='Qualification'
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        placeholderTextColor="darkgray"
        color="black"
        placeholder='Description'
        onChangeText={(text) => setDescription(text)}
        multiline
        onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      />
    {submitSuccess && (
  <Text style={styles.successMessage}>Submission successful! Thank you.</Text>
)}
      <View style={styles.submitButton}>
        <Text style={styles.btn} onPress={handleSubmit} >Submit</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  customStyles:{
    color:'black'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  extra: {
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageContainer: {
    flex: 1,
    marginRight: 10,
  },
  phoneNumberContainer: {
    flex: 1,
  },
  btn:{
    color:'white',
    fontSize:20
  },
  datePickerContainer: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 15,
    color: '#555',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  submitButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    marginBottom:150
  },
  successMessage: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor:'green',
    paddingVertical:10,
    borderWidth:5,
    borderColor:'white',
    borderRadius:50,
    paddingTop:10,
    marginBottom:10,
    fontSize:17,
    fontWeight:'900'
  },
  
});

export default PIscholar;
