import React from "react"
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity , View} from "react-native";

const AddLogsButton = ({ navigation, date }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('AddLogs', {date: date})}>
            <Entypo name="edit" size={50} color={"#78257e"}></Entypo>
        </TouchableOpacity>
    );
}

export default AddLogsButton;