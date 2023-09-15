// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKF5wWpDfPCwvw7Mi5RAk8SE8WgyNwis4",
  authDomain: "personalcalendar-20ecb.firebaseapp.com",
  databaseURL: "https://personalcalendar-20ecb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "personalcalendar-20ecb",
  storageBucket: "personalcalendar-20ecb.appspot.com",
  messagingSenderId: "803704940650",
  appId: "1:803704940650:web:1134a926ab52175160c213",
  measurementId: "G-DLJPXX8RNB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const db = getDatabase(app);
export const storage = getStorage();