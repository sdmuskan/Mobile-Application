// Doctor.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,

} from 'react-native';

import firestore from '@react-native-firebase/firestore'; // Import Firebase Firestore

const servicesList =  ['Carpet Cleaning',
'Furniture Assembly',
'Grocery Delivery',
'Handyman Services',
'Home Organization',
'House Cleaning',
'Interior Design',
'Laundry Services',
'Lawn Care',
'Moving Services',
'Pest Control',
'Window Cleaning']



const HomeService = ({ navigation }) => {
  const [isScannerOpen, setScannerOpen] = useState(false);


  
  const handleServiceSelection = async (selectedService) => {
    try {
      console.log('Selected Service:', selectedService);
  
      const businessSnapshot = await firestore()
        .collection('BusinessListing')
        .where('addedServices', 'array-contains', selectedService)
        .get();
  
      const businessDetails = businessSnapshot.docs
        .map((doc) => doc.data())
        .filter((business) => business.addedServices.includes(selectedService));
  
      console.log('Fetched Business Details:', businessDetails);
  
      navigation.navigate('ServiceDetailsScreen', {
        service: selectedService,
        businessDetails,
      });
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  

  return (
    <SafeAreaView style={styles.safeArea}>
     
     
        <View style={styles.container}>
          <FlatList
            data={servicesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleServiceSelection(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
                {/* <Icon name="arrow-right" size={20} color="#ffffff" style={styles.icon} /> */}
                <Text style={styles.arrowIcon}>{'➤'}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
     

     

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
    marginBottom: 60,
    marginTop: 30,
  },
safeArea: {
    flex: 1,
  },
  button: {
    backgroundColor: '#3772ff',
    padding: 20,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 5, 
    borderBottomColor: '#3943b7', 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5,
  },  
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // icon: {
  //   marginRight: 10, 
  // },
  arrowIcon: {
    fontSize: 22,
    marginRight: 5,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#df2935', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2, 
  },
  
    // footer style
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
    footerItem: {
        alignItems: 'center',
        position:'absolute'
    },
    iconTextContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    footerText: {
      marginTop: 5,
      color: 'blue',
      textAlign: 'center',
    },
    
});

export default HomeService;
