import React, { useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const Scholarship = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(50)).current;

  const handleButtonPress = (title) => {
     switch (title) {
      case 'Scholarship available for Eligible Student':
        navigation.navigate('availablescholar'); // Replace 'NinthClassScreen' with the actual screen name
        break;
    
    }
  };
    // ... Your existing logic
    useEffect(() => {
      // Slide animation from right to left
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: false, // false for Android
      }).start();
    }, [slideAnim]);
    
  const handleIconPress = () => {
    console.log('Icon pressed!');
  };


  const buttonTitles = ['Scholarship available for Eligible Student'];

  return (
    
    <SafeAreaView>
      <ScrollView>
      <Text style={styles.extraText}>{"Your Journey, Our Support: Scholarships for Every Dream"}</Text>

        <View style={styles.container}>
          {/* Image at the top and center */}
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/images/Scholar.jpg')} style={styles.image} />
          </View>

          {/* Button grid */}
          {buttonTitles.map((title, index) => (
            <View key={index} style={styles.rowContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(title)}>
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

          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          <Text style={styles.subextraText}>{"Conveying a sense of support and inclusivity, highlighting that scholarships are available to help individuals pursue a wide range of dreams."}</Text>
          </Animated.View>
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
    // marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 20,
    borderRadius:30,
    
  },
  buttonContainer: {
    alignItems: 'center', 
    marginTop: 20, 
  },
button: {
    width: 300,
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 150,
    marginTop: 30,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize : 20,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
   
  },
  extraText: {
    marginTop: 20,  // Adjust this value to move the extra text up or down
    textAlign: 'center',
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  
  subextraText: {
    marginTop: -100,  // Adjust this value to control the space between the button and extra text
    textAlign: 'left',
    fontSize: 16,
    color: 'royalblue',
    fontWeight: 'bold',
    marginBottom: 40,
    
  },

  
});


export default Scholarship;
