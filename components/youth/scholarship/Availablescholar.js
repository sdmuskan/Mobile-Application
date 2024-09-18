import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const AvailableScholar = () => {
  const navigation = useNavigation();

  const handleButtonPress = (destination, url) => {
    if (destination) {
      navigation.navigate(destination);
    } else if (url && url.startsWith('http')) {
      navigation.navigate('WebViewScreen', { url: url });
    }
  };

  const buttonTitles = [
    { title: 'NSP', url: 'https://scholarships.gov.in/' },
    { title: 'SSP', url: 'https://ssp.postmatric.karnataka.gov.in/' },
    { title: 'SC/ST ', destination: 'SC Category' },
    { title: 'OBC', destination: 'OBC Category' },
    { title: 'GENERAL', destination: 'GENERAL CATEGORY' },
    { title: 'MINORITY', destination: 'MINORITY CATEGORY' },
    { title: 'PROJECTING INDIA', destination: 'PIscholar' },
    // Add more titles and corresponding links or navigation destinations
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* Button grid */}
          {buttonTitles.map(({ title, url, destination }, index) => (
            <View key={index} style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleButtonPress(destination, url)}
              >
                <LinearGradient
                  colors={['skyblue', 'white', 'skyblue']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>{title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    
  },
  rowContainer: {
    marginBottom: 10
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 15,
    marginTop: 15,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,

  },
});

export default AvailableScholar;
