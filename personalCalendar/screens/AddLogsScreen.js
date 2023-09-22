import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Log from "../components/Log";

function AddLogsScreen({navigation, route}) {
    const {date} = route.params;
    const {moodModal, setMoodModal} = useState(false);

    return (
        <View style={styles.container}>
            <Log navigation={navigation} text={'Take a picture'} screen={'Image'} day={date}></Log>
            <Log navigation={navigation} text={'Mood'} screen={'Mood'} day={date}></Log>
            <Log navigation={navigation} text={'Log period'} screen={'Period'} day={date}></Log>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        

    }
})
export default AddLogsScreen;