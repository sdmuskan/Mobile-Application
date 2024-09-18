import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const Sc = () => {
    const openWebLink = (url) => {
        Linking.openURL(url); // Open URL in browser
    };

    const buttonTitles = [
        { title: 'Rajiv Gandhi National Fellowship', link: 'https://rgnf.ugc.ac.in/' },
        { title: 'National Overseas Scholarship', link: 'https://overseas.tribal.gov.in/' },
        { title: 'Post Matric Scholarship', link: 'https://transformingindia.mygov.in/scheme/post-matric-scholarship-for-scheduled-caste-students/' },
        { title: 'Pre-Matric and Post-Matric Scholarships', link: 'https://scholarships.gov.in/fresh/loginPage' },
        { title: 'UNCF Scholarships', link: 'https://uncf.org/scholarships' },
        { title: 'Central Sector Scholarship Scheme of Top Class Education for SC Students', link: 'https://tcs.dosje.gov.in/' },
        // Add more titles and corresponding links
    ];

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {/* Button grid */}
                    {buttonTitles.map(({ title, link }, index) => (
                        <View key={index} style={styles.rowContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    openWebLink(link); // Open the URL when the button is pressed
                                }}
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
        marginTop: 50,
    },
    rowContainer: {
        marginBottom: 15,
    },
    button: {
        width: 250,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'skyblue',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
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

export default Sc;
