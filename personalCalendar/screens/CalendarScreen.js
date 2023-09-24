import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { extractPeriodDates, loggedDates, reformatDate } from '../components/CommonFunctions';

function CalendarScreen({navigation})  {
  const [periodDates, setPeriodDates] = useState({});
  useEffect(() => {
    extractPeriodDates().then((dates) => {
      setPeriodDates(dates);
    });
    // async () => await loggedDates();
  }, [])
  
    return (
      <View style={styles.container}>
        <Calendar
          // Initially visible month. Default = Date()
          current={'2023-09-13'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2023-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2023-12-31'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log('selected day', day.dateString);
            const reformattedDate = reformatDate(day.dateString);
            navigation.replace('Day', {date: reformattedDate});
          }}
          markedDates={periodDates}

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
