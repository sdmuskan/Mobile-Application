import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';


const BusinessProfile = () => {
  const [businessListings, setBusinessListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBusinessListings = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const businessListingRef = firebase.firestore().collection('BusinessListing');
          const query = businessListingRef.where('user', '==', user.uid);
          const querySnapshot = await query.get();
          const listings = [];
          querySnapshot.forEach((doc) => {
            const businessData = doc.data();
            listings.push(businessData);
          });
          setBusinessListings(listings);
        }
      } catch (error) {
        console.error('Error getting business listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessListings();
  }, []);
  const handleBusinessSelection = (kycStatus) => {
    if (kycStatus === 'pending') {
      navigation.navigate('KYCUserScreen');
    } else if (kycStatus === 'completed') {
      navigation.navigate('VendorPage');
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {loading && <Text>Loading business listings...</Text>}
          {!loading && businessListings.length === 0 && <Text>No business listings found.</Text>}
          {!loading && businessListings.length > 0 && (
            <View>
              <Text style={styles.heading}>Your Business Listings</Text>
              {businessListings.map((businessData, index) => (
                <TouchableOpacity
                  style={styles.businessContainer}
                  key={index}
                  onPress={() => handleBusinessSelection(businessData.kycStatus)}
                >
                  <Image
                    source={{ uri: businessData.profileImage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.shopName}>{businessData.shopDetails}</Text>
                    <Text style={styles.fullName}>{businessData.fullName}</Text>
                    <Text style={styles.kycStatus}>{businessData.kycStatus}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
     color: '#2F4F4F',
  },
  businessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF', 
    padding: 10, 
    borderRadius: 8, 
    elevation: 3, 
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  fullName: {
    fontSize: 16,
    color: 'gray',
  },
  shopName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5F9EA0',
  },
  kycStatus: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'green',
  },
});

export default BusinessProfile;
