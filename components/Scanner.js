// ScannerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { request, PERMISSIONS } from 'react-native-permissions';

const ScannerScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
      setCameraPermission(result);
    });
  }, []);

  const handleBarCodeRead = (event) => {
    console.log('Barcode value:', event.data);
    console.log('Barcode type:', event.type);
    // Handle the scanned barcode data as needed
    // For simplicity, we are just logging it here
  };

  if (cameraPermission === 'denied') {
    return (
      <View style={styles.container}>
        <Text>Camera permission denied. Please enable it in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleBarCodeRead}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ScannerScreen;
