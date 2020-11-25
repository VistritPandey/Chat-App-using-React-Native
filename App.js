// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import 'firebase/firestore'
import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
{/* <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.1.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.1.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>*/}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
export default function App() {
  const [user, setUser ] = useState(null)
  useEffect (() => {
    readUser()
  }, [])
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
