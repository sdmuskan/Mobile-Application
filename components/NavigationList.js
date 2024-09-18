import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

const NagvigationList = ({ navigation } ) => {


  return (
    <View style={styles.container}>
        <Text>Notification Recieved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  readNotification: {
    color: 'gray',
  },
  unreadNotification: {
    fontWeight: 'bold',
  },
});

export default NagvigationList;
