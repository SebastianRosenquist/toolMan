import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView,} from 'react-native';
//import firebase from 'firebase';
import { auth, db } from '../../firebase';
import {useEffect, useState} from "react";

const Add_edit_Tool = ({navigation,route}) => {

    const initialState = {
        type: '',
        model: '',
        duration: '',
        price: '',
        description: ''
    }

    const [newTool,setNewTool] = useState(initialState);

    /*Returnere true, hvis vi er på edit tool*/
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

        const { type, model, duration, price, description } = newTool;

        if(type.length === 0 || model.length === 0 || duration.length === 0 || price.length === 0 || description.length === 0 ){
            return Alert.alert('One of your fields is empty!');
        }

        if(isEditTool){
            const id = route.params.tool[0];
            try {
                db
                    .ref(`/Tools/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ type, model, duration, price });
                // Når værktøjet er ændret, går vi tilbage.
                Alert.alert("Your info has been updated");
                const tool = [id,newTool]
                navigation.navigate("Tool Details",{tool});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                db
                    .ref('/Tools/')
                    .push({ type, model, duration, price, description });
                Alert.alert(`Saved`);
                setNewTool(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Hi. På denne fane vil du kunne tilføje dit værktøj til vores søgmaskine som du gerne vil leje ud.
            </Text>
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
                {/*Hvis vi er inde på edit tool, vis save changes i stedet for add tool*/}
                <Button title={ isEditTool ? "Save changes" : "Add tool"} onPress={() => handleSave()} />
            </ScrollView>
            <Text>
                Man vil i fremtidige version også kunne tilføje en liste over hvilke værktøj er tilgænglig (hvis man vil leje en hel værktøjskasse ud).
                Man vil også kunne tilføje/tage et billede af værktøjet
            </Text>
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
