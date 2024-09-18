import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const About= () => {
  return (
    <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      
      <Text style={styles.title}>About Projecting India</Text>
      
      <Text style={styles.description}>
        Projecting India is organization dedicated to bringing positive change
        through various initiatives and projects. Our mission is to empower india,
        foster education, and create a lasting impact on society.
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.sectionDescription}>
        To empower individuals, build sustainable communities, and drive positive change
        through education, innovation, and collaboration.
      </Text>

      <Text style={styles.sectionTitle}>Our Vision</Text>
      <Text style={styles.sectionDescription}>
        A world where every individual has access to quality education, healthcare, and
        opportunities, leading to a brighter and more equitable future.
      </Text>

      <Text style={styles.sectionTitle}>Our Values</Text>
      <Text style={styles.sectionDescription}>
        - Community: We believe in the strength of community and collaboration.
        {'\n'}- Integrity: We uphold the highest standards of integrity and transparency.
        {'\n'}- Innovation: We strive for innovative solutions to address societal challenges.
        {'\n'}- Impact: We measure success by the positive impact we create.
      </Text>

      <Text style={styles.sectionTitle}>Meet Our Team</Text>
      <Text style={styles.sectionDescription}>
        Get to know the passionate individuals behind Projecting India who work tirelessly
        to make a difference in the world.
      </Text>
      
      {/* Add team member details or images here */}

      {/* Add any other relevant sections as needed */}

    </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 75,
    shadowColor: '#00f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, 
    shadowRadius: 10, 
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
});

export default About;
