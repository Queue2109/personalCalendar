// CameraScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../firebaseConfig';
import { storage } from '../../firebaseConfig';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from "@expo/vector-icons";
// import CameraButton from '../../components/CameraButton';

const ImageScreen = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);   
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync(); 
                console.log(data);
                setImage(data.uri);
            } catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }
    , []);

    if(hasCameraPermission === null) {
        return <Text>No camera permissions</Text>;
    }

  return (
    <View style={styles.container}>
        {!image? 
        <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
            ratio='16:9'
            
        
        >
        </Camera>
        
        :
        <Image source={{uri: image}} style={styles.camera}></Image>
       }
        {!image ? 
            <TouchableOpacity onPress={takePicture} style={styles.button}> 
                <Entypo name="circle" size={70} color={'white'}></Entypo>
            </TouchableOpacity>
         : 
         <View>
         <Button title='Retake' icon='retweet' onPress={() => setImage(null)}></Button>
         <Button title='Save' icon="check"></Button></View>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    },
    button: {
        marginBottom: 20,
        alignItems: 'center',   
        position: 'absolute',
        left: '40%',
        bottom: 10,
    },
    onSave: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
    }
});

export default ImageScreen;
