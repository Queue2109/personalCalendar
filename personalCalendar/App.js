// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddLogsScreen from './screens/AddLogsScreen';
import DayScreen from './screens/DayScreen';
import EditLogsScreen from './screens/EditLogsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Day">
         <Stack.Screen name="AddLogs" component={AddLogsScreen} />
         <Stack.Screen name="Day" component={DayScreen} />
         <Stack.Screen name="EditLogs" component={EditLogsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}