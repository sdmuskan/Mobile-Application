import React, { useState, useMemo,useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput, Animated ,StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const StudyNote = ({ navigation }) => {

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                <Text style={styles.label}>Notes Will Be Available Soon! 😊</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    label:{
        color:'gray',
        textAlign:'center',
        marginTop:50,
        fontSize:24,
        fontWeight:'900'
    }
});



export default StudyNote;