import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView,} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const Add_edit_Tool = ({navigation,route}) => {

    const initialState = {
        brand: '',
        model: '',
        year: '',
        licensePlate: ''
    }

    const [newTool,setNewTool] = useState(initialState);

    /*Returnere true, hvis vi er på edit car*/
    const isEditTool = route.name === "Edit Tool";

    useEffect(() => {
        if(isEditTool){
            const tool = route.params.tool[1];
            setNewTool(tool)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewTool(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewTool({...newTool, [name]: event});
    }

    const handleSave = () => {

        const { brand, model, year, licensePlate } = newTool;

        if(brand.length === 0 || model.length === 0 || year.length === 0 || licensePlate.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditTool){
            const id = route.params.tool[0];
            try {
                firebase
                    .database()
                    .ref(`/Tools/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ brand, model, year, licensePlate });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const tool = [id,newTool]
                navigation.navigate("Tool Details",{tool});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Tools/')
                    .push({ brand, model, year, licensePlate });
                Alert.alert(`Saved`);
                setNewTool(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newTool[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit car, vis save changes i stedet for add car*/}
                <Button title={ isEditTool ? "Save changes" : "Add tool"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Tool;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
