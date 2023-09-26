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

export function reformatDate(date) {
    // Parse the input date string into a Date object
  const dateParts = date.split('-');
  console.log(dateParts);
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JavaScript
  const day = parseInt(dateParts[2]);

  console.log(year);
  console.log(month);
  console.log(day);


  const inputDateObj = new Date(year, month, day);

  // Format the date components
  const formattedDay = String(inputDateObj.getDate()).padStart(2, '0');
  const formattedMonth = String(inputDateObj.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's 0-indexed
  const formattedYear = String(inputDateObj.getFullYear());

  // Combine the formatted components into the desired format
  const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
    console.log( "hello",formattedDate);

  return formattedDate;
}

const stringToDate = (date) => {
// 2023-12-31
  const [day, month, year] = date.split('-');
  
  const dateObject = `${year}-${month}-${day}`
  return dateObject;
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
    }
  }
  console.log(value);
  try{
    if(type === "mood") {
    set(ref(db, `users/${uid}/${date}/${type}/${index}`), value());
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
    if(numOfLogs > 1) {
      const date = stringToDate(childSnapshot.key);
      objects[date] = {marked: true};
      if(childSnapshot.val().period == "yes") {
        objects[date] = {marked: true, selected: true, selectedColor: '#f58e91'};
      }
    } 
  })
  return objects;
}