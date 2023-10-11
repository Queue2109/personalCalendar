import { StyleSheet, View, Text } from "react-native";
import { CalendarIcon } from "./CalendarIcon";
import DropdownMenu from "./DropdownMenu";
import { useEffect, useState } from "react";
import { reformatDate } from "./CommonFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomHeader = () => {
    const [date, setDate] = useState('');
    useEffect(() => {
        const getDate = async () => {
            const day = await AsyncStorage.getItem('currentDate').then((day) => {
                setDate(reformatDate(day))
            });
        }
         getDate();
    }, [date])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>{date}</Text>
            </View>
                <CalendarIcon></CalendarIcon>
                <DropdownMenu></DropdownMenu>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 70,
        height: 50,
    },
    text: {
        fontSize: 20,
        position: 'absolute',
        height: 20,
        bottom: 5,
        fontWeight: 'bold',
    }
})

export default CustomHeader;