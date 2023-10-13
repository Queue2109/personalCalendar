import { set, ref, get, child, orderByChild, equalTo, query, orderByKey, limitToLast, onChildAdded } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";

export function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}


export const reformatDate = (date) => {
  // from 2023-10-08 to October 8, 2023
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const reformattedDate = monthNames[month - 1] + " " + day + ", " + year;
  return reformattedDate;
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
    } else if(type === "firstPeriod") {
      return date;
    }
  }
  try{
    if(type === "mood") {
    set(ref(db, `users/${uid}/${date}/${type}/${index}`), value());
    } else if(type === "firstPeriod") {
      set(ref(db, `users/${uid}/${type}`), value());
    } else {
      set(ref(db, `users/${uid}/${date}/${type}`), value());
    }

  } catch(e) {
    console.log(e);
  }
}

export const retrieveData = async (path, date) => {
  if(path === "firstPeriod") {
    try {
      const uid = await AsyncStorage.getItem('token');
      const snapshot = await get(child(ref(db), `users/${uid}/${path}`));
      if (snapshot.exists()) {
        return snapshot.val(); // Return the value to the caller
      } else {
        return {}; // You might consider returning null or another suitable value when no data is available
      }
    } catch(e) {
      console.log(e);
    }
  }
  try {
    const uid = await AsyncStorage.getItem('token');
    const snapshot = await get(child(ref(db), `users/${uid}/${date}/${path}`));

    if (snapshot.exists()) {
      return snapshot.val(); // Return the value to the caller
    } else {
      return null; // You might consider returning null or another suitable value when no data is available
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for the caller to handle
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

// add database entries from firstPeriod to today for cycleDay
export const databaseEntries = async (firstDate, lastDate, cycleDay) => {

  let end = false;
  const date = new Date(firstDate);
  const uid = await AsyncStorage.getItem('token');
  if(cycleDay === 0) {
    retrieveData("cycleDay", firstDate).then((day) => {
      cycleDay = day;
      date.setDate(date.getDate() + 1);
    }
    )};
  
  // enter cycle days from firstDate to lastDate
  while (!end) {
    const formattedDate = date.toISOString().slice(0, 10); 

    let retrievedData = await retrieveData('', formattedDate);
    if(retrievedData === null) {
      retrievedData = {};
    }

    if(retrievedData.cycleDay !== null && retrievedData.cycleDay === 1 || formattedDate >= lastDate && lastDate !== '' || date >= new Date()) {
      end = true
      break
     }
    retrievedData.cycleDay = cycleDay;
    // assume that period lasts 4 days
    if(retrievedData.cycleDay < 5) {
      retrievedData.period = "yes"
    }

    set(ref(db, `users/${uid}/${formattedDate}`), retrievedData) // set cycleDay and period for this date
    cycleDay++;
    date.setDate(date.getDate() + 1);
  }
};

// find the first logged period in database after given date => if there is none, return the end date after 28 days
export const logPeriodDb = async (date) => {
  let dayOfCycle = await retrieveData("cycleDay", date);
  
  if(dayOfCycle === null || dayOfCycle > 10) {
    
    const firstPeriod = await retrieveData("firstPeriod", date)
    const newDate = new Date(firstPeriod)
    // if the latest period was more recent than the logged one, set logged as a new latest period
    if(newDate > new Date(date)) {
      await addToDatabase(0, "firstPeriod", date)
      await databaseEntries(date, firstPeriod, 1)
    } else if (newDate < new Date()) {
      await databaseEntries(date, '', 1)
    }
   }
}

export const deletePeriodAfterDay = async (date) => {
  const periodEndDate = new Date(date);
  while(true) {
    const hasPeriod = await retrieveData("period", periodEndDate.toISOString().slice(0, 10));
    if(hasPeriod === "yes") {
      addToDatabase(1, "period", periodEndDate.toISOString().slice(0, 10))
      periodEndDate.setDate(periodEndDate.getDate() + 1);
    } else {
      break;
    }
  }
}

export const lastTimeOpened = async () => {
  const currentDate = getCurrentDate()
  const lastDate = await AsyncStorage.getItem('lastDate');
  if(currentDate !== lastDate) {
    await AsyncStorage.setItem('lastDate', currentDate);
    databaseEntries(lastDate, currentDate, 0);
    return true;
  }
}
