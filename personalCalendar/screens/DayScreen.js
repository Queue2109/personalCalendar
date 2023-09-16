import {React, useState, useEffect} from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db, storage } from '../firebaseConfig';
import DropdownMenu from "../components/DropdownMenu";
import { get, ref as databaseRef, child, set } from "firebase/database";
import { getCurrentDate, reformatDate } from "../components/CommonFunctions";
import { getDownloadURL, ref as storageRef} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// for each day separate, there has to be a new log into the database
// should i make this log when a user presses on day? probably.
// one log per day, and then the user can add to that log

function DayScreen({navigation}) {

    const [dataValues, setDataValues] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const [image, setImage] = useState(null);
    const [day, setDay] = useState(null);
    
    const setDayFun = async () => {
        const temp = await AsyncStorage.getItem('date');
        console.log(temp + "uau");
        if(temp == null) {
            setDay(getCurrentDate());
            AsyncStorage.setItem('date', getCurrentDate());
        } else {
            setDay(temp);
        }
        
    }

    const getImage = async () => {
        try {
          const imagePath = `images/${auth.currentUser.uid}/${day}.jpg`;
          const storageReference = storageRef(storage, imagePath);
      
          // Attempt to get the download URL for the image
          const url = await getDownloadURL(storageReference);
          setImage(url);
          
          return true;

        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            // Handle the case where the image does not exist
            console.log('Image does not exist.');
            return false;
          } else {
            // Handle other errors
            console.error('Error getting image:', error);
            throw error;
          }
        }
    };
    
    const retrieveData = async () => {
        try {
            get(child(databaseRef(db), 'users/' + auth.currentUser.uid + '/' + day)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  console.log("this day:" + day);
                    setDataValues(Object.values(snapshot.val()));
                    setDataKeys(Object.keys(snapshot.val()));
                    getImage();
                } else {
                  console.log("No data available");
                    //   make log for this day
                
                    set(databaseRef(db, 'users/' + auth.currentUser.uid + '/' + day), {
                        mood: '',
                    });
                }
              }
            ).catch((error) => {
                console.error(error);
              });
            // console.log(token);
        } catch (e) {
            console.log(e);
            // saving error
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await setDayFun(); // Wait for setDayFun to complete
            await retrieveData(); // Wait for retrieveData to complete
         };
      
          fetchData();
    }, []);

    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.calendar}>
                <Image source={require('../assets/calendar.png')} style={{width: 50, height: 50}}></Image>
            </TouchableOpacity>
            <DropdownMenu navigation={navigation}></DropdownMenu>
            <View style={styles.screen}>
                <Text>{dataValues[0]}</Text>
                <Button title="ADD" onPress={() => navigation.navigate('AddLogs')}></Button>
                <View style={{alignItems: 'center'}}>
                    <Image style={styles.image} source={{uri: image}}></Image>
                </View>
                <FlatList
                data={dataKeys}
                renderItem={({item, index}) => (
                    <View>
                        <Text>{item}</Text>
                        <Text>{dataValues[index]}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => item.toString()} 
                ></FlatList>

            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        position: 'relative',
        flex: 1,
    },
    screen: {
        zIndex: -1,
    },
    calendar: {
        position: 'absolute',
        top: -40,
        right: 70,
        zIndex: 1,
    },
    image: {
        transform: [{scaleX: -1}],
        width: 150,
        aspectRatio: 9/16,
        resizeMode: 'contain',
        alignItems: 'center',
    }
    
})
export default DayScreen;