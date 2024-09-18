import React, {useState} from 'react';
import { View,Modal, Text, StyleSheet, SafeAreaView, Linking, Image, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const DoctorDetail = ({ route }) => {
  const { user } = route.params;
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    console.log('Close button pressed'); // Check if this message appears in the console
    setModalVisible(false);
    setSelectedImage('');
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView  showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              {user.profileImage ? (
              <Image
                source={{ uri: user.profileImage }} // Assuming profileImage is a URL
                style={styles.image}
                resizeMode="cover"
              />
              ) : (
                <Image  source={require('../../../assets/images/medical-team.png')} style={styles.image}   resizeMode="cover"
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.heading}>{user.shopDetails}</Text>
                <Text style={styles.cardText}>{user.fullName}</Text>
                <Text style={styles.cardText}>{user.categories}</Text>
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(`tel:${user.phoneNumber}`)}>
                <Ionicons
                  name="call"
                  size={20}
                  color="white"
                  style={[styles.buttonIcon, styles.phone]}
                />
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(`mailto:${user.email}`)}>
                <Ionicons
                  name="mail"
                  size={20}
                  color="white"
                  style={[styles.buttonIcon, styles.email]}
                />
                <Text style={styles.buttonText}>Mail</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${user.shopDetails},${user.shopAddress}, ${user.street}, ${user.city}, ${user.state}`,
                    )}`,
                  )
                }>
                <Ionicons
                  name="navigate"
                  size={20}
                  color="white"
                  style={[styles.buttonIcon, styles.location]}
                />
                <Text style={styles.buttonText}>Direction</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.multiImageContainer}>
              <ScrollView horizontal={true} style={styles.scrollView}>
                {user.documents.map((imageUri, index) => (
                  <TouchableOpacity key={index} onPress={() => openImageModal(imageUri)}>
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>


            {/* Image Modal */}
            <Modal visible={isModalVisible} transparent={true}>
              <TouchableWithoutFeedback onPress={closeImageModal}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
                    <Text>X</Text>
                  </TouchableOpacity>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableWithoutFeedback>
            </Modal>  
            </View>


            <Text style={styles.list}>List Of Services Providing</Text>
            <View style={styles.details}>
              {/* <FlatList
                data={user.addedServices}
                renderItem={({ item }) => (
                  <Text style={styles.serviceItem}>{item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Adjust the number of columns as needed
                columnWrapperStyle={styles.services}
              /> */}
              <View style={styles.details}>
          {user.addedServices.map((item, index) => (
            <Text key={index} style={styles.serviceItem}>
              {item}
            </Text>
          ))}
        </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Section */}

 <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
        <View style={styles.iconTextContainer}>
          <Icon name="home" size={25} color="blue" />
          <Text style={styles.footerText}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('LocationScreen')}>
        <View style={styles.iconTextContainer}>
          <Icon name="map-marker" size={25} color="blue" />
          <Text style={styles.footerText}>Location</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <View style={styles.iconTextContainer}>
          <Icon name="qrcode" size={25} color="blue" />
          <Text style={styles.footerText}>Scan and Pay</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Profile')}>
        <View style={styles.iconTextContainer}>
          <Icon name="user" size={25} color="blue" />
          <Text style={styles.footerText}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: 'blue',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#4361ee',
    borderBottomWidth:2,
    borderBottomColor:'#c5c5c5'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginRight: 10,
  },
  multiImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  multiImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
    shadowColor: '#000', // shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff', // background color to make shadow visible
  },
   
  textContainer: {
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color:'#4895ef'

  },
  details: {
    flexDirection: 'column',
    marginTop: 10,
    color:'#4895ef'
  },

  info: {
    fontSize: 16,
    color:'black'

  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color:'black'

  },
  list: {
    fontSize: 25,
    fontWeight: '900',
    marginTop: 10,
    color:'black',
    textAlign:'center',
    marginTop:50,
    marginBottom:15,
    borderBottomWidth:10,
    borderRadius:10
  },
  services: {
    textAlign:'center'
  },
  serviceItem: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    margin: 7,
    flexShrink: 2,
    flexWrap: 'wrap',
    width: '100%',
    borderRadius: 8, // Adds rounded corners
    shadowColor: '#000', // Adds shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontWeight: 'bold',
    backgroundColor:'#5465ff',
    paddingVertical:5,
    paddingHorizontal:2.5,
    textAlign:'center',
    color:'white'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    },
    button: {
    alignItems: 'center',
    },
    buttonText: {
    color: 'black',
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
    },
    buttonIcon: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    },
    phone: {
    backgroundColor: 'green',
    },
    email: {
    backgroundColor: 'orange',
    },
    location: {
    backgroundColor: 'blue',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    closeButton: {
      position: 'absolute',
      top: 600, 
      left: -30, // Adjust this value to position the button to the right
      zIndex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 50,
      padding: 25,
      paddingVertical:20,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    
    modalImage: {
      width: '90%',
      height: '90%',
    },
     // footer style
 footerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#f0f0f0',
  position: 'absolute',
  bottom: 0,
  width: '100%',
},
footerItem: {
    alignItems: 'center',
},
iconTextContainer: {
  flexDirection: 'column',
  alignItems: 'center',
},
footerText: {
  marginTop: 5,
  color: 'blue',
  textAlign: 'center',
},
  
});


export default DoctorDetail;
