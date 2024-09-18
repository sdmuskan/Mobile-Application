import React, { useState, useEffect  } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Button, ActivityIndicator, StyleSheet, Image, useColorScheme } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Snackbar } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
const GradientTextInput = ({ value, onChangeText, placeholder, colors }) => {
  return (
    <View style={styles.inputContainer}>
      <LinearGradient colors={colors} style={styles.gradient} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};
const BusinessListingPage = ({ navigation }) => {
   const initialCategories = [
     {
       id: 1, name: 'automobile', services: ['4x4 and Off-Road Parts Retailers',
         'Auto Parts Stores',
         'Body and Exterior Parts Stores',
         'Brake and Suspension Parts Shops',
         'Car Accessories Shops',
         'Car Electronics and Audio Shops',
         'Classic Car Parts Dealers',
         'Commercial Vehicle Parts Suppliers',
         'Custom Auto Parts Fabricators',
         'Diagnostic and Tools Stores',
         'Electrical and Lighting Auto Parts',
         'Engine Components Retailers',
         'Exhaust System Shops',
         'Fluids and Chemicals Auto Parts Stores',
         'Interior Accessories Retailers',
         'Motorcycle Parts and Accessories Shops',
         'Performance Auto Parts Retailers',
         'RV and Trailer Parts Stores',
         'Tire and Wheel Shops',
         'Transmission Parts Stores']}, 
  
    { id: 2, name: 'clothing', services: [ 'Luxury Fashion Stores',
    'Vintage Clothing Shops',
    'Athleisure Stores',
    'Activewear Retailers',
    'Outdoor and Adventure Gear Shops',
    'Children Clothing Stores',
    'Maternity Wear Shops',
    'Lingerie and Intimate Apparel Boutiques',
    'Plus-size Clothing Stores',
    'Formal Wear and Evening Gown Shops',
    'Sustainable and Ethical Fashion Stores',
    'Streetwear Shops',
    'Men Fashion Retailers',
    'Women Fashion Boutiques',
    'Teen Fashion Stores',
    'Uniform and Workwear Shops',
    'Swimwear and Beachwear Stores']}, 

    { id: 3, name: 'Colleges', services: [ 'Accounting',
    'Animation and Multimedia',
    'Architecture',
    'Automobile Engineering',
    'B.E',
    'B.Tech',
    'Biology',
    'Business Administration',
    'Chemistry',
    'Civil Engineering',
    'Communications',
    'Computer Science',
    'Criminal Justice',
    'Diploma Automobile Engineering',
    'Diploma Civil Engineering',
    'Diploma Electrical Engineering',
    'Diploma in Business Administration',
    'Diploma in Culinary Arts',
    'Diploma in Early Childhood Education',
    'Diploma in Fine Arts',
    'Diploma in Fitness and Nutrition',
    'Diploma in Information Technology',
    'Diploma in Pharmacy',
    'Diploma in Photography',
    'Diploma in Yoga and Naturopathy',
    'Economics',
    'Education',
    'Electrical Engineering',
    'English Literature',
    'Environmental Science',
    'Event Management',
    'Fashion Design',
    'Fashion Designing',
    'Film Making',
    'Fine Arts',
    'Graphic Design',
    'Healthcare Administration',
    'History',
    'Hospitality and Tourism Management',
    'Hospitality Management',
    'Information Technology',
    'Interior Design',
    'Journalism',
    'Mathematics',
    'Media Studies',
    'Mechanical Engineering',
    'Music',
    'Nursing',
    'Physics',
    'Political Science',
    'Psychology',
    'Social Work',
    'Sociology',]},  

    { id: 4, name: 'Coaching Center', services: [ 'Accountancy',
    'ACT Preparation',
    'Biology',
    'Business Studies',
    'Chemistry',
    'Computer Science',
    'Economics',
    'Engineering Entrance',
    'English',
    'Foreign Languages',
    'GMAT Preparation',
    'GRE Preparation',
    'History',
    'IELTS Preparation',
    'Law Entrance',
    'Mathematics',
    'Mathematics',
    'Medical Entrance',
    'Physics',
    'SAT Preparation',
    'Science',
    'Social Studies',
    'TOEFL Preparation',] },

    { id: 5, name: 'Consultant', services: [  'Education Consultants',
    'Engineering Consultants',
    'Environmental Consultants',
    'Financial Consultants',
    'Healthcare Consultants',
    'Human Resources Consultants',
    'IT Consultants',
    'Legal Consultants',
    'Management Consultants',
    'Marketing Consultants',
    'Risk Management Consultants',
    'Strategy Consultants',] },

    { id:  6, name: 'Doctors', services: ['Allergists',
    'Anesthesiologists',
    'Audiologists',
    'Ayurvedic Practitioners',
    'Cardiologists',
    'Chest Specialists',
    'Child Psychiatrists',
    'Cosmetic Surgeons',
    'Dentists',
    'Dermatologists',
    'Dietitians',
    'Endocrinologists',
    'ENT Specialists',
    'Family Medicine Practitioners',
    'Gastroenterologists',
    'General Practitioners',
    'Geneticists',
    'Geriatric Medicine Practitioners',
    'Geriatricians',
    'Hematologists',
    'Immunologists',
    'Infectious Disease Specialists',
    'Internists',
    'Naturopathic Doctors',
    'Neonatologists',
    'Nephrologists',
    'Neurologists',
    'Neurosurgeons',
    'Obstetricians',
    'Oncologists',
    'Ophthalmologists',
    'Orthodontists',
    'Orthopedic Surgeons',
    'Osteopathic Physicians',
    'Pain Management Specialists',
    'Pathologists',
    'Pediatricians',
    'Physiatrists',
    'Physicians',
    'Plastic Surgeons',
    'Podiatrists',
    'Psychiatrists',
    'Psychologists',
    'Pulmonologists',
    'Radiologists',
    'Reproductive Endocrinologists',
    'Rheumatologists',
    'Sleep Medicine Specialists',
    'Sports Medicine Physicians',
    'Surgeons',
    'Thoracic Surgeons',
    'Toxicologists',
    'Transplant Surgeons',
    'Trauma Surgeons',
    'Urologists',
    'Vascular Surgeons',
    'Veterinarians',
    'Virologists',] },

{ id: 7, name: 'Electronic', services: [ 
  'Appliance Stores',
  'Audio and Home Theater Shops',
  'Camera and Photography Stores',
  'Computer Hardware Retailers',
  'Consumer Electronics Stores',
  'DIY Electronics Supply Stores',
  'E-commerce Electronics Platforms',
  'Electric Vehicle Charging Station Retailers',
  'Electronic Components Shops',
  'Electronic Parts and Accessories Retailers',
  'Electronic Repair Shops',
  'Gaming and Entertainment Stores',
  'Home Automation and Smart Home Device Shops',
  'Industrial Electronics Suppliers',
  'Mobile Phone Store',
  'Robotics and Automation Stores',
  'Satellite and Communication Equipment Stores',
  'Specialty Tech Gadget Shops',
  'Virtual Reality and Augmented Reality Shops',
  'Watch Store',
  'Wearable Technology Stores'
  
  ]},
  
{ id: 8, name: 'Event Management', services: [ 'Charity Events',
'Concerts',
'Conferences',
'Corporate Events',
'Exhibitions/Trade Shows',
'Fashion Shows',
'Festivals or Cultural Events',
'Product Launches',
'Social Events (Parties, Anniversaries)',
'Sports Events',
'Team Building Events',
'Weddings',] },

{
  id: 9,
  name: 'Food',
  services: [
    'Catering Services',
  'Dietary Planning Services',
  'Event Catering Services',
  'Food Business Regulatory Compliance Services',
  'Food Consulting Services',
  'Food Delivery Services',
  'Food Industry Training and Workshops',
  'Food Packaging and Labeling Services',
  'Food Photography Services',
  'Food Quality Testing Services',
  'Food Safety and Inspection Services',
  'Food Truck Services',
  'Hospitality Services for Food Industry',
  'Ingredient Sourcing Services',
  'Meal Preparation Services',
  'Menu Planning Services',
  'Nutritional Services',
  ],
}, 

{ id: 10, name: 'Gym', services: [  'Cardio Equipment',
'Fitness Assessments',
'Functional Training',
'Group Fitness Classes',
'Locker Rooms',
'Massage Therapy',
'Nutritional Counseling',
'Personal Training',
'Sauna/Steam Room',
'Sports Facilities',
'Strength Training',
'Swimming Pool',
'Towel Service',
'Yoga/Pilates Classes',] },

{ id: 11, name: 'Home Services', services: ['Carpet Cleaning',
'Furniture Assembly',
'Grocery Delivery',
'Handyman Services',
'Home Organization',
'House Cleaning',
'Interior Design',
'Laundry Services',
'Lawn Care',
'Moving Services',
'Pest Control',
'Window Cleaning',] },

{ id: 12, name: 'Homeschooling', services: [ 'Computer Science',
'Fine Arts',
'Foreign Languages',
'Health Education',
'History',
'Language Arts',
'Mathematics',
'Music',
'Physical Education',
'Science',
'Social Studies',] },

{ id: 13, name: 'Hotel', services: ['Accommodation Services',
'Business and Event Services',
'Environmental Services',
'Food and Beverage Services',
'Recreational Facilities',
'Security and Safety Services',
'Special Needs Services',
'Technology Services',
'Transportation Services',] },

     {
       id: 14, name: 'Hotel', services: ['Auto Insurance Companies',
         'Bicycle Insurance Providers',
         'Furniture Insurance Firms',
         'Health Insurance Companies',
         'Home Insurance Agencies',
         'Life Insurance Companies',
         'Pet Insurance Providers',
         'Travel Insurance Companies',] },

{ id: 15, name: 'Job', services: ['Career Counseling',
'Freelance Platforms',
'Interview Preparation',
'Internship Placement',
'Job Fairs',
'Job Listings',
'Networking Events',
'Recruitment Services',
'Remote Job Opportunities',
'Resume Writing',
'Skill Assessments',
'Temporary Staffing',] },

{ id: 16, name: 'Matrimony', services: [ 'Astrology and Compatibility Analysis',
'Bridal Makeup Services',
'Event Management for Weddings',
'Honeymoon Planning',
'Matchmaking',
'Matrimonial Consultancy',
'Online Matrimonial Platforms',
'Photography and Videography Services',
'Pre-wedding Counseling',
'Wedding Planning Services',
] },

{ id: 17, name: 'Online Learning', services: ['AI&ML',
'Back End Development',
'Business Studies',
'Communication Studies',
'Computer Science',
'Criminal Justice',
'Economics',
'Engineering',
'Environmental Science',
'Fine Arts',
'Foreign Languages',
'Front End Development',
'Full Stack Development',
'Health Education',
'History',
'Hospitality Management',
'Information Technology',
'Language Arts',
'Mathematics',
'Music',
'Nursing',
'Physical Education',
'Psychology',
'Science',
'Social Studies',
'Sociology',] },

{ id: 18, name: 'Packer&mover', services: ['Customs Clearance Assistance',
'Furniture Disassembly and Assembly',
'Insurance Coverage',
'Loading and Unloading',
'Local and Long-Distance Moving',
'Packing Services',
'Packing Supplies Provision',
'Storage Facilities',
'Transportation',] },

{ id: 19, name: 'Property', services: [ 'Commercial',
'Condominium',
'Home Inspection',
'Home Staging',
'Hospitality',
'Industrial',
'Interior Design for Properties',
'Investment Property Advisory',
'Landscaping Services',
'Legal Services for Real Estate',
'Multi-family',
'Office',
'Property Appraisal',
'Property Development',
'Property Maintenance',
'Property Management',
'Rental Services',
'Residential',
'Retail',
'Single-family',
'Special Purpose',
'Townhouse',
'Vacant Land',
'Warehouse',
'Real Estate Sales',] },

{ id: 20, name: 'Rental vehicle', services: [ 'ATVs (All-Terrain Vehicles)',
'Boats',
'Buses',
'Cars',
'Limousines',
'Luxury Vehicles',
'Motorcycles',
'RVs or Campervans',
'SUVs',
'Trailers',
'Trucks',
'Vans',] },

{ id: 21, name: 'Repair&Services', services: ['Appliance Repair',
'Car Repair & Maintenance',
'Carpentry Services',
'Computer Repair',
'Electrician Services',
'Electronics Repair',
'HVAC Services',
'Home Improvement Services',
'Mobile Phone Repair',
'Painting Services',
'Plumbing Services',
'Roofing Services',] },

{ id: 22, name: 'Salon&Beauty', services: ['Beauty Parlours',
'Beauty Services',
'Bridal Makeup',
'Bridegroom Makeup',
'Body Treatments',
'Hair Services',
'Salon',
'Skincare Services',
'Spas',
'Specialized Treatments',
'Wedding planners',] },

{ id: 23, name: 'Schools', services: [  'Extracurricular Activities',
'Health Services',
'Library Facilities',
'Meal Services',
'Parent-Teacher Communication',
'Safety and Security Measures',
'Special Education Programs',
'Technology Integration',
'Transportation',] },

{ id: 24, name: 'Scholarship', services: [  'Academic Scholarships',
'Artistic Scholarships',
'Athletic Scholarships',
'Community Service Scholarships',
'Graduate Scholarships',
'International Scholarships',
'Merit-based Scholarships',
'Military Scholarships',
'Minority Scholarships',
'Need-based Scholarships',
'STEM Scholarships',
'Undergraduate Scholarships',] },

     {
       id: 25, name: 'Shops', services: ['Medical',
         'Agro Center',
         'Aluminum & Steel',
         'Bags Shop',
         'Bakery',
         'Cafes',
         'Cyber',
         'Fancy Store',
         'Footwear',
         'Grocery Store',
         'Handlooms',
         'Jewelry Store',
         'Mobile Phone Store',
         'Musical Instruments Store',
         'Optical',
         'Paints',
         'Pet Store',
         'Provisional Store',
         'Shoe Store',
         'Sport',
         'Stationary',
         'Sweet Shop',
         'Tailor',
         'Tattoo',
         'Toy Store',
         'Video & Photo Studio',
         'Watch Store',
         'Xerox Shop',
         'Other',
] },

{ id: 26, name: 'Showrooms', services: [  
  '2 Wheeler Showroom',
  '4 Wheeler Showroom',
  'Bicycle Showroom',
  'Electronic Appliances Showroom',
  'Furniture Showroom',] },


{ id: 27, name: 'Software Development', services: ['AI Development',
'Artificial Intelligence (AI) Development',
'Cloud-Based Solutions',
'Custom Software Solutions',
'Database Management Systems',
'Desktop Application Development',
'E-commerce Development',
'Embedded Systems Development',
'Enterprise Software Development',
'Game Development',
'IoT (Internet of Things) Development',
'Mobile App Development',
'Web Development',] },

{ id:28, name: 'Universities', services: [  'Accounting',
'Animation and Multimedia',
'Architecture',
'Automobile Engineering',
'B.E',
'B.Tech',
'Biology',
'Business Administration',
'Chemistry',
'Civil Engineering',
'Communications',
'Computer Science',
'Criminal Justice',
'Diploma Automobile Engineering',
'Diploma Civil Engineering',
'Diploma Electrical Engineering',
'Diploma in Business Administration',
'Diploma in Culinary Arts',
'Diploma in Early Childhood Education',
'Diploma in Fine Arts',
'Diploma in Fitness and Nutrition',
'Diploma in Information Technology',
'Diploma in Pharmacy',
'Diploma in Photography',
'Diploma in Yoga and Naturopathy',
'Economics',
'Education',
'Electrical Engineering',
'English Literature',
'Environmental Science',
'Event Management',
'Fashion Design',
'Fashion Designing',
'Film Making',
'Fine Arts',
'Graphic Design',
'Healthcare Administration',
'History',
'Hospitality and Tourism Management',
'Hospitality Management',
'Information Technology',
'Interior Design',
'Journalism',
'Mathematics',
'Mechanical Engineering',
'Media Studies',
'Music',
'Nursing',
'Pharmacy',
'Physics',
'Political Science',
'Psychology',
'Sociology',]},

{ id: 29, name: 'Wedding', services: [ 'Accommodation services',
'Bartending services',
'Beauty parlors',
'Bouquets',
'Boutiques',
'Bridesmaid dresses',
'Calligraphy services',
'Catering services',
'Ceremony musicians',
'Cinematographers',
'Dancers or performers',
'Day-of coordinators',
'Decorators',
'Destination wedding services',
'Dessert tables',
'DJs',
'Drone services',
'Event designers',
'Florists',
'Flower arrangements',
'Groom makeup artists',
'Grooms attire providers',
'Hair stylists',
'Honeymoon planners',
'Invitation designers',
'Jewelry stores',
'Limousine services',
'Live bands',
'Nail salons',
'Outdoor locations',
'Photo booths',
'Photographers',
'Religious or spiritual advisors',
'Shuttle services',
'Solo musicians',
'Spa services',
'Stationery printing',
'Tuxedo rentals',
'Vintage car rentals',
'Wedding cakes and bakeries',
'Wedding officiants',
'Wedding venues',] },

{ id: 30, name: 'Other', services: ['Catering Services',
'Cleaning Services',
'Consulting Services',
'Design Services',
'Entertainment Services',
'Financial Services',
'Fitness Services',
'Healthcare Services',
'Insurance Services',
'Legal Services',
'Logistics Services',
'Maintenance Services',
'Marketing Services',
'Research Services',
'Security Services',
'Transportation Services',
'Translation Services'] }, ];

  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(initialCategories);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopDetails, setShopDetails] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState([]);
  const [inputService, setInputService] = useState('');
  const [filteredServices, setFilteredServices] = useState('');
  const [addedServices, setAddedServices] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const colorScheme = useColorScheme();

useEffect(() => {
    if (selectedCategory) {
      setFilteredServices(selectedCategory.services);
    }
  }, [selectedCategory]);
  const handleCategoryChange = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    setSelectedCategory(category);
  };
  const handleServiceChange = (serviceName) => {
    setInputService(serviceName);
  };
  const filterCategories = (text) => {
    const filtered = initialCategories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };
  const filterServices = (text) => {
    setInputService(text);
    if (selectedCategory) {
      const filtered = selectedCategory.services.filter((service) =>
        service.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredServices(filtered);
    }
    setInputService(text)
  };
  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        onPress={() => handleCategoryChange(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderServiceItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        onPress={() => addServiceToList(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  










const handleRegister = async () => {
    if (
      fullName.trim() === '' ||
      email.trim() === '' ||
      phoneNumber.trim() === '' ||
      shopDetails.trim() === '' ||
      shopAddress.trim() === '' ||
      street.trim() === '' ||
      city.trim() === '' ||
      state.trim() === '' ||
      zipCode.trim() === '' ||
      experience.trim() === '' ||
      description.trim() === '' ||
      selectedCategory === null ||
      addedServices.length === 0
    ) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarVisible(true);
      return;
    }
  
    const db = firestore();
  
    try {
      const user = auth().currentUser;
  
      // Check if the shop with the same name, address, and phone number exists
      const shopExists = await db
        .collection('BusinessListing')
        .where('shopDetails', '==', shopDetails)
        .where('shopAddress', '==', shopAddress)
        .where('phoneNumber', '==', phoneNumber)
        .get();
  
      if (!shopExists.empty) {
        setSnackbarMessage('Shop with the same name, address, and phone number already exists');
        setSnackbarVisible(true);
        return;
      }
  
      // Continue with business listing if the shop name, address, and phone number don't match any existing shop
  
      const businessData = {
        user: user.uid,
        fullName,
        email,
        phoneNumber,
        categories: selectedCategory ? [selectedCategory.name] : [],
        shopDetails,
        shopAddress,
        street,
        state,
        city,
        inputService,
        addedServices,
        zipCode, 
        documents,
        experience,
        description,
        kycStatus: 'pending',
        profileImage,
      };
  
      // Add business data to the "BusinessListing" collection
      await db.collection('BusinessListing').add(businessData);
  
      await db.collection('KYCNotCompleted').doc(user.uid).set({
        userId: user.uid,
      });
  
      navigation.navigate('BusinessDetailPage', { documents, fullName, shopDetails });
      Alert.alert('Success', 'Business listed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to list the business');
      console.error('Error adding business: ', error);
    }
  };
  
  

  // Function to retrieve user details from the collection
  const getUserDetails = async () => {
    try {
      // Get the current user
      const currentUser = auth().currentUser;
      if (currentUser) {
        // Fetch user details from Firestore using the current user's UID
        const userDetailsSnapshot = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDetailsSnapshot.exists) {
          const userDetails = userDetailsSnapshot.data();
          return userDetails;
        } else {
          throw new Error('User details not found');
        }
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };

  // Modified image upload functions
  const handleImageUpload = async () => {
    try {
      // Fetch user details
      const userDetails = await getUserDetails();
      const { username, uid } = userDetails;

      const pickedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      const storageTasks = pickedImages.map(async (pickedImage, index) => {
        try {
          const reference = storage().ref(`images/${username}_${uid}/image_${index}.jpg`);
          await reference.putFile(pickedImage.path);
          const downloadURL = await reference.getDownloadURL();
          return downloadURL;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      });

      const imagesURLs = await Promise.all(storageTasks);

      console.log('Uploaded image URLs:', imagesURLs);
      setSelectedImages(pickedImages);
      setDocuments(imagesURLs);
    } catch (error) {
      console.error('Error picking images:', error);
    }
  };

  const handleProfileImageUpload = async () => {
    try {
      // Fetch user details
      const userDetails = await getUserDetails();
      const { username, uid } = userDetails;

      const pickedImage = await ImagePicker.openPicker({
        // ... (ImagePicker configuration)
      });

      const imageUrl = await uploadProfileImage(pickedImage, username, uid);
      setProfileImage(imageUrl, uid);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadProfileImage = async (image, username, userUID) => {
    try {
      const reference = storage().ref(`profile_images/${username}_${userUID}/user_profile.jpg`);
      await reference.putFile(image.path);
      const downloadURL = await reference.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  };






  const addService = () => {
    if (inputService.trim() !== '' && !addedServices.includes(inputService)) {
      setAddedServices([...addedServices, inputService]);
      setInputService('');
    }
  };

  const addServiceToList = (serviceName) => {
    if (!addedServices.includes(serviceName)) {
      setAddedServices([...addedServices, serviceName]);
      setInputService(serviceName);
    }
  };
const removeService = (index) => {
  const updatedServices = [...addedServices];
  updatedServices.splice(index, 1);
  setAddedServices(updatedServices);
};
const handlePhoneNumberChange = (text) => {
  // Remove non-numeric characters from the input
  const formattedPhoneNumber = text.replace(/[^0-9]/g, '');

  // Limit the phone number to 10 digits
  const trimmedPhoneNumber = formattedPhoneNumber.slice(0, 10);

  // Update the state with the formatted phone number
  setPhoneNumber(trimmedPhoneNumber);
};
const handleZipCodeChange = (text) => {
  // Remove non-numeric characters from the input
  const formattedZipCode = text.replace(/[^0-9]/g, '');

  // Limit the zip code to 6 digits
  const trimmedZipCode = formattedZipCode.slice(0, 6);

  // Update the state with the formatted zip code
  setZipCode(trimmedZipCode);
};


const handleExperience = (text) => {
  // Remove non-numeric characters from the input
  const formattedExperience = text.replace(/[^0-9]/g, '');

  // Limit the experience to 2 digits
  const trimmedExperience = formattedExperience.slice(0, 2);

  // Update the state with the formatted experience
  setExperience(trimmedExperience);
};


const handleDescriptionChange = (text) => {
  setDescription(text);
};

 


  return (

    <SafeAreaView>
    <ScrollView>

    <TouchableOpacity onPress={handleProfileImageUpload}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.addProfileContainer}>
            <Text style={styles.addProfileText}>Add Profile</Text>
          </View>
        )}
      </TouchableOpacity>


     <View style={styles.container}>
      <Text style={styles.FieldName}>Name : </Text>
      <GradientTextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']}
      />
    <Text style={styles.FieldName}>Email : </Text>
      <GradientTextInput
      style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']}
      />
     
     <Text style={styles.FieldName}>Phone : </Text>
    <GradientTextInput
      style={styles.input}
      placeholder="Phone Number"
      value={phoneNumber}
      onChangeText={handlePhoneNumberChange}
      colors={['#0425993D', '#04259900', '#CAD4F5']}
    />
      

       <Text style={styles.FieldName}>Shop Name : </Text>
      <GradientTextInput
      style={styles.input}
        placeholder="Shop Details"
        value={shopDetails}
        onChangeText={text => setShopDetails(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']} 
      />

       <Text style={styles.FieldName}>Shop Address : </Text>      
      <GradientTextInput
      style={styles.input}
        placeholder="Shop Address"
        value={shopAddress}
        onChangeText={text => setShopAddress(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']}
      />



<Text style={styles.FieldName}>Street : </Text>      
      <GradientTextInput
      style={styles.input}
        placeholder="Shop Address"
        value={street}
        onChangeText={text => setStreet(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']}
      />



<Text style={styles.FieldName}>City : </Text>      
      <GradientTextInput
      style={styles.input}
        placeholder="Shop Address"
        value={city}
        onChangeText={text => setCity(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']}
      />


<Text style={styles.FieldName}>State : </Text>      
      <GradientTextInput
      style={styles.input}
        placeholder="Shop Address"
        value={state}
        onChangeText={text => setState(text)}
        colors={['#0425993D', '#04259900', '#CAD4F5']}
      />


<Text style={styles.FieldName}>Zip Code: </Text>
<GradientTextInput
  style={styles.input}
  placeholder="Zip Code"
  value={zipCode}
  onChangeText={handleZipCodeChange}
  colors={['#0425993D', '#04259900', '#CAD4F5']}
/>
      

          <View style={{ flex: 1, backgroundColor: '#fff', }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18,color:'black' }}> Business </Text>
            <TextInput
              style={{
                borderWidth: 1,
                margin: 5,
                padding: 5,
                color: 'black',  // Text color
                
              }}
              placeholder="Search Categories"
              onChangeText={(text) => filterCategories(text)}
            />
            <View style={{ display:'flex ',justifyContent:'center', alignItems:'center'}}>
              <Picker style={styles.selection} selectedValue={selectedCategory ? selectedCategory.name : null} onValueChange={handleCategoryChange}>
                {filteredCategories.map((category) => (
                  <Picker.Item key={category.id} label={category.name} value={category.name} />
                ))}
              </Picker>
           </View>
      </View>


          <View style={{ flex: 2, backgroundColor: '#A87C7C', color: 'black', marginTop: 20 }}>
        {selectedCategory && (
            <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18,color:'black'}}>
                  Services
                </Text>
                <TextInput
                  style={{ borderWidth: 1, margin: 5, padding: 5, backgroundColor: '#BFCFE7', color: 'black' }}
                  placeholder='Add Services'
                  value={inputService}
                  onChangeText={(text) => filterServices(text)}
                />
                <FlatList
                  data={filteredServices}
                  renderItem={renderServiceItem}
                  keyExtractor={(item, index) => index.toString()}
                  style={{ color: colorScheme === 'dark' ? 'black' : 'black' }}
                />

                <Button title="Add Service" onPress={addService} />
                <Text style={{ marginTop: 10, fontWeight: 'bold',color:'black' }}>Added Services:</Text>
                <FlatList
                  data={addedServices}
                  renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', color: 'black' }}>
    
          <TouchableOpacity
                        style={{ padding: 5, backgroundColor: '#4CB9E7', marginTop: 5, flex: 1 ,color:'black'}}
            onPress={() => console.log(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5, backgroundColor: 'red', marginTop: 5 }}
        onPress={() => removeService(index)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
    </View>
        )}
     
     
     
          </View>
    

      <Text style={styles.FieldName}>Experience</Text>
<GradientTextInput
  style={styles.input}
  placeholder="Experience"
  value={experience}
  onChangeText={handleExperience}
  colors={['#0425993D', '#04259900', '#CAD4F5']}
/>


<Text style={styles.FieldName}>Description: </Text>
      <TextInput
       style={styles.descriptionInput}
        placeholder="Business Description"
        value={description}
        onChangeText={handleDescriptionChange}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        colors={['#0425993D', '#04259900', '#CAD4F5']} // Replace this with your styling
      />



      <Text style={styles.multiImages}>Upload Show Image</Text>
      {uploadProgress > 0 ? (
        <View>
          <Text>Uploading: {uploadProgress.toFixed(2)}%</Text>
          <Progress.Bar progress={uploadProgress / 100} width={200} />
        </View>
      ) : (
        <View style={styles.ButtonContainer}>
          <Button title="Upload Document" onPress={handleImageUpload} style={styles.UploadBtn} />
        </View>
      )}


           {/* Display selected images with cancel (X) button and loading percentage */}
      <View style={styles.selectedImagesContainer}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.path }} style={styles.image} />
            <TouchableOpacity onPress={() => handleCancelImage(index)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Display upload progress */}
      {/* {uploadProgress > 0 && <ActivityIndicator size="large" color="#0000ff" />}
      {uploadProgress > 0 && <Text>Uploading: {uploadProgress}%</Text>} */}


      <View>
      <TouchableOpacity>
        
        <Text  onPress={handleRegister} style={styles.proceedButton} >Proceed</Text>
      </TouchableOpacity>
      </View>
    </View>

    <View style={styles.container}>
      {/* Existing components... */}

      <Snackbar
  visible={snackbarVisible}
  onDismiss={() => setSnackbarVisible(false)}
  duration={3000}
  style={[
    styles.snackbar,
    snackbarMessage.startsWith('Success') ? styles.successBackground : styles.errorBackground,
  ]}
>
  {snackbarMessage}
</Snackbar>
    </View>
    </ScrollView>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    //  alignItems : 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  // list:{
  //   color:'yellow',
  //   fontWeight:900
  // },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
    paddingHorizontal : 15, // Add margin to separate inputs
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 15,
    right: 15,
    borderRadius: 5, // Optional: Add border-radius for a rounded look
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    color: 'black', // Set text color to contrast with the gradient
  },
  ButtonContainer: {
    width: '100%',
    alignItems : 'center',
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
    // marginTop:80,
    marginBottom:80,
    marginTop:20,
  },
   FieldName:{
    color:'black',
    fontWeight:'400',
    fontSize:18,
    marginBottom:10,
    // marginStart:10
  },
  multiImages:{
    color:'black',
    fontWeight:'400',
    fontSize:18,
    marginTop:40,
    

  },
  selection:{
    backgroundColor:'lightgray',
    color:'black',
    width:260, 

  },
  proceedButton: {
    marginVertical: 30,
    textAlign: 'center',
    backgroundColor: '#4CB9E7',
    paddingVertical: 20,
    borderRadius: 50,
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
    // Shadow properties
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6, // For Android
  },
  
  snackbar: {
    position: 'relative',
    marginBottom:400,
    marginLeft:80,
    alignSelf: 'center',
    borderRadius: 8,
    padding: 8,
    width:260,
  },
  successBackground: {
    backgroundColor: 'green', // Green background for success
  },
  errorBackground: {
    backgroundColor: '#ccc', // Light gray background for error
    borderWidth: 1,
    borderColor: 'red',
    color:'black' // Red border for error
  },
  ButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  UploadBtn: {
    // Your button styles here
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius:10,
  },
  cancelButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(138, 205, 215, 0.9)',
    borderRadius: 50,
    padding: 5, // Increase padding to fit the text properly
    height: 20, // Adjust height to fit the text
    width: 20, // Adjust width to fit the text
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'black', // Set the color for the "X" text
    fontSize: 12, // Adjust font size if needed
    fontWeight: 'bold',
    position:'absolute',
    top:1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf:'center',
    marginVertical:20,
  },
  addProfileContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    
  },
  addProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
    textAlign:'center',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    color:'black',
    maxHeight: 120,
     // Set maximum height for 4 lines (adjust as needed)
  },



});

export default BusinessListingPage;