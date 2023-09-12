import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity, Image } from "react-native";
import { useState } from "react";

const DropdownMenu = () => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    return (
        
        <View>
             <TouchableOpacity onPress={() => setDropdownVisible((prev) => !prev)}>
            <Image style={styles.image} source={require("../assets/profile.png")} ></Image>
            </TouchableOpacity>
            {dropdownVisible ? 
            <View style={styles.container}>
                <Text style={styles.text}>Profile</Text>
                <Text style={styles.text}>Settings</Text>
                <Text style={styles.text}>Logout</Text> 
            </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
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
        position: 'absolute',
        right: 0,
        top: -40,
    },
    text: {
        fontSize: 20,
        padding: 5,
    }
})

export default DropdownMenu;