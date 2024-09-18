import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Reviews = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews Page</Text>
      <Text>This is the Reviews Page content.</Text>
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

export default Reviews;