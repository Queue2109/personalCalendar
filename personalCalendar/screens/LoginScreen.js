import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const storeData = async (value) => {
    try {
       const token = await AsyncStorage.setItem('token', value);
       navigation.replace('Day');
    } catch (e) {
        console.log(e);
    }
  };
  
  const handleLogin = async () => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // console.log(response);
            const value = JSON.stringify(auth.currentUser.uid);
            storeData(value.substring(1, value.length - 1));
        }).catch((error) => {
            setError(error.message);
        });
        // navigation.replace('Day');
    } catch (error) {
        setError(error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.secondView}>
        <Text>Don't have an account?</Text>
        <Button title="Register" onPress={() => navigation.replace('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  secondView: {
    marginTop: 30,
  }
});

export default LoginScreen;
