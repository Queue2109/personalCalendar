import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebaseConfig';


function DayScreen({navigation}) {
    const retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            // console.log(token);
        } catch (e) {
            console.log(e);
            // saving error
        }
        };
    return (
        <View>
        <Text>DayScreen</Text>
        <Button title="Try" onPress={() => retrieveData()}></Button>
        <Button title="ADD" onPress={() => navigation.navigate('AddLogs')}></Button>
        </View>
    );
}

export default DayScreen;