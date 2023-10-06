// App.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddLogsScreen from './screens/AddLogsScreen';
import DayScreen from './screens/DayScreen';
import EditLogsScreen from './screens/EditLogsScreen';
import LoginScreen from './screens/LoginScreen';
import { AppRegistry, View } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarScreen from './screens/CalendarScreen';
import { getCurrentDate } from './components/CommonFunctions';
import ImageScreen from './screens/dailyLogs/ImageScreen';
import MoodScreen from './screens/dailyLogs/MoodScreen';
import PeriodScreen from './screens/dailyLogs/PeriodScreen';
import CustomHeader from './components/CustomHeader';
import FirstPeriodScreen from './screens/dailyLogs/FirstPeriodScreen';

const Stack = createStackNavigator();


export default function App() {
  const [initialScreen, setInitialScreen] = useState('');

  useEffect(() => {
    const retrieveData = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
          if(token) {
            setInitialScreen("Day");
          } else {
            setInitialScreen("Login");
          }
      } catch (e) {
          console.log(e);
          // saving error
      }
      };
      retrieveData();
      console.log(initialScreen);
  }, []);

  if(initialScreen === '') {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Calendar" component={CalendarScreen} />
         <Stack.Screen name="AddLogs" component={AddLogsScreen} />
         <Stack.Screen name="Day" component={DayScreen} initialParams={{date: getCurrentDate(), }} options={{
          header: () => (
            <CustomHeader></CustomHeader>
          ),
         }} />
         <Stack.Screen name="EditLogs" component={EditLogsScreen} />
         <Stack.Screen name="Image" component={ImageScreen} />
         <Stack.Screen name="Mood" component={MoodScreen} options={{headerShown: false}} />
         <Stack.Screen name="Period" component={PeriodScreen} />
         <Stack.Screen name="FirstPeriod" component={FirstPeriodScreen} options={{headerShown: false}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent('App', () => App);