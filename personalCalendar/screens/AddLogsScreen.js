import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Log from "../components/Log";
import { loggedDates } from "../components/CommonFunctions";

function AddLogsScreen({navigation, route}) {
    const {date} = route.params;

    useEffect(() => {
        loggedDates();
    }, [])

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