import {React} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { db } from '../../firebaseConfig';
import { ref, set, push } from 'firebase/database';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodScreen = ({navigation, route}) => {
  
    const {date} = route.params;
    const arrayOfMoods = ["happy", "sad", "angry", "tired", "anxious"];
    const addToDatabase = async (mood) => {
        const uid = await AsyncStorage.getItem('token');
       
        set(ref(db, 'users/' + uid + '/' + date + '/mood/' + mood ), arrayOfMoods[mood]);
        console.log(mood);
    }
    return (
        <View style={styles.container}>
            <View style={styles.up}>
                <Text style={styles.question}>
                    How are you feeling today?
                </Text>
            </View>
            <ScrollView horizontal={true} style={styles.scrollView} >
                <TouchableOpacity onPress={() => addToDatabase(0)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDatabase(1)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDatabase(2)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDatabase(3)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDatabase(4)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDatabase(5)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToDatabase(6)}>
                    <Image style={styles.png} source={require('../../assets/emoji.png')} />
                </TouchableOpacity>
            </ScrollView>
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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        paddingTop: 30,
        borderRadius: 20,

    },
    question: {
        fontSize: 20,
    },
    check: {
        marginBottom: 20,
    },    
});



export default MoodScreen;