import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ScrollComponent from "../../components/ScrollComponent";
import { useEffect, useState } from "react";
import { addToDatabase, deletePeriodAfterDay, logPeriodDb, retrieveData } from "../../components/CommonFunctions";
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";


const PeriodScreen = ({ navigation, route }) => {
    const arrayOfImages = [require('../../assets/emoji.png'), require('../../assets/emoji.png'), require('../../assets/emoji.png'), require('../../assets/emoji.png'), require('../../assets/emoji.png')]
    const {date} = route.params;
    const [period, setPeriod] = useState(false);
    useEffect(() => {
        const wait = async () => {
            const period = await retrieveData("flow", date);
            setPeriod(period);
        }
        if(!period)
            wait();
    })

    const logPeriod = async (value) => {
        if(value === 0) {
            setPeriod(true);
            await addToDatabase(0, "period", date);
            // check which day of cycle the user currently is in - if it is greater than 10, set new cycle
            logPeriodDb(date);
        } else {
            setPeriod(false);
            deletePeriodAfterDay(date);
            navigation.goBack();
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.heading}>Are you on your period?</Text>
                <TouchableOpacity onPress={() => logPeriod(0)}>
                    <Text style={styles.text}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logPeriod(1)}>
                    <Text style={styles.text}>No</Text>
                </TouchableOpacity>
            </View> 
            
            {period ?
            <View style={styles.secondContainer}>
                <View style={styles.up}>
                <Text style={styles.text}>Menstruation flow</Text>
                </View>
                <ScrollComponent imageArray={arrayOfImages} type={"flow"} date={date} style={styles.scrollView}></ScrollComponent>
                <View style={styles.up}>
                    <Entypo name='check' size={70} color={'black'} style={styles.check} onPress={() => navigation.goBack()}></Entypo>
                </View>
            </View>
            
            : null}
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 20,
    },
    secondContainer: {
        flex: 1,
    },
    text: {
        fontSize: 20,
    },
    heading: {
        fontSize: 30,
    },
    check: {
        marginBottom: 20,
    },    
    up:{
        flex: 7,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    scrollView: {
        flex: 1,
    },
})

export default PeriodScreen;