import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const KYCManagementScreen = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = firestore();
        const snapshot = await db.collection('KYCUnderProcess').get();

        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsersList(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);
  const moveToCompleted = async (userId) => {
    try {
      const db = firestore();
      await db.collection('KYCCompleted').doc(userId).set({
        userId,
        status: 'completed',
      });
      await db.collection('KYCUnderProcess').doc(userId).delete();
      Alert.alert('Success', 'User KYC has been marked as completed.');
    } catch (error) {
      console.error('Error marking user KYC as completed:', error);
      Alert.alert('Error', 'Failed to mark user KYC as completed.');
    }
  };
  const moveToWaitingList = async (userId) => {
    try {
      const db = firestore();
      await db.collection('WaitingList').doc(userId).set({
        userId,
        status: 'waitingList',
      });
      await db.collection('KYCUnderProcess').doc(userId).delete();
      Alert.alert('Success', 'User moved to Waiting List.');
    } catch (error) {
      console.error('Error moving user to Waiting List:', error);
      Alert.alert('Error', 'Failed to move user to Waiting List.');
    }
  };
  const renderUserItem = ({ item }) => {
    return (
      <View style={styles.userItem}>
      <Text>{`Document ID: ${item.id}`}</Text> 
        <Text>{`User ID: ${item.userId}`}</Text>
        <Text>{`User Name: ${item.userName}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => moveToCompleted(item.userId)}>
          <Text style={styles.buttonText}>KYC Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => moveToWaitingList(item.userId)}>
          <Text style={styles.buttonText}>Waiting List</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KYC Under Process</Text>
      {usersList.length > 0 ? (
        <FlatList
          data={usersList}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
        />
      ) : (
        <Text>No users in KYC Under Process</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default KYCManagementScreen;
