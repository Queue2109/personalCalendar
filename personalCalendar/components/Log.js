import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Log({navigation, screen, text, day}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(screen, {date: day})}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'salmon',
        borderRadius: 10,
        marginHorizontal: 20,
    },
    text: {
        textAlign: 'center',
        padding: 20,
        fontSize: 20,
        color: 'white',
    }
});

export default Log;

