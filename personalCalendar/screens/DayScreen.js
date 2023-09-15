import {React, useState, useEffect} from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from '../firebaseConfig';
import DropdownMenu from "../components/DropdownMenu";
import { get, ref, child, set } from "firebase/database";
import { getCurrentDate } from "../components/CommonFunctions";

// for each day separate, there has to be a new log into the database
// should i make this log when a user presses on day? probably.
// one log per day, and then the user can add to that log

function DayScreen({navigation}) {

    const [dataValues, setDataValues] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const [today, getToday] = useState(new Date());

    useEffect(() => {
        retrieveData();
    }, []);
    
    const retrieveData = async () => {
        try {
            get(child(ref(db), 'users/' + auth.currentUser.uid + '/' + getCurrentDate())).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                    setDataValues(Object.values(snapshot.val()));
                    setDataKeys(Object.keys(snapshot.val()));
                } else {
                  console.log("No data available");
                    //   make log for this day
                    set(ref(db, 'users/' + auth.currentUser.uid + '/' + getCurrentDate()), {
                        mood: '',
                    });
                }
              }
            ).catch((error) => {
                console.error(error);
              });
            // console.log(token);
        } catch (e) {
            console.log(e);
            // saving error
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.calendar}>
                <Image source={require('../assets/calendar.png')} style={{width: 50, height: 50}}></Image>
            </TouchableOpacity>
            <DropdownMenu navigation={navigation}></DropdownMenu>
            <View style={styles.screen}>
                <Text>{dataValues[0]}</Text>
                <Button title="Try" onPress={() => retrieveData()}></Button>
                <Button title="ADD" onPress={() => navigation.navigate('AddLogs')}></Button>
                <FlatList
                data={dataKeys}
                renderItem={({item, index}) => (
                    <View>
                        <Text>{item}</Text>
                        <Text>{dataValues[index]}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => item.toString()} 
                ></FlatList>

            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        position: 'relative',
    },
    screen: {
        zIndex: -1,
    },
    calendar: {
        position: 'absolute',
        top: -40,
        right: 70,
        zIndex: 1,
    }
    
})
export default DayScreen;