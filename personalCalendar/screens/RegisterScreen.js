import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref, get } from 'firebase/database';
import { getCurrentDate } from '../components/CommonFunctions';


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [matchingPasswords, setMatchingPasswords] = useState('');

  addToDatabase = (uid) => {
    set(ref(db, 'users/' + uid), {
      email: email,
      dateOfRegistration: getCurrentDate(),
      logs: [],
    });
  }

  const handleLogin = async () => {
    try {
        if(matchingPasswords != '') {
            return;
        }
        const response = await createUserWithEmailAndPassword(auth, email, password);
        addToDatabase(auth.currentUser.uid);
        // console.log(response);
        navigation.replace('Day');
    } catch (error) {
        setError(error.message);
    }
  };

  const checkIfMatching = (text) => {
    if (text !== password) {
        setMatchingPasswords('Passwords do not match');
    } else {
      setMatchingPasswords('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
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
       <TextInput
        style={styles.input}
        placeholder="Repeat password"
        secureTextEntry
        onChangeText={(text) => checkIfMatching(text)}
      />
      {matchingPasswords ? <Text style={styles.errorText}>{matchingPasswords}</Text> : null}

      <Button title="Register" onPress={handleLogin} />
      <View style={styles.secondView}>
        <Text>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.replace('Login')}/>
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

export default RegisterScreen;
