import {React, useState} from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebaseConfig';
import DropdownMenu from "../components/DropdownMenu";

function DayScreen({navigation}) {
    
    const retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(auth.currentUser.uid)
            // console.log(token);
        } catch (e) {
            console.log(e);
            // saving error
        }
    };


    return (
        <View style={styles.container}>
            <DropdownMenu></DropdownMenu>
            <View style={styles.screen}>
                <Text>DayScreen</Text>
                <Button title="Try" onPress={() => retrieveData()}></Button>
                <Button title="ADD" onPress={() => navigation.navigate('AddLogs')}></Button>

            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        position: 'relative',
    },
    screen: {
        zIndex: -1,
    }
    
})
export default DayScreen;