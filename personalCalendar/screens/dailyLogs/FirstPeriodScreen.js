import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToDatabase, setPeriod } from '../../components/CommonFunctions';

const FirstPeriodScreen = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState('');

    const onDayPress = async (day) => {
        setSelectedDate(day.dateString);
        addToDatabase(0, "firstPeriod", day.dateString);
        addToDatabase(0, "period", day.dateString);
        // add database entries from firstPeriod to today
        setPeriod(day.dateString);
    };

    return (
        <View>
            <Text>Select a date:</Text>
            <Calendar
                onDayPress={onDayPress}
                markedDates={{ [selectedDate]: { selected: true } }}
            />
            <Button title='Confirm' onPress={() => selectedDate !== '' ? navigation.navigate('Day') : null}></Button>
        </View>
    );
};

export default FirstPeriodScreen;
