import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView,} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const SearchTool = (props) => {

    return (
        <View style={styles.container}>
            <Text> Test </Text>
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