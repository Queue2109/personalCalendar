import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";



const DropdownMenu = () => {
    const navigation = useNavigation();

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const logout = async () => {
        try {
            await auth.signOut();
            // Add any additional logic after signing out, such as navigation or AsyncStorage updates.
          } catch (error) {
            console.error('Error signing out:', error);
          }
        navigation.replace('Login');
        await AsyncStorage.setItem('token', '');
    }

    return (
        <View style={styles.upperContainer}>
             <TouchableOpacity onPress={() => setDropdownVisible((prev) => !prev)}>
            <Image style={styles.image} source={require("../assets/profile.png")} ></Image>
            </TouchableOpacity>
            {dropdownVisible ? 
            <View style={styles.container}>
                <Text style={styles.text}>Profile</Text>
                <Text style={styles.text}>Settings</Text>
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={styles.text}>Logout</Text> 
                </TouchableOpacity>
            </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    upperContainer: {
        position: 'absolute',
        right: 0,
        top: 30,
    },
    container: {
        width: 150,
        height: 150,
        position: 'absolute',
        right: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        top: 70,
        padding: 20,
        marginRight: 5,
    },
    invisible: {
        display: 'none',
    },
    visible: {
        display: 'block',
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 20,
        padding: 5,
    }
})

export default DropdownMenu;