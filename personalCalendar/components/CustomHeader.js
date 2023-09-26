import { StyleSheet, View, Text } from "react-native";
import { CalendarIcon } from "./CalendarIcon";
import DropdownMenu from "./DropdownMenu";

export default CustomHeader = () => {
    return (
        <View style={styles.container}>
            <CalendarIcon></CalendarIcon>
            <DropdownMenu></DropdownMenu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 70,
        // backgroundColor: 'pink',
        height: 50,
    }
})