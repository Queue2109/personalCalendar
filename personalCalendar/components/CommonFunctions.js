import { set, ref, get, child } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";

export function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

const arrayOfMoods = ["happy", "sad", "angry", "tired", "anxious"];
const arrayOfFlows = ["none", "light", "medium", "heavy", "spotting"];
const arrayOfPeriods = ["yes", "no"];

export const addToDatabase = async (index, type, date) => {
  const uid = await AsyncStorage.getItem('token');
  const value = () => {
    if(type === "mood") {
      return arrayOfMoods[index];
    } else if(type === "flow") {
      return arrayOfFlows[index];
    } else if(type === "period") {
      return arrayOfPeriods[index];
    } else if(type === "image") {
      return "yes";
    } else if(type === "latestPeriod") {
      return date;
    }
  }
  try{
    if(type === "mood") {
    set(ref(db, `users/${uid}/${date}/${type}/${index}`), value());
    } else if(type === "latestPeriod") {
      set(ref(db, `users/${uid}/${type}`), value());
    } else {
      set(ref(db, `users/${uid}/${date}/${type}`), value());
    }

  } catch(e) {
    console.log(e);
  }
}

export const retrieveData = async (path, date) => {
  try {
    const uid = await AsyncStorage.getItem('token');
    get(child(ref(db), `users/${uid}/${date}/${path}`)).then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        } else {
          console.log("No data available");
        }
      }
    ).catch((error) => {
        console.error(error);
    });
  } catch (e) {
    console.log(e);
  }
};

export const loggedDates = async () => {
  const uid = await AsyncStorage.getItem('token');
  const commentsRef = ref(db, 'users/' + uid);
  const snapshot = await get(commentsRef);
  const objects = {};

  snapshot.forEach((childSnapshot) => {
    const numOfLogs = Object.keys(childSnapshot.val()).length;
    const date = childSnapshot.key;
    if(date.length > 10) {
      return false;
    }
    if(numOfLogs > 1) {
      objects[date] = {marked: true};
      if(childSnapshot.val().period == "yes") {
        objects[date] = {marked: true, selected: true, selectedColor: '#f58e91'};
      } 
    }
  })
  return objects;
}