import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Linking,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import stringSimilarity from 'string-similarity';


const SearchResultScreen = ({ route, navigation }) => {
    const { searchResults } = route.params;
    const [searchText, setSearchText] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
    const [selectedCitySort, setSelectedCitySort] = useState(null);

    useEffect(() => {
        setFilteredResults(searchResults);
    }, [searchResults]);

  
    
    // ...

    // Utility function for case-insensitive string matching
    const containsIgnoreCase = (text, search) => {
        return text.toLowerCase().includes(search.toLowerCase());
    };

    // ...

    const handleSearch = (text) => {
        setSearchText(text);

        if (text.trim() === '') {
            // If the search input is empty, show all results
            setFilteredResults(searchResults);
            return;
        }

        const results = searchResults.filter((user) => {
            const match =
                user.shopDetails &&
                user.fullName &&
                (containsIgnoreCase(user.shopDetails, text) ||
                    containsIgnoreCase(user.fullName, text) ||
                    (user.categories && user.categories.some(category => containsIgnoreCase(category, text))) ||
                    (user.addedServices && user.addedServices.some(service => containsIgnoreCase(service, text)))
                );

            return match;
        });

        // If no exact match is found, include similar results based on some criteria
        const similarResults = searchResults.filter((user) => {
            const similarityThreshold = 0.6; // You can adjust this threshold based on your preference
            const shopDetailsSimilarity = stringSimilarity.compareTwoStrings(user.shopDetails.toLowerCase(), text.toLowerCase());
            const fullNameSimilarity = stringSimilarity.compareTwoStrings(user.fullName.toLowerCase(), text.toLowerCase());
            const categoriesSimilarity = user.categories ? Math.max(...user.categories.map(category => stringSimilarity.compareTwoStrings(category.toLowerCase(), text.toLowerCase()))) : 0;
            const addedServicesSimilarity = user.addedServices ? Math.max(...user.addedServices.map(service => stringSimilarity.compareTwoStrings(service.toLowerCase(), text.toLowerCase()))) : 0;

            return (
                user.shopDetails &&
                user.fullName &&
                (
                    shopDetailsSimilarity >= similarityThreshold ||
                    fullNameSimilarity >= similarityThreshold ||
                    categoriesSimilarity >= similarityThreshold ||
                    addedServicesSimilarity >= similarityThreshold
                )
            );
        });

        setFilteredResults(results.length > 0 ? results : similarResults);
    };

    // ...





    const handleCardPress = (user) => {
        navigation.navigate('Detail', { user });
    };

    const handleCitySortAZ = () => {
        const sortedByCityAZ = filteredResults
            .slice()
            .sort((a, b) => a.city.localeCompare(b.city));
        setFilteredResults(sortedByCityAZ);
        setSelectedCitySort('AZ');
    };

    const handleCitySortZA = () => {
        const sortedByCityZA = filteredResults
            .slice()
            .sort((a, b) => b.city.localeCompare(a.city));
        setFilteredResults(sortedByCityZA);
        setSelectedCitySort('ZA');
    };

    const clearCitySort = () => {
        setFilteredResults(searchResults);
        setSelectedCitySort(null);
    };

    const toggleFilterOptions = () => {
        setFilterOptionsVisible(!filterOptionsVisible);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
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
                                {/* Add your filter options UI here */}
                                <Text>Filter Options</Text>
                            </View>
                        )}

                        <View style={styles.rowContainer}>
                            {filteredResults?.map((user, index) => (
                                <TouchableOpacity
                                    style={styles.card}
                                    key={index}
                                    onPress={() => handleCardPress(user)}>
                                    <View style={styles.imageContainer}>
                                        {user.profileImage ? (
                                            <Image
                                                source={{ uri: user.profileImage }}
                                                style={styles.image}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <Image
                                                // source={require('../../../assets/images/medical-team.png')}
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
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 500,
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
        color: '#4895ef',
    },
    shop: {
        color: '#4361ee',
        fontSize: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#c5c5c5',
        fontWeight: '900',
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
        marginHorizontal: 30,
        color: 'red'
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

export default SearchResultScreen;
