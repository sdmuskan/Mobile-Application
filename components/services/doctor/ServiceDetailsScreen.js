import React, { useState, useEffect } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Linking,
Image,
SafeAreaView,
ScrollView,
TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ServiceDetailsScreen = ({ route }) => {
const { service, businessDetails } = route.params;
const [searchText, setSearchText] = useState('');
const [searchResults, setSearchResults] = useState(null);
const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
const [selectedCategories, setSelectedCategories] = useState([]);
const [sortOrder, setSortOrder] = useState(null);
const [selectedCitySort, setSelectedCitySort] = useState(null);

const navigation = useNavigation();

useEffect(() => { }, []);

const handleSearch = text => {
setSearchText(text);
let filteredResults = null;

if (text !== '') {
filteredResults = businessDetails.filter(user => {
// Check if shopDetails and fullName exist before using toLowerCase()
return (
user.shopDetails &&
user.fullName &&
(user.shopDetails.toLowerCase().includes(text.toLowerCase()) ||
user.fullName.toLowerCase().includes(text.toLowerCase()))
);
});
}

setSearchResults(filteredResults);
};

const handleCategorySelection = (category) => {
  let updatedCategories;

  if (category === 'All') {
    updatedCategories = [];
  } else {
    updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((selected) => selected !== category)
      : [...selectedCategories, category];
  }

  setSelectedCategories(updatedCategories);
  setSearchResults(null); // Clear search results when category selection changes
};


const handleRatingHighToLow = () => {
setSortOrder(sortOrder === 'highToLow' ? null : 'highToLow');
setSearchResults(null);
};

const handleRatingLowToHigh = () => {
setSortOrder(sortOrder === 'lowToHigh' ? null : 'lowToHigh');
setSearchResults(null);
};

const toggleFilterOptions = () => {
setFilterOptionsVisible(!filterOptionsVisible);
};

const handleCardPress = user => {
navigation.navigate('Detail', { user });
};

const handleCitySortAZ = () => {
const sortedByCityAZ = businessDetails
.slice()
.sort((a, b) => a.city.localeCompare(b.city));
setSearchResults(sortedByCityAZ);
setSelectedCitySort('AZ');
};

const handleCitySortZA = () => {
const sortedByCityZA = businessDetails
.slice()
.sort((a, b) => b.city.localeCompare(a.city));
setSearchResults(sortedByCityZA);
setSelectedCitySort('ZA');
};

const clearCitySort = () => {
setSearchResults(null);
setSelectedCitySort(null);
};

return (
<SafeAreaView>
<KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      ></KeyboardAvoidingView>
  <ScrollView  showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
  
  <View style={styles.container}>
  <View style={styles.searchFilterContainer}>
  <View style={styles.searchContainer}>
  <Icon
  name="search"
  size={20}
  color="black"
  style={styles.searchIcon}
  />
  <TextInput
  style={styles.searchText}
  placeholder="Search..."
  value={searchText}
  onChangeText={handleSearch}
  />
  </View>
  <TouchableOpacity
  style={styles.filterButton}
  onPress={toggleFilterOptions}>
  <FontAwesomeIcon name="filter" size={27} color="rgb(30, 144, 255)" />
  </TouchableOpacity>
  </View>

  {filterOptionsVisible && (
  <View style={styles.filterOptionsContainer}>
  <TouchableOpacity
  onPress={toggleFilterOptions}
  style={styles.categoryOptionsContainer}>
  <View style={styles.filterOptionContainer}>
  <Text>{`Categories: ${selectedCategories.length > 0
      ? selectedCategories.join(', ')
      : 'All'
    }`}</Text>
  </View>
  </TouchableOpacity>

  <View style={styles.categoryOptionsContainer}>
  <TouchableOpacity onPress={handleCitySortAZ}>
  <View style={styles.filterOptionContainer}>
    <Text>{`City A-Z`}</Text>
    <View
      style={[
        styles.checkbox,
        selectedCitySort === 'AZ' && styles.checkboxSelected,
      ]}>
      {selectedCitySort === 'AZ' && (
        <Icon name="check" size={15} color="black" />
      )}
    </View>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={handleCitySortZA}>
  <View style={styles.filterOptionContainer}>
    <Text>{`City Z-A`}</Text>
    <View
      style={[
        styles.checkbox,
        selectedCitySort === 'ZA' && styles.checkboxSelected,
      ]}>
      {selectedCitySort === 'ZA' && (
        <Icon name="check" size={15} color="black" />
      )}
    </View>
  </View>
  </TouchableOpacity>

  {/* <TouchableOpacity onPress={handleRatingHighToLow}>
  <View style                                   = {styles.filterOptionContainer}>
  <Text>{`Rating High to Low`}</Text>
  <View style                                 = {[styles.checkbox, sortOrder === 'highToLow' && styles.checkboxSelected]}>
  {sortOrder === 'highToLow' && (
  <Icon name                              = "check" size={15} color="black" />
  )}
  </View>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress                       = {handleRatingLowToHigh}>
  <View style                                   = {styles.filterOptionContainer}>
  <Text>{`Rating Low to High`}</Text>
  <View style                                 = {[styles.checkbox, sortOrder === 'lowToHigh' && styles.checkboxSelected]}>
  {sortOrder === 'lowToHigh' && (
  <Icon name                              = "check" size={15} color="black" />
  )}
  </View>
  </View>
  </TouchableOpacity> */}
  </View>
  </View>
  )}

  <View style={styles.rowContainer}>
  <Text style={styles.serviceText}> Section : {service}</Text>
  {(searchResults || businessDetails).map((user, index) => {
  const isRatingMatch =
  sortOrder === 'highToLow' || sortOrder === 'lowToHigh'
  ? false
  : true;

  if (!isRatingMatch) {
  return null;
  }

  return (
  <TouchableOpacity
  style={styles.card}
  key={index}
  onPress={() => handleCardPress(user)}>
  <View style={styles.imageContainer}>
  {user.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }} // Assuming profileImage is a URL
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../../assets/images/medical-team.png')}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
    <View style={styles.textContainer}>
      <Text style={[styles.cardText, styles.shop]}>
        {user.shopDetails}
      </Text>
      <Text style={styles.cardText}>{user.fullName}</Text>
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
  </TouchableOpacity>
  );
  })}
  </View>
  </View>
  </ScrollView>
 {/* Footer Section */}

 {/* <View style={styles.footerContainer}>
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


      */}
</SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
paddingHorizontal: 20,
paddingTop: 20,
paddingBottom:500,
},
serviceText: {
fontSize: 21,
fontWeight: 'bold',
marginBottom: 20,
textAlign: 'center',
color: '#rgb(30, 144, 255)',
},
card: {
backgroundColor: '#f9f9f9',
borderRadius: 8,
padding: 15,
marginBottom: 15,
elevation: 3,
shadowColor: '#000',
shadowOpacity: 0.2,
shadowOffset: { width: 0, height: 2 },
borderColor: '#fff',
borderWidth: 3,
},
imageContainer: {
flexDirection: 'row',
},
image: {
width: 80,
height: 80,
borderRadius: 8,
marginRight: 15,
},
textContainer: {
flex: 1,
alignItems: 'start',
justifyContent: 'center',
marginLeft: 10,
},
cardText: {
fontSize: 18,
marginBottom: 5,
fontWeight: 'bold',
textAlign: 'left',
color:'#4895ef',
},
shop: {
color: '#4361ee',
fontSize: 25,
borderBottomWidth: 2,
borderBottomColor: '#c5c5c5',
fontWeight:'900',
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
searchFilterContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 20,
},

searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#bde0fe',
  borderRadius: 8,
  paddingLeft: 10,
  paddingRight: 10,
  flex: 1,
  marginRight: 10,
  shadowColor: '#blue', // Shadow color
  shadowOffset: { width: 10, height: 12 }, // Shadow offset
  shadowOpacity: 0.9, // Shadow opacity
  shadowRadius: 4, // Shadow radius
  elevation: 5, // Elevation for Android
},


searchIcon: {
  marginRight: 8,
  color: '#rgb(30, 144, 255)',
  fontSize: 25,
  shadowColor: 'blue', // Shadow color
  shadowOffset: { width: 20, height: 12 }, // Shadow offset
  shadowOpacity: 0.9, // Shadow opacity
  shadowRadius: 4, 
  elevation: 5, 
},
searchText: {
color: '#3a86ff',
flex: 1,
fontSize: 18,
},
filterButton: {
backgroundColor: '#f0f0f0',
padding: 10,
borderRadius: 8,
},
filterOptionsContainer: {
  backgroundColor: 'rgba(30, 144, 255,0.7)',
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
  marginBottom: 20,
  shadowColor: 'blue', // Shadow color
  shadowOffset: { width: 20, height: 12 }, // Shadow offset
  shadowOpacity: 0.9, // Shadow opacity
  shadowRadius: 4, // Shadow radius
  marginHorizontal:30,
  color:'red'
},
filterOptionContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingHorizontal: 10,
paddingVertical: 8,
},
categoryOptionsContainer: {
marginTop: 10,
rowGap: 10,
// marginLeft: 25,
},
checkbox: {
width: 20,
height: 20,
borderRadius: 5,
borderWidth: 2,
borderColor: 'black',
// marginLeft: 0,
},
checkboxSelected: {
backgroundColor: 'lightgreen',
},
rowContainer: {
marginBottom: 0,
},
 // footer style
 footerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#f0f0f0',
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

export default ServiceDetailsScreen;
