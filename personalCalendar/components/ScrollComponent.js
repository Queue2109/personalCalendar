import React from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { addToDatabase } from "./CommonFunctions"

const ScrollComponent = ({ imageArray, type, date }) => {
    return (
        <ScrollView style={styles.scrollView} horizontal={true}>
            {imageArray.map((image, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => addToDatabase(index, type, date)}>
                        <Image source={image}></Image>
                    </TouchableOpacity>
                )
            })}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'pink',
        paddingTop: 30,
        borderRadius: 20,
    },
});

export default ScrollComponent;