import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const BusinessDetailPage = ({ fullName, shopDetails, documents, redirectToKYCPage }) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      // console.error('Invalid URL:', url);
      return false;
    }
  };

  return (
     <TouchableOpacity onPress={redirectToKYCPage}>
  <View style={styles.businessDetails}>
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>Full Name:</Text>
      <Text style={styles.detailValue}>{fullName}</Text>
    </View>
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>Shop Details:</Text>
      <Text style={styles.detailValue}>{shopDetails}</Text>
    </View>
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>Documents:</Text>
    </View>
    <View style={styles.imgContainer}>
      {Array.isArray(documents) ? (
        documents.map((document, index) => (
          <View key={index} style={styles.documentItem}>
            {isValidUrl(document) ? (
              <Image source={{ uri: document }} style={styles.documentImage} />
            ) : (
              <Text style={styles.invalidDocument}>Invalid Document URL</Text>
            )}
          </View>
        ))
      ) : (
        <View style={styles.documentItem}>
          {isValidUrl(documents) ? (
            <Image source={{ uri: documents }} style={styles.documentImage} />
          ) : (
            <Text style={styles.invalidDocument}>Invalid Document URL</Text>
          )}
        </View>
      )}
    </View>
  </View>
    </TouchableOpacity>
  );
};

const BusinessDetailContainer = ({ navigation }) => {
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

  const { fullName, shopDetails, documents } = businessData;
  return (
   <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}>Business Details</Text>
      <BusinessDetailPage fullName={fullName} shopDetails={shopDetails}  documents={documents}  redirectToKYCPage={() => {
          navigation.navigate('KYCUserScreen');
        }}
      />
    </View>
    </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'black'
  },
  businessDetails: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontWeight: 'bold',
    color:'black'
  },
  detailValue: {
    marginTop: 4,
    color:'black'
  },
  documentItem: {
    marginRight: 10, // Add spacing between images
    flexDirection: 'row',
  },
  documentImage: {
    width: 70, // Adjust the width as needed
    height: 70, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 8,
    backgroundColor: 'blue',
    marginRight: 5,
    marginBottom:20
  },
  imgContainer: {
    flexDirection: 'row',
    marginTop: 10, // Adjust as needed
    alignItems: 'flex-start', // Align items at the start
    flexWrap: 'wrap', 
    marginBottom:10
  },
  
});


export default BusinessDetailContainer;
