import React from "react";
import { View, Text, Button } from "react-native";

function DayScreen({navigation}) {
    return (
        <View>
        <Text>DayScreen</Text>
        <Button title="ADD" onPress={() => navigation.navigate('AddLogs')}></Button>
        </View>
    );
}

export default DayScreen;