import React, { useState, useMemo,useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Dimensions, TextInput, Animated, StyleSheet, Image, Platform, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { firebase } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'; 

const { width, height } = Dimensions.get('window');
const isTablet = width >= 600 && height >= 600;

const HomePage = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllYouthOptions, setShowAllYouthOptions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showCount, setShowCount] = useState(false);
  const services = ['Consultant', 'Doctor', 'Matrimony', 'Event', 'Automobile', 'Clothing', 'Electronic', 'Gym', 'Insurance', 'Services', 'Repair', 'Job', 'Food', 'Hotels', 'Property', 'Vehicle', 'Salon', 'Packer', 'Software', 'Shops','Showrooms'];
  const youthOptions = ['Game Zone', 'Education','Scholarship','Notes', 'Instagram', 'ChatGPT', 'Facebook', 'Linkedin'];

 const inputRef = useRef(null);
  const searchWidth = useRef(new Animated.Value(90)).current;
  
  const handleTextInputFocus = () => {
    Animated.timing(searchWidth, {
      toValue: isTablet ? 500 : 250, // Adjust these values based on your preference
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const filteredYouthOptions = useMemo(() => {
    return youthOptions.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleSearchIconClick = () => {
    console.log('Performing search:', searchText);

    // Check if the searchText matches with services or youth options
    const isServiceMatch = filteredServices.length > 0;
    const isYouthOptionMatch = filteredYouthOptions.length > 0;

    if (isServiceMatch || isYouthOptionMatch) {
      // Handle the logic to display results on the same page (if needed)
      console.log('Search matches with services or youth options:', searchText);
      // Add your logic here to display results on the same page if needed
    } else {
      // Perform business listing search and navigate to SearchResultScreen
      performSearch(searchText);
    }
  };

  const performSearch = async (text) => {
    console.log('Performing search:', text);

    try {
      // Search in BusinessListing collection for full name, shop details, categories, or added services
      const fullNameQuery = firestore().collection('BusinessListing').where('fullName', '==', text).get();
      const shopDetailsQuery = firestore().collection('BusinessListing').where('shopDetails', '==', text).get();
      const categoryQuery = firestore().collection('BusinessListing').where('categories', '==', text).get();
      const addedServicesQuery = firestore().collection('BusinessListing').where('addedServices', 'array-contains', text).get();

      // Wait for all queries to complete
      const [fullNameResults, shopDetailsResults, categoryResults, addedServicesResults] = await Promise.all([
        fullNameQuery,
        shopDetailsQuery,
        categoryQuery,
        addedServicesQuery,
      ]);

      const combinedResults = [
        ...fullNameResults.docs.map((doc) => doc.data()),
        ...shopDetailsResults.docs.map((doc) => doc.data()),
        ...categoryResults.docs.map((doc) => doc.data()),
        ...addedServicesResults.docs.map((doc) => doc.data()),
      ];

      console.log('Fetched Business by Full Name, Shop Details, Category, and Added Services:', combinedResults);

      // Navigate to SearchResultScreen with the search results
      navigation.navigate('SearchResultScreen', {
        searchQuery: text,
        searchResults: combinedResults,
      });
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsRef = firebase.firestore().collection('Notification');
        const querySnapshot = await notificationsRef.get();
        let unread = 0;

        querySnapshot.forEach((doc) => {
          const notificationData = doc.data();
          const notification = { id: doc.id, ...notificationData };
          if (!notification.read) {
            unread++;
          }
        });

        // Get the current count from AsyncStorage
        const storedUnreadCount = await AsyncStorage.getItem('unreadNotificationsCount');
        if (storedUnreadCount) {
          unread += parseInt(storedUnreadCount, 10); // Convert to number and add to the existing count
        }

        setShowCount(unread > 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch notifications when the component mounts
    fetchNotifications();

    // Simulating real-time updates (listening to changes in the 'Notification' collection)
    const unsubscribe = firebase.firestore().collection('Notification').onSnapshot(() => {
      fetchNotifications();
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleNotificationClick = async () => {
    // Reset the count
    await AsyncStorage.setItem('unreadNotificationsCount', '0');
    setShowCount(false);
    navigation.navigate('Notification');
  };

  const optionImages = {
    'Game Zone': require('../assets/images/homepage/florid-hands-holding-mobile-game-controller.gif'),
    'Education': require('../assets/images/education/clip-reading-books.png'),
    'Scholarship': require('../assets/images/homepage/scholarship.png'),
    'Notes': require('../assets/images/education/books.png'),
    'Instagram': require('../assets/images/homepage/instagram.png'),
    'ChatGPT': require('../assets/images/homepage/chatgpt.png'),
    'Facebook': require('../assets/images/homepage/facebook.png'),
    'Linkedin': require('../assets/images/homepage/linkedin.png'),
  };
  const serviceImages = {
    Consultant: require('../assets/images/homepage/consultant.png'),
    Doctor: require('../assets/images/homepage/doctor.png'), 
    Matrimony: require('../assets/images/homepage/matrimony.png'),
    Automobile: require('../assets/images/services/automobiles.png'),
    Clothing: require('../assets/images/services/clothes.png'),
    Electronic: require('../assets/images/homepage/electronic.png'),
    Event: require('../assets/images/homepage/eventmanagement.png'),
    Gym: require('../assets/images/homepage/gym.png'),
    Services: require('../assets/images/homepage/homeservices.png'),
    Repair: require('../assets/images/homepage/repairservices.png'),
    Job: require('../assets/images/homepage/job.png'),
    Shops: require('../assets/images/homepage/shopping.png'),
    Insurance: require('../assets/images/homepage/insurance.png'),
    Showrooms: require('../assets/images/homepage/showrooms.png'),
    Food: require('../assets/images/homepage/food.png'),
    Hotels: require('../assets/images/homepage/hotel.png'),
    Property: require('../assets/images/homepage/property.png'),
    Vehicle: require('../assets/images/services/rentalvehicle.png'),
    Salon: require('../assets/images/homepage/salon&beauty.png'),
    Packer: require('../assets/images/services/packerandmover.png'),
    Software: require('../assets/images/web-development.png'),
    // Add more services and their respective image paths
    // For services not listed here, use a default image
    // default: require('../assets/images/default.png'),
  };

  const handleServiceClick = (service) => {
    // Example navigation logic (replace with your actual screen names)
    switch (service) {
      case 'Consultant':
        navigation.navigate('Consultant');
        break;
      
      case 'Hotels':
        navigation.navigate('Hotels');
        break;
        
      case 'Matrimony':
        navigation.navigate('Matrimony');
        break;

        
  case 'Automobile':
    navigation.navigate('Automobiles');
    break;
  case 'Clothing':
    navigation.navigate('Clothing');
    break;
  case 'Electronic':
    navigation.navigate('Electronic');
    break;
  
        
     
    case 'Salon':
        navigation.navigate('Salon');
        break;
     
        case 'Shops':
        navigation.navigate('Shops');
        break;
        
        case 'Showrooms':
        navigation.navigate('Showrooms');
        break;
        
     
        case 'Gym':
        navigation.navigate('Gym');
        break;
      
        case 'Insurance':
        navigation.navigate('Insurance');
        break;
        
      case 'Doctor':
        navigation.navigate('Doctor');
        break;
        
      case 'Software':
        navigation.navigate('Software');
        break;
        
      case 'Repair':
        navigation.navigate('Repair');
        break;
        
      case 'Packer':
        navigation.navigate('Packer');
        break;
        
      case 'Property':
        navigation.navigate('Property');
        break;
        
      case 'Event':
        navigation.navigate('Event');
        break;
        
      case 'Job':
        navigation.navigate('Job');
        break;
        
      case 'Vehicle':
        navigation.navigate('Rental');
        break;
      case 'Food':
        navigation.navigate('Food');
        break;
        

      case 'Services':
        navigation.navigate('HomeService');
        break;
      // Add cases for other services similarly
      default:
        // Handle navigation to a default screen or add additional logic
        break;
    }
  };
    
  const handleYouthOptionClick = async (option) => {
      try {
        switch (option) {
          case 'Game Zone':
            navigation.navigate('GameZone');
            break;

        case 'Education':
          navigation.navigate('Education');
          break;

          case 'Notes':
            navigation.navigate('StudyNote');
            break;

            case 'Scholarship':
            navigation.navigate('Scholarship');
            break;

        case 'ChatGPT':
            navigation.navigate('WebViewScreen', { url: 'https://chat.openai.com/' });
          break;
        case 'Instagram':
          navigation.navigate('WebViewScreen', { url: 'https://www.instagram.com' });
          break;
        case 'Facebook':
          navigation.navigate('WebViewScreen', { url: 'https://www.facebook.com' });
          break;
        case 'Linkedin':
          navigation.navigate('WebViewScreen', { url: 'https://www.linkedin.com/login' });
          break;
        // ... (other cases)
        default:
          // Handle navigation to a default screen or add additional logic
          break;
      }
      console.log('Youth option clicked:', option);
    } catch (error) {
      console.error('Error navigating to URL: ', error);
      // Handle error
    }
    
  };

  const handleProfile = useMemo(() => () => {
      // Implement OTP login functionality here
      navigation.navigate('Profile');
    }, [navigation])
  const handleScanAndPay = () => {
    navigation.navigate('ScannerScreen');
  };

  return (
  
    <LinearGradient colors={['#fff', '#fff']} style={styles.container}>
      {/* Header */}
     
      {/* Body */}
      <ScrollView  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Animated.View style={{ width: searchWidth }}>
          <TextInput
            ref={inputRef}
            placeholder="Search"
            style={styles.input}
            onFocus={handleTextInputFocus} 
            onBlur={() => setShowSearch(false)}
            onChangeText={setSearchText}
            value={searchText}
            color="black"
                placeholderTextColor="darkgray"
          />
        </Animated.View>

        </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleSearchIconClick}>
              <Image
                source={require('../assets/images/homepage/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
              
            <TouchableOpacity onPress={handleNotificationClick}>
              <Image
                source={require('../assets/images/homepage/bell.png')}
                style={styles.bellIcon}
              />
              {showCount && <View style={styles.notificationBadge} />}
            </TouchableOpacity>
          </View>
        </View>
        {/* Start */}

        {/* Services */}
        <View style={styles.bodyContainer}>
          <View style={styles.bodyHeader}>
            <Text style={styles.bodyTitle}>Services</Text>
          </View>
          <View style={styles.bodyContent}>
            {filteredServices.slice(0, showAllServices ? filteredServices.length : isTablet? 5 :  7).map((service, index) => (
              <TouchableOpacity key={index} onPress={() => handleServiceClick(service)} style={styles.bodyDiv}>
                <Image source={serviceImages[service] || serviceImages.default} style={styles.bodyTitleIcon}/>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bodyItem}>{service}</Text>
              </TouchableOpacity>
            ))}
            {services.length > 7 && !searchText &&  (
              <TouchableOpacity
                onPress={() => setShowAllServices(!showAllServices)}
                style={styles.showMoreButton}
              >
                <View>
                  <Image style={styles.showMoreImg}
                    
                    source={require('../assets/images/homepage/showmore.png')}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Youth */}
        <View style={styles.bodyContainer}>
          <View style={styles.bodyHeader}>
            <Text style={styles.bodyTitle}>Youth</Text>
          </View>
          <View style={[styles.bodyContent, styles.youth]}>
            {filteredYouthOptions.slice(0, showAllYouthOptions ? filteredYouthOptions.length : isTablet?5:3).map((option, index) => (
              <TouchableOpacity  key={index} onPress={() => handleYouthOptionClick(option)} style={styles.bodyDiv} >
                <Image source={optionImages[option]} style={styles.bodyTitleIcon} />
                <Text style={styles.bodyItem}>{option}</Text>
              </TouchableOpacity>
            ))}
            {youthOptions.length > 3 && !searchText &&(
              <TouchableOpacity
                onPress={() => setShowAllYouthOptions(!showAllYouthOptions)}
                style={styles.showMoreButton}
              >
                <View>
                  <Image
                    style={styles.showMoreImg}
                    source={require('../assets/images/homepage/showmore.png')}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>


      {/* End */}    
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => { /* Handle home button */ }}>
          <View style={styles.iconTextContainer}>
            {/* <Icon name="home" size={25} color="blue" /> */}
            <Image source={require('../assets/images/homepage/3d-fluency-company.png')} style={{ width: 40, height: 40 }}/>
            <Text style={styles.footerText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => { /* Handle location button */ }}>
          <View style={styles.iconTextContainer}>
          <Image source={require('../assets/images/homepage/map.png')}  style={{ width: 40, height: 40 }} />
            <Text style={styles.footerText}>Location</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleScanAndPay}>
          <View style={styles.iconTextContainer}>
            {/* <Icon name="qrcode" size={25} color="blue" /> */}
            <Image source={require('../assets/images/homepage/scan.png')} style={{ width: 40, height: 40 }} />
            <Text style={styles.footerText}>PI Pay</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleProfile}>
          <View style={styles.iconTextContainer}>
            {/* <Icon name="user" size={25} color="blue" /> */}
            <Image source={require('../assets/images/homepage/profile.png')}  style={{ width: 40, height: 40 }} />
            <Text style={styles.footerText}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  searchIcon: {
    width:isTablet?60:30,
    height:isTablet?60:30,
    marginLeft:isTablet?-340:-100
  },
  bellIcon:{
    width:isTablet?60:30,
    height:isTablet?60:30,
    marginLeft:isTablet?-270:-70
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: isTablet?10:3,
    right: isTablet?210:36,
    backgroundColor: 'red',
    color:'white',
    borderRadius: 10,
    width: isTablet?20 :14,
    height: isTablet?20:14,
  },
  input: {
    height: isTablet?65:40,
    borderColor: 'rgb(30, 144, 255)',
    borderWidth: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: isTablet ? 50 : 50,
    marginLeft: isTablet ? 195 : 25,
    textAlign: isTablet?'center':'center',
    color:'rgb(30, 144, 255)',
    shadowColor: 'rgb(30, 144, 255)',
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    fontSize:isTablet?30:16,
    
  },

  bodyHeader: {
    backgroundColor: 'rgb(30, 144, 255)',
    borderRadius: 50,
    marginBottom: '2%', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    shadowColor: '#0802A3',
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 25,
  },
  bodyTitle: {
    fontSize: isTablet?35:20, 
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(25, 4, 130, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  bodyContainer: {
    marginHorizontal: isTablet ? '5%' : '1%', 
    marginTop: isTablet ? '4%' : '2%', 
    paddingHorizontal: isTablet ? '10%' : '5%', 
    // backgroundColor:'red'
  },
  bodyTitleIcon: {
    height: isTablet ? 50 : 30,
    width: isTablet ? 50 : 30,
    marginBottom: 10,
    borderRadius: 20,
    marginTop: 5,
    alignSelf: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    // backgroundColor:'pink'

  },  
  bodyContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
    // backgroundColor:'orange'
  },
  bodyDiv:{
    width:isTablet?110:67,
    marginHorizontal:isTablet?10:3,
    // backgroundColor:'yellow'
    },
  bodyItem: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    fontWeight: '900',
    fontSize:isTablet?18:12
  },
  showMoreButton: {

    alignSelf:'center',
    marginHorizontal:isTablet?12:0,
    height:isTablet?70:80,
    width:isTablet?0:73,
    // backgroundColor:'violet'
  },
  showMoreImg:{
    height:isTablet?50:50,
    width:isTablet?50:50,
    marginTop:10

  },

  youth:{
    marginBottom:200
  },

  // footer style
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1%', 
    backgroundColor: '#EEF5FF',
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
    marginTop: '1%',
    color: '#0174BE',
    textAlign: 'center',
    fontWeight: '900',
  },
});



export default HomePage;