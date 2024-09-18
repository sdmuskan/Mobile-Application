import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BussProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text>This is the Profile Page content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BussProfile;
