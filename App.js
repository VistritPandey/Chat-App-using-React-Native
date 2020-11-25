// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, giftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, Text, View, YellowBox, Button, TextInput } from 'react-native';
import 'firebase/firestore'
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCBv1qefu2_zjcqH_Y1nptjd-7W1y8-sw0",
  authDomain: "vistrit-first-app.firebaseapp.com",
  databaseURL: "https://vistrit-first-app.firebaseio.com",
  projectId: "vistrit-first-app",
  storageBucket: "vistrit-first-app.appspot.com",
  messagingSenderId: "290356012423",
  appId: "1:290356012423:web:9a49bcc76ba4fd0d715f22",
  measurementId: "G-BMNBKB5WYJ"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')
export default function App() {
  const [user, setUser ] = useState(null)
  const [name, setName ] = useState('')
  const [messages, setMessages] = useState([])

  
  useEffect(() => {
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot.docChanges().filter(({ type }) => type === 'added')
        .map(({ doc }) => {
                const message = doc.data()
                return { ...message, createdAt: message.createdAt.toDate() }
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
}, [messages])

const appendMessages = useCallback(
  (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  },
  [messages]
)

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }
  
  async function handlePress() {
    const _id = Math.random().toString(36).substring(7)
    const user = { _id, name }
    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  async function handleSend(messages){
    const writes = messages.map(m => chatsRef.add(m))
    await Promise.all(writes)
  }


  if (!user) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter name" value={name} onChangeText={setName} />
            <Button onPress={handlePress} title="Enter the chat" />
        </View>
    )
}
  return (
      <GiftedChat messages= {messages} user={user} onSend={handleSend} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',
    marginBottom: 20,
  }
});
