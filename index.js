import React, { useEffect } from 'react';
import {name as appName} from './app.json';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from FontAwesome
import ErrorBoundary from './ErrorBoundary';
import Sample from './components/Sample';
import HomePage from './components/Home';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import LoginWithOTPScreen from './components/LoginWithOTPScreen';

import Profile from './components/Profile';
import Notification from './components/notification/Notification';
import BusinessProfile from './components/Business/BusinessProfile/BusinessProfile';
import UserProfileScreen from './components/EditProfile';
import BusinessListingPage from './components/Business/BusinessListingPage';
import BussProfile from './components/Business/BusinessProfile/BussProfile';
import Campaign from './components/Business/BusinessProfile/Campaign';
import Offers from './components/Business/BusinessProfile/Offers';
import Reviews from './components/Business/BusinessProfile/Reviews';
import VendorPage from './components/Business/BusinessProfile/VendorPage';
import BusinessDetailContainer from './components/Business/BusinessDetailPage';
import KYCUserScreen from './components/Business/KYCUserScreen';
import KYCManagementScreen from './components/Business/KYCExaminerScreen';



import GameZoneScreen from './components/youth/GameZoneScreen'; 
// import IconWithButton from './components/youth/Study Material/standard';
import Education from './components/youth/education/Education';
import WebViewScreen from './components/WebViewScreen';


import Consultant from './components/services/consultant/Consultant';
import Hotels  from './components/services/Hotels/Hotels';
import Matrimony from './components/services/Matrimony/Matrimony';
import Salon from './components/services/Salon-beauty/Salon-beauty';
import Shops from './components/services/shops/Shops';
import Gym from './components/services/gym/Gym';

import Doctor from './components/services/doctor/Doctor';
import DoctorDetail from './components/services/doctor/DoctorDetail';
import ServiceDetailsScreen from './components/services/doctor/ServiceDetailsScreen';



import Packer from './components/services/Packer-mover/Packer-mover';
import Repair from './components/services/Repair-services/Repair-services';
import Property from './components/services/property/Property';
import Job from './components/services/Job/Job';
import Rental from './components/services/Rental-vehicle/Rental-vehicle';
import Event from './components/services/event-managemenet/Event-management';
import Software from './components/services/Software-development/Software-development';
import HomeService from './components/services/home-services/HomeService';


import UploadDocuments from './components/youth/Study Material/NoteUploader/UploadNote';




// import scholar1 from './components/youth/scholarship/scholarship';
import availablescholar from './components/youth/scholarship/Availablescholar';
import Scholarship from './components/youth/scholarship/Scholarship';
import PIscholar from './components/youth/scholarship/PIscholar';
import sc from './components/youth/scholarship/Sc';
import obc from './components/youth/scholarship/Obc';
import GENERAL from './components/youth/scholarship/General';
import MINORITY from './components/youth/scholarship/Minority';
import NagvigationList from './components/NavigationList';
import Food from './components/services/food/Food';
import Fetchdata from './components/youth/scholarship/Fetchdata';
import StudyNote from './components/youth/Study Material/NoteUploader/StudyNote';
import About from './components/About';
import Automobiles from './components/services/automobiles/Automobiles';
import Clothing from './components/services/clothing/Clothing';
import Electronic from './components/services/electronic/Electronic';
import ScannerScreen from './components/Scanner';
import ChatGPT from './components/youth/ChatGPT';
import Showrooms from './components/services/showrooms/Showrooms';
import Insurance from './components/services/insurance/insurance';
import SearchResultScreen from './components/SearchResult';
import SendNotification from './components/notification/NotificationSend';
import NotificationDetails from './components/notification/NotificationDetails';
import Settings from './components/setting/Setting';

// Initialize the FontAwesome icon library
Icon.loadFont();

// Initialize Firebase if needed
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const Stack = createStackNavigator();
const generateScreenOptions = (title) => ({
  title,
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerBackground: () => (
    <LinearGradient
      colors={['#39A7FF', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    />
  ),
  headerTitleAlign: 'center',
  headerTitle: () => (
    <View style={styles.titleContainer}>
      <Text style={styles.headerTitleText}>{title}</Text>
    </View>
  ),
});

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 24,
    color: 'black',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    fontWeight:'900',
    fontFamily:'Lucida Console'
  },
});

const App = () => {
  
  useEffect(() => {
 
  }, []);
  // const CustomHeaderTitle = ({ title, color }) => {
  //   return (
  //     <Text style={{ color: color, fontWeight: 'bold', fontSize: 24, fontFamily: 'YourChosenFont-Bold' }}>
  //       {title}
  //     </Text>
  //   );
  // };
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen component={Sample} name="Sample" />
          <Stack.Screen name="Login"   component={LoginScreen} options={({ navigation }) => ({ ...generateScreenOptions('Login', navigation), headerLeft: null, })}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen}  options={generateScreenOptions('Registration')}/>
          <Stack.Screen name="ForgotPassword"  component={ForgotPasswordScreen}  options={generateScreenOptions('Forgot Password')}/>
          <Stack.Screen name="Home" component={HomePage}  options={generateScreenOptions('Home')} />
          <Stack.Screen name="LoginWithOTP" component={LoginWithOTPScreen} options={generateScreenOptions('Login With OTP')}   />
          <Stack.Screen name="GameZone" component={GameZoneScreen} options={generateScreenOptions('Game Zone')} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={generateScreenOptions('WebView')} />
          <Stack.Screen name="Education" component={Education} options={generateScreenOptions('Education')} />
          <Stack.Screen name="Profile" component={Profile} options={generateScreenOptions('Profile')} />
          <Stack.Screen name="Notification" component={Notification} options={generateScreenOptions('')}/>
          <Stack.Screen name="SendNotification" component={SendNotification} options={generateScreenOptions('')}/>
          <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={generateScreenOptions('')}/>
          <Stack.Screen name="BusinessProfile" component={BusinessProfile} options={generateScreenOptions('Business Profile')} />
          <Stack.Screen name="BussProfile" component={BussProfile} options={generateScreenOptions('BussProfile')} />
          <Stack.Screen name="Campaign" component={Campaign} options={generateScreenOptions('Campaign')}/>
          <Stack.Screen name="Offers" component={Offers} options={generateScreenOptions('Offers')}/>
          <Stack.Screen name="Reviews" component={Reviews} options={generateScreenOptions('Reviews')}/>
          <Stack.Screen name="VendorPage" component={VendorPage} options={generateScreenOptions('Features')}/>
          <Stack.Screen name="EditProfile" component={UserProfileScreen} options={generateScreenOptions('Edit Profile')}/>
          <Stack.Screen name="BusinessListing" component={BusinessListingPage} options={generateScreenOptions('Business Listings')} />
          <Stack.Screen name="BusinessDetailPage" component={BusinessDetailContainer} options={generateScreenOptions('Business Detail')} />
          <Stack.Screen name="KYCUserScreen" component={KYCUserScreen} options={generateScreenOptions('KYC Users')} />
          <Stack.Screen name="KYCManagementScreen" component={KYCManagementScreen} options={generateScreenOptions('KYCExaminerScreen')} />
          <Stack.Screen name="Setting" component={Settings} options={generateScreenOptions('Setting')} />
          <Stack.Screen name="About" component={About} options={generateScreenOptions('About')} />
          <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={generateScreenOptions('Scanner')} />
       


        {/* <Stack.Screen name="ProfileEdit" component={ProfileEditForm} /> */}
        
        <Stack.Screen name="Consultant" component={Consultant} options={generateScreenOptions('Consultant')} />
        <Stack.Screen name="Automobiles" component={Automobiles} options={generateScreenOptions('Automobiles')} />
        <Stack.Screen name="Electronic" component={Electronic} options={generateScreenOptions('Electronic')} />
        <Stack.Screen name="Clothing" component={Clothing} options={generateScreenOptions('Clothing')} />

        <Stack.Screen name="Hotels" component={Hotels } options={generateScreenOptions('Hotels')} />
        <Stack.Screen name="Matrimony" component={Matrimony } options={generateScreenOptions('Matrimony')} />
        <Stack.Screen name="Salon" component={Salon } options={generateScreenOptions('Salon')} />
        <Stack.Screen name="Shops" component={Shops } options={generateScreenOptions('Shops')} />
          <Stack.Screen name="Insurance" component={Insurance} options={generateScreenOptions('Insurance')} />
        <Stack.Screen name="Showrooms" component={ Showrooms } options={generateScreenOptions('Showrooms')} />
        <Stack.Screen name="Gym" component={Gym } options={generateScreenOptions('Gym')} />
        <Stack.Screen name="Food" component={Food } options={generateScreenOptions('Food')} />
        
        <Stack.Screen name="Doctor" component={Doctor } options={generateScreenOptions('Doctor')} />
        <Stack.Screen name="Detail" component={DoctorDetail } options={generateScreenOptions('Detail')} />
        <Stack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen } options={generateScreenOptions('Service Provider')} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} options={generateScreenOptions('Service Providers')} />
        
        <Stack.Screen name="Packer" component={Packer } options={generateScreenOptions('Packer')} />
        <Stack.Screen name="Repair" component={Repair } options={generateScreenOptions('Repair')} />
        <Stack.Screen name="Property" component={Property} options={generateScreenOptions('Property')} />
        <Stack.Screen name="Job" component={Job } options={generateScreenOptions('Job')} />
        <Stack.Screen name="Rental" component={Rental } options={generateScreenOptions('Rental')} />
        <Stack.Screen name="Event" component={Event} options={generateScreenOptions('Event')} />
        <Stack.Screen name="Software" component={Software} options={generateScreenOptions('Software')} />
        <Stack.Screen name="HomeService" component={HomeService} options={generateScreenOptions('HomeService')} />
       
       
 <Stack.Screen name="UploadNotes" component={UploadDocuments} options={generateScreenOptions('UploadNotes')} />
 <Stack.Screen name="StudyNote" component={StudyNote} options={generateScreenOptions('StudyNote')} />
 <Stack.Screen name="ChartGPT" component={ChatGPT} options={generateScreenOptions('ChartGPT')} />

 <Stack.Screen name="Scholarship" component={Scholarship} options={generateScreenOptions('Scholarships')} />
 <Stack.Screen name="availablescholar" component={availablescholar} options={generateScreenOptions('Available Scholarships')} />
 <Stack.Screen name="PIscholar" component={PIscholar} options={generateScreenOptions('PROJECTING INDIA')} />
<Stack.Screen name="SC Category" component={sc} options={generateScreenOptions('SC Category')} />
<Stack.Screen name="OBC Category" component={obc} options={generateScreenOptions('OBC Category')} />
<Stack.Screen name="GENERAL CATEGORY" component={GENERAL} options={generateScreenOptions('GENERAL Category')} />
<Stack.Screen name="MINORITY CATEGORY" component={MINORITY} options={generateScreenOptions('MINORITY  Category')} />
<Stack.Screen name="NagvigationList" component={NagvigationList} options={generateScreenOptions('Nagvigation List')} />
<Stack.Screen name="Fetchdata" component={Fetchdata} options={generateScreenOptions('Scholarship Submitted')} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent(appName, () => App);
