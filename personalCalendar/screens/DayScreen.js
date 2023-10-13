import {React, useState, useEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image} from "react-native";
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref as storageRef} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddLogsButton from "../components/AddLogsButton";
import { retrieveData, lastTimeOpened } from "../components/CommonFunctions";

function DayScreen({navigation, route}) {

    const [image, setImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const {date} = route.params;
    const [cycleDay, setCycleDay] = useState('');
    const [displaySymptoms, setDisplaySymptoms] = useState(false);
    const [editMode, setEditMode] = useState(true)

    // determine cycle day, if date is in the future or in the past (before any period was logged)
    const determineCycleDay = async () => {
        const lastDateLogged = await AsyncStorage.getItem('lastDate');
        if(new Date(lastDateLogged) < new Date(date)) {
            
            setEditMode(false)
            
            const lastCycleDay = await retrieveData("cycleDay", lastDateLogged).then((day) => {
                return day
            })
            
            const difference = Math.abs(new Date(date) - new Date(lastDateLogged))/(1000 * 60 * 60 * 24);
            setCycleDay("Cycle day " + (lastCycleDay + difference));
        } else {
            setCycleDay("No period logged before this date")
        }
    }

    const setDayFun = async () => {
        const token = await AsyncStorage.getItem('token');
        setCurrentUser(token);

        retrieveData("cycleDay", date).then((day) => {
            if(day === null) {
                determineCycleDay()
            }
            setCycleDay("Cycle day " + day)
        });
        await AsyncStorage.setItem('currentDate', date);
        await getImage()
        
    }

    const getImage = async () => {
        try {
            const imagePath = `images/${currentUser}/${date}.jpg`;
            const storageReference = storageRef(storage, imagePath);
            // Attempt to get the download URL for the image
            const url = await getDownloadURL(storageReference).then((uri) => {
                setImage(uri);
                return uri
            })
            console.log(url)
            console.log(imagePath)
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

    
    useEffect(() => {
        setDayFun();
        lastTimeOpened()
    }, []);
    
    return (
        <View style={styles.container}>
        {displaySymptoms ? 
        <View style={styles.symptomContainer}>
            <View>
                <Text style={styles.heading}>{cycleDay}</Text>
                
                <Image source={{uri: image}}  style={styles.image}></Image>
                

            </View>
        </View> 
        
        :
            <View style={styles.container} >
            
                <View style={styles.editButton}>
                    <AddLogsButton navigation={navigation} date={date}></AddLogsButton>
                </View>
                <View>
                    <Text style={styles.heading}>{cycleDay}</Text>
                </View>
                <TouchableOpacity onPress={() => setDisplaySymptoms(true)} style={styles.button}>
                    <Text style={styles.heading}>Symptoms</Text>
                </TouchableOpacity> 
            </View> }
        </View>
       
    );
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: 'red',
        position: 'relative',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    image: {
        transform: [{scaleX: -1}],
        width: 150,
        height: 150,
        aspectRatio: 1/1,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 10,
        // borderRadius: 10,s
    },
    editButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'pink',
        borderRadius: 50,
        paddingVertical: 20,
        padding: 10,
        marginHorizontal: 40,
    },
    symptomContainer: {
        backgroundColor: 'pink',
        margin: 20,
        marginVertical: 100,
        flex: 1,
        justifyContent: 'center'
    }
    
})
export default DayScreen;