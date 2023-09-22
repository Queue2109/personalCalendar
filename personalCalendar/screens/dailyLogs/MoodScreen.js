import {React} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { db } from '../../firebaseConfig';
import { ref, set, push } from 'firebase/database';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollComponent from '../../components/ScrollComponent';

const MoodScreen = ({navigation, route}) => {
  
    const {date} = route.params;
    const arrayOfImages = [require('../../assets/emoji.png'), require('../../assets/emoji.png'), require('../../assets/emoji.png'), require('../../assets/emoji.png'), require('../../assets/emoji.png')]
    return (
        <View style={styles.container}>
            <View style={styles.up}>
                <Text style={styles.question}>
                    How are you feeling today?
                </Text>
            </View>
            <ScrollComponent  imageArray={arrayOfImages} type={"mood"} date={date} style={styles.scrollView}></ScrollComponent>
            <View style={styles.up}>
                <Entypo name='check' size={70} color={'black'} style={styles.check} onPress={() => navigation.goBack()}></Entypo>
            </View>
        </View>
    );   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 20,
      },
    up: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
    },
    question: {
        fontSize: 20,
    },
    check: {
        marginBottom: 20,
    },    
});

export default MoodScreen;