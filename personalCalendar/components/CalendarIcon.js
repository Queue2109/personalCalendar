import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CalendarIcon = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.calendar}>
            <Image source={require('../assets/calendar.png')} style={{width: 50, height: 50}}></Image>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    calendar: {
        position: 'absolute',
        right: 70,
        zIndex: 1,
        top: 30,
    },
});