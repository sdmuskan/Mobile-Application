import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const MINORITY = () => {
    const openWebLink = (url) => {
        Linking.openURL(url); // Open URL in browser
    };

    const buttonTitles = [
        { title: 'Merit Cum Means Based Scholarship Scheme', link: 'https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=1&ls_id=775&lid=827/' },
        { title: 'Post Matric Scholarship', link: 'https://www.myscheme.gov.in/schemes/postsm/' },
        { title: 'Minority scholarships', link: 'https://scholarships.gov.in/' },
        { title: 'Minority scholarship Maharashtra', link: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A61FF7871E24FE19D/' },
        { title: 'Begum Hazrat Mahal National Scholarship', link: 'https://scholarships.gov.in/public/schemeGuidelines/1053_G.pdf/' },
        { title: 'LPU Scholarship', link: 'https://www.lpu.in/scholarship/scholarship-on-the-basis-of-lpunest.php/' },
        { title: 'National Scholarship Portal', link: 'https://scholarships.gov.in/' },
        { title: 'Aalo Scholarship', link: 'http://aalo.org.in/application-form.php/' },
        { title: 'Nai Roshni', link: 'https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=741&lid=79./' },

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

export default  MINORITY;



