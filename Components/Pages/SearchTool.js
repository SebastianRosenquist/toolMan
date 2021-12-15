//Import af Pages og Components
import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView,} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const SearchTool = (props) => {


    return (
        <View style={styles.container}>
            <Text>
                På denne side vil man kunne søge efter værktøj som man ønsker at leje.
                Nå man søger, vil man blive præsenteret for et kort med overblik over hvor man kan finde sit værktøj.
            </Text>
        </View>
    );
}

export default SearchTool;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});