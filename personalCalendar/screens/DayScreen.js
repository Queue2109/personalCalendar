import {React, useState, useEffect} from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebaseConfig';
import DropdownMenu from "../components/DropdownMenu";
import { get, onValue, ref, child } from "firebase/database";

function DayScreen({navigation}) {

    const [dataValues, setDataValues] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);

    useEffect(() => {
        retrieveData();
    }, []);
    
    const retrieveData = async () => {
        try {
            get(child(ref(db), 'users/' + auth.currentUser.uid)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                    setDataValues(Object.values(snapshot.val()));
                    setDataKeys(Object.keys(snapshot.val()));
                } else {
                  console.log("No data available");
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
            <DropdownMenu navigation={navigation}></DropdownMenu>
            <View style={styles.screen}>
                <Text>DayScreen</Text>
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
    }
    
})
export default DayScreen;