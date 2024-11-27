import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { doc, getDoc, addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { Alert } from 'react-native';

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const { contactId } = route.params; // Contact's ID passed from Contact List
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const validateContacts = async () => {
      try {
        const currentUserDoc = await getDoc(doc(database, 'users', currentUserId));
        const contactUserDoc = await getDoc(doc(database, 'users', contactId));

        if (
          currentUserDoc.exists() &&
          contactUserDoc.exists() &&
          currentUserDoc.data().contacts.includes(contactId) &&
          contactUserDoc.data().contacts.includes(currentUserId)
        ) {
          loadMessages();
        } else {
          Alert.alert('Unauthorized', 'You cannot chat with this user.');
        }
      } catch (error) {
        console.error('Error validating contacts:', error);
      }
    };

    validateContacts();
  }, [contactId]);

  const loadMessages = () => {
    const messagesRef = collection(database, 'chats', `${currentUserId}_${contactId}`, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });

    return () => unsubscribe();
  };

  const onSend = useCallback((newMessages = []) => {
    const messagesRef = collection(database, 'chats', `${currentUserId}_${contactId}`, 'messages');
    const { _id, createdAt, text, user } = newMessages[0];

    addDoc(messagesRef, {
      _id,
      createdAt,
      text,
      user
    });

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: currentUserId,
        name: auth.currentUser?.displayName || 'User'
      }}
    />
  );
}
