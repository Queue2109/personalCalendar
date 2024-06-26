import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { loggedDates as funLoggedDates, retrieveData } from '../components/CommonFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CalendarScreen({navigation})  {
  const [loggedDates, setLoggedDates] = useState({});
  const [firstPeriod, setFirstPeriod] = useState('');
  useEffect(() => {
    funLoggedDates().then((dates) => {
      setLoggedDates(dates);
    });
    retrieveData("firstPeriod").then((date) => {
      setFirstPeriod(date);
    })
  }, [])
  
    return (
      <View style={styles.container}>
        <Calendar
        
          current={Date()}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={undefined}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={undefined}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            navigation.replace('Day', {date: day.dateString});
          }}
          markedDates={loggedDates}

          firstDay={1}

          renderArrow={(direction) => (
            <Text style={styles.arrows}>{direction === 'left' ? '<' : '>'}</Text>
          )}

          renderHeader={(date) => {
            const monthName = date.toString('MMMM yyyy'); // Get the month name
            return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{monthName}</Text>
            </View>
            );
          }}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18, // Customize the font size
    fontWeight: 'bold', // Customize the font weight
  },
  arrows: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default CalendarScreen;
