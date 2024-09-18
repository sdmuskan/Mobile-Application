import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { firebase } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';

const UploadDocuments = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyC3Vul08-6P64cvGle6iriAQWnL6vCukkA",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "code-x-9acca",
    storageBucket: "https://console.firebase.google.com/project/code-x-9acca/storage/code-x-9acca.appspot.com/files",
    messagingSenderId: "980352751864",
    appId: "1:980352751864:android:38748c658a933e9865030d",
  };

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        if (!firebase.apps.length) {
          await firebase.initializeApp(firebaseConfig);
        }
        setFirebaseInitialized(true);
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        // Handle initialization error (show error message, etc.)
      }
    };

    initializeFirebase();
  }, []); // Initialize Firebase only once on component mount

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc],
      });

      console.log(result); // Check the console to see if the file information is logged correctly
      setSelectedFile({
        name: result.name,
        uri: result.uri,
        type: result.type,
        size: result.size,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('File selection canceled');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  const handleUpload = async () => {
    try {
      // Check if Firebase is initialized
      if (!firebaseInitialized) {
        Alert.alert('Firebase not initialized', 'Please wait while Firebase is initializing.');
        return;
      }

      // Check if a file is selected
      if (!selectedFile) {
        console.log('No file selected.');
        return;
      }

      // Check if URI is defined and is a string
      if (typeof selectedFile.uri !== 'string' || !selectedFile.uri.startsWith('file://')) {
        console.error('Invalid file URI:', selectedFile.uri);
        return;
      }

      // Reference to the file in Firebase Storage
      const fileRef = storage().ref(`files/${selectedFile.name}`);

      // Use react-native-fs to read the file content
      const fileContent = await RNFS.readFile(selectedFile.uri, 'base64');

      // Convert base64 to Blob
      const blob = await RNFS.blobUtil.createBlob(fileContent, { type: 'application/pdf' });

      // Upload the blob to Firebase Storage
      await fileRef.put(blob);

      // Get the download URL of the uploaded file
      const downloadURL = await fileRef.getDownloadURL();

      // Store file details in Firestore
      await firestore().collection('Notes').add({
        fileName: selectedFile.name,
        fileURL: downloadURL,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      console.log('File uploaded and details stored in Firestore successfully.');

      // Reset selectedFile after successful upload
      setSelectedFile(null);
    } catch (err) {
      console.error('Error uploading file and storing details in Firestore:', err);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {firebaseInitialized ? (
        <>
          <Button title="Pick File" onPress={handleFilePick} />
          {selectedFile && (
            <Button title="Upload File" onPress={handleUpload} />
          )}
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default UploadDocuments;
