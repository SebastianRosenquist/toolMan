import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView,} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const LoginPage = (props) => {

    return (
        <View style={styles.container}>
            <Text>
               På denne side skal man kunne log ind. Den er stadig ikke udviklet.
            </Text>
        </View>
    );
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});