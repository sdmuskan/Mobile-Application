import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';

const GameZoneScreen = () => {
  // List of different free games available on the internet
  const gamesList = [
  { name: 'Subway Surfers',  url: 'https://poki.com/en/g/subway-surfers', image: require('../../assets/images/p1.png') },
  { name: 'Temple Run 2', url: 'https://poki.com/en/g/temple-run-2', image: require('../../assets/images/p2.png') },
  { name: 'Super Tunnel Rush', url: 'https://poki.com/en/g/super-tunnel-rush', image: require('../../assets/images/p3.jpg') },
  // Add more games with their respective images and URLs
];


  // Function to handle clicking on a game linka
  const handleGameClick = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Game Zone</Text>
      <View style={styles.gamesList}>
        {/* Display images as buttons for each game */}
        {gamesList.map((game, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gameButton}
            onPress={() => handleGameClick(game.url)}
          > 
            <Image
              source={game.image}
              style={styles.gameImage}
            />
          </TouchableOpacity>
        ))}
      </View>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gamesList: {
    width: '100%',
    alignItems: 'center',
  },
  gameButton: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gameImage: {
    width: 200, // Adjust the width and height as needed
    height: 200,
  },
});

export default GameZoneScreen;
