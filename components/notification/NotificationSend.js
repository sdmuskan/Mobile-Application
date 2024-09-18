import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { firebase } from '@react-native-firebase/app';

const SendNotification = () => {
    const colorScheme = useColorScheme();
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationText, setNotificationText] = useState('');
    const [notificationLink, setNotificationLink] = useState('');

    const sendNotification = async () => {
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            await firebase.firestore().collection('Notification').add({
                title: notificationTitle,
                text: notificationText,
                link: notificationLink,
                createdAt: timestamp,
            });
            // Reset input fields after sending notification
            setNotificationTitle('');
            setNotificationText('');
            setNotificationLink('');
            alert('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.header, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notification Title</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0', color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                    placeholder="Notification Title"
                    value={notificationTitle}
                    onChangeText={setNotificationTitle}
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={[styles.header, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notification Text</Text>
                <TextInput
                    style={[styles.textInput, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0', color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                    placeholder="Notification Text"
                    value={notificationText}
                    onChangeText={setNotificationText}
                    multiline={true}
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={[styles.header, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notification Link</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0', color: colorScheme === 'dark' ? '#fff' : '#000' }]}
                    placeholder="Notification Link"
                    value={notificationLink}
                    onChangeText={setNotificationLink}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={sendNotification}>
                <Text style={styles.buttonText}>Send Notification</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        width: '80%',
        marginBottom: 20,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        height: 150, // Increase height for multiline input
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default SendNotification;
