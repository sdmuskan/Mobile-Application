import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { firebase } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsRef = firebase.firestore().collection('Notification');
        const querySnapshot = await notificationsRef.orderBy('createdAt', 'desc').get();
        const fetchedNotifications = [];

        querySnapshot.forEach((doc) => {
          const notificationData = doc.data();
          const notification = { id: doc.id, ...notificationData };
          fetchedNotifications.push(notification);
        });

        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch notifications when the component mounts
    fetchNotifications();

    // Subscribe to real-time updates
    const unsubscribe = firebase.firestore().collection('Notification')
      .onSnapshot(() => {
        fetchNotifications();
      });

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleNotificationClick = (notificationId) => {
    // Update the read status of the clicked notification
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);

    // Handle click to view full notification details
    // You can navigate to a different screen to display full details
    navigation.navigate('NotificationDetails', { notificationId });
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
      <Text style={[styles.pageTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Notifications</Text>
      <View style={styles.notificationList}>
        {notifications.map(notification => (
          <View
            key={notification.id}
            style={[
              styles.notificationContainer,
              { backgroundColor: notification.read ? '#f2f2f2' : '#fff' } // Light gray for read, white for unread
            ]}
          >
            <TouchableOpacity
              style={styles.notificationItem}
              onPress={() => handleNotificationClick(notification.id)}
            >
              <Text
                style={[
                  styles.notificationTitle,
                  { fontWeight: notification.read ? 'normal' : 'bold' }, // Highlight unread messages
                  { color: colorScheme === 'dark' ? '#fff' : '#000' },
                ]}
              >
                {notification.title}
              </Text>
              <Text style={[styles.notificationTimestamp, { color: colorScheme === 'dark' ? '#bbb' : '#777' }]}>
                {new Date(notification.createdAt.seconds * 1000).toLocaleString()}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, // Align notifications to upper side
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationList: {
    width: '90%',
  },
  notificationContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  notificationTitle: {
    marginBottom: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
  },
});

export default Notification;
