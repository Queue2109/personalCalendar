import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Log from "../components/Log";

function AddLogsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Log navigation={navigation} text={'Take a picture'} screen={'Image'}></Log>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    }
})
export default AddLogsScreen;