// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddLogsScreen from './screens/AddLogsScreen';
import DayScreen from './screens/DayScreen';
import EditLogsScreen from './screens/EditLogsScreen';
import LoginScreen from './screens/LoginScreen';
import { AppRegistry } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="AddLogs" component={AddLogsScreen} />
         <Stack.Screen name="Day" component={DayScreen} />
         <Stack.Screen name="EditLogs" component={EditLogsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('App', () => App);