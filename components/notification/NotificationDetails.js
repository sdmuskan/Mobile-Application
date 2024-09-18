import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { firebase } from '@react-native-firebase/app';

const NotificationDetails = ({ route }) => {
    const colorScheme = useColorScheme();
    const [notification, setNotification] = useState(null);
    const { notificationId } = route.params;

    useEffect(() => {
        const fetchNotificationDetails = async () => {
            try {
                const notificationRef = firebase.firestore().collection('Notification').doc(notificationId);
                const doc = await notificationRef.get();
                if (doc.exists) {
                    const notificationData = doc.data();
                    setNotification(notificationData);
                } else {
                    console.log('Notification not found');
                }
            } catch (error) {
                console.error('Error fetching notification details:', error);
            }
        };

        // Fetch notification details when the component mounts
        fetchNotificationDetails();

        // Clean up function to unsubscribe or clear resources if needed
        return () => {
            // Cleanup logic if needed
        };
    }, [notificationId]); // Dependency array to ensure useEffect is called when notificationId changes

    if (!notification) {
        return (
            <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
                <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notification Details</Text>
                <Text style={[styles.errorText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notification details not found</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
            <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notification Details</Text>
            <View style={styles.detailsContainer}>
                <Text style={[styles.label, { color: colorScheme === 'dark' ? '#aaa' : '#777' }]}>Title:</Text>
                <Text style={[styles.value, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{notification.title}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.label, { color: colorScheme === 'dark' ? '#aaa' : '#777' }]}>Text:</Text>
                <Text style={[styles.value, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{notification.text}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.label, { color: colorScheme === 'dark' ? '#aaa' : '#777' }]}>Link:</Text>
                <Text style={[styles.value, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{notification.link}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.label, { color: colorScheme === 'dark' ? '#aaa' : '#777' }]}>Timestamp:</Text>
                <Text style={[styles.value, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                    {notification.createdAt && new Date(notification.createdAt.seconds * 1000).toLocaleString()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
    errorText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
});

export default NotificationDetails;
