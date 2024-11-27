import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    const userDocRef = doc(database, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log('Fetched contacts:', data.contacts); // Debugging log
        setContacts(data.contacts || []);
      } else {
        console.log('User document does not exist.');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const navigateToChat = (contactId) => {
    if (!contactId) {
      Alert.alert('Error', 'Invalid contact ID');
      return;
    }

    console.log('Navigating to chat with contactId:', contactId); // Debugging log
    navigation.navigate('Chat', { contactId }); // Pass the contact ID to Chat screen
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => navigateToChat(item)}
          >
            <Text style={styles.contactText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No contacts found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3
  },
  contactText: {
    fontSize: 16,
    fontWeight: '500'
  }
});

