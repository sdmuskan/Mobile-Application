import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Offers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offers Page</Text>
      <Text>This is the Offers Page content.</Text>
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

export default Offers;