
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import {auth, db} from "firebase";
import firebase from 'firebase';
import {useEffect, useState} from "react";

const ToolDetails = ({route,navigation}) => {
    const [tool,setTool] = useState({});

    useEffect(() => {
        /*Henter tool values og sætter dem*/
        setTool(route.params.tool[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setTool({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditTool skærmen og sender værktøjet videre
        const tool = route.params.tool
        navigation.navigate('Edit Tool', { tool });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the tool?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi sletter det aktuelle tool
    const  handleDelete = () => {
        const id = route.params.tool[0];
        try {
            db
                // Vi sætter værktøjet ID ind i stien
                .ref(`/Tools/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!tool) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(tool).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores tool keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores tool values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ToolDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});
