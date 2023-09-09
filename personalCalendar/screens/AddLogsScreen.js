import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function AddLogsScreen({navigation}) {
    return (
        <View>
        <Text>AddLogsScreen</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditLogs')}>
            <Text>Go to EditLogs</Text>
        </TouchableOpacity>   
        
        </View>
    );
}
export default AddLogsScreen;