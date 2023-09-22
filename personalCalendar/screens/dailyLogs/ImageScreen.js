// CameraScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, storage } from '../../firebaseConfig';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from "@expo/vector-icons";
import { ref, uploadBytes } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageScreen = ({ navigation, route }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);   
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const saveImage = async () => {
        const currentUser = await AsyncStorage.getItem('token');
        const response = await fetch(image);
        const {date} = route.params;
        const blob = await response.blob();
        const storageRef = ref(storage, 'images/' + currentUser + '/' + date + '.jpg');
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        navigation.goBack();
    }

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync(); 
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
        <View style={styles.background}>
          <View style={styles.cameraContainer}>
            {!image ? (
              <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
                ratio='1:1'
              ></Camera>
            ) : (
              <Image source={{ uri: image }} style={[styles.camera, styles.image]}></Image>
            )}
          </View>
          {!image ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                <Entypo name="circle" size={70} color={'white'}></Entypo>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => setImage(null)}>
                <Entypo name="ccw" size={70} color={'white'}></Entypo>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => saveImage()}>
                <Entypo name='check' size={70} color={'white'}></Entypo>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
}

const styles = StyleSheet.create({ 
    background: {
        flex: 1,
        backgroundColor: 'black',
    },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    aspectRatio: 1, 
    width: '100%', 
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20, // Space between buttons and the camera preview
    paddingHorizontal: 20,
  },
  image: {
    transform: [{scaleX: -1}]
  }
  // ... (other styles)
});
export default ImageScreen;
