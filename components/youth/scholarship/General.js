import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const GENERAL = () => {
    const openWebLink = (url) => {
        Linking.openURL(url); // Open URL in browser
    };

    const buttonTitles = [
        { title: 'AICTE Pragati Scholarship for Girls', link: 'https://www.buddy4study.com/scholarship/aicte-pragati-scholarship-for-girls/' },
        { title:'INSPIRE Scholarship', link: 'https://online-inspire.gov.in/' },
        { title: 'Nirankari Rajmata Scholarship Scheme ', link: 'https://uramscholarship.in/nirankari-rajmata-scholarship/' },
        { title: 'IOCL Scholarship', link: 'https://iocl.com/Scholarships/' },
        { title: 'NSF Scholarship', link: 'https://www.northsouth.org/app6/Doc/NSFScholarshipApplication.pdf/' },
        { title: 'Pragati Scholarship', link: 'https://www.aicte-india.org/sites/default/files/FAQPRASAK.pdf/' },
        { title: 'Aikyashree Scholarship', link: 'https://infinitylearn.com/surge/blog/aikyashree-scholarship/' },
        { title: 'CCRT Scholarship', link: 'https://www.buddy4study.com/article/ccrt-scholarship/' },
        { title: 'HDFC ECSS Scholarship', link: 'https://www.hdfcbankecss.com/' },
        { title: 'National Means cum-Merit Scholarship', link: 'http://dsel.education.gov.in/scheme/nmmss/' },
        { title: 'NTSE', link: 'https://school.careers360.com/articles/ntse-application-form/' },
        { title: 'ST Scholarship', link: 'https://www.buddy4study.com/article/st-scholarship/' },
        { title: 'Athletic scholarships', link: 'https://www.buddy4study.com/article/scholarships-for-aspiring-athletes/' },
        { title: 'Bihar Scholarship', link: 'https://www.pmsonline.bih.nic.in/pmsedu/pms/Default.aspx/' },
        { title: 'Central Sector Scholarship', link: 'https://www.buddy4study.com/article/central-sector-scholarship/' },
        { title: 'Gaurav Foundation Scholarship', link: 'https://www.getmyuni.com/scholarships/gaurav-foundation-scholarship/' },
        { title: 'Government Of Madhya Pradesh Scholarship Programs', link: 'https://testbook.com/scholarships/mp-scholarships/' },
        { title: 'Indira Gandhi Scholarship', link: 'https://uramscholarship.in/indira-gandhi-single-child-scholarship/' },
        { title: 'KVPY', link: 'https://infinitylearn.com/surge/blog/kvpy-scholarship-eligibility-exam-pattern-exam-date-documents-fee-results-marking-scheme-application-form/' },
        { title: 'Maulana Azad scholarship', link: 'https://www.vidhyaa.in/blog/maulana-azad-scholarship/' },
        { title: 'NEC Merit Scholarship', link: 'https://scholarshiparena.in/nec-merit-scholarship/' },
        { title: 'PG scholarship', link: 'https://www.aicte-india.org/schemes/students-development-schemes/PG-Scholarship-Scheme/' },
       

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

export default GENERAL;



