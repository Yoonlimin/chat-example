import React, { useState } from 'react';
import { View, Image, SafeAreaView, StatusBar, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../config/firebase';

const bgimage = require('../assets/bgimage.png'); // Make sure the image path is correct

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login Successful"))
        .catch((err) => Alert.alert("Login Error", err.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Image source={bgimage} style={styles.bgimage} />
    
      <View style={styles.whiteSheet} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
       
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter password"
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
           <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
           <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
             <Text style={{color: 'navy', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
           </TouchableOpacity>
         </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgimage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 180,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'navy', // Adjust this color to match the screenshot
    marginBottom: 20,
  },
  form: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F6F7FB',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'navy',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
