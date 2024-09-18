import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Fetchdata = ({ route }) => {
  const { docId } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore().collection('Scholarship').doc(docId).get();

        if (documentSnapshot.exists) {
          setData(documentSnapshot.data());
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, [docId]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{data.fullName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{data.age}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{data.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{data.phoneNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{data.description}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{data.dob}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{data.gender}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Qualification:</Text>
        <Text style={styles.value}>{data.qualification}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#555',
  },
});

export default Fetchdata;
