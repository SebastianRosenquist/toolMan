
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { auth, db } from '../../firebase';
import {useEffect, useState} from "react";

const ToolList = ({navigation}) => {

    const [tools,setTools] = useState()

    useEffect(() => {
        if(!tools) {
            db
                .ref('/Tools')
                .on('value', snapshot => {
                    setTools(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!tools) {
        return <Text>Welcome, on this page you can see the tools that you have set up to rent out.</Text>;
    }

    const handleSelectTool = id => {
        /*Her søger vi direkte i vores array af tools og finder tool objektet som matcher idet vi har tilsendt*/
        const tool = Object.entries(tools).find( tool => tool[0] === id /*id*/)
        navigation.navigate('Tool Details', { tool });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores tools objekt, og bruger som array til listen
    const toolArray = Object.values(tools);
    const toolKeys = Object.keys(tools);

    return (
        <FlatList
            data={toolArray}
            // Vi bruger toolKeys til at finde ID på det aktuelle værktøj og returnerer dette som key, og giver det med som ID til ToolListItem
            keyExtractor={(item, index) => toolKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectTool(toolKeys[index])}>
                        <Text>
                            {item.type} {item.model}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default ToolList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});
