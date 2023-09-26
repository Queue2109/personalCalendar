import {React, useState, useEffect} from "react";
import { View, StyleSheet, } from "react-native";
import { db, storage } from '../firebaseConfig';
import { getDownloadURL, ref as storageRef} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddLogsButton from "../components/AddLogsButton";

function DayScreen({navigation, route}) {

    const [image, setImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const {date} = route.params;
    
    const setDayFun = async () => {
        const token = await AsyncStorage.getItem('token');
        setCurrentUser(token);
    }

    const getImage = async () => {
        try {
            const imagePath = `images/${currentUser}/${date}.jpg`;
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

    
    useEffect(() => {
        setDayFun();
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <AddLogsButton navigation={navigation} date={date}></AddLogsButton>
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
    // image: {
    //     transform: [{scaleX: -1}],
    //     width: 150,
    //     aspectRatio: 9/16,
    //     resizeMode: 'contain',
    //     alignItems: 'center',
    // },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
    
})
export default DayScreen;