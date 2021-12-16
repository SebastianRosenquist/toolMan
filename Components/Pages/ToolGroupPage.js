//Import af Pages og Components
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../../firebase';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';

//Dette er vores Tool-Group page. I fremtidige itteration vil man kunne
//tilføje flere grupper af værktøj som man leder efter. Dette er stadig i en test/beta fase og er primært til
//for at undersøge om det er et behov for brugeren at kunne filtrer på deres udlejnings map.

const ToolGroupPage = () => {
    const [groups, setGroups] = useState();

    if (!firebase.auth().currentUser) {
        return (
            <View style={GlobalStyles.container}>
                <Text>
                    Hey there. Seems as though you got access without logging in. Please let os know how you got here.
                </Text>
            </View>
        );
    }

    useEffect(() => {
        if (!groups) {
            db.ref('groups')
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setGroups(snapshot.val());
                    } else {
                        console.log('No data available');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleSelectGroup = (id) => {
        const group = Object.entries(groups).find(
            (group) => group[0] === id /*id*/
        );
        let userId = auth.currentUser.uid;
        db.ref('userData/' + userId).update({ group: group[0] });
    };

    if (!groups) {
        return <Text>Loading...</Text>;
    }

    const groupArray = Object.values(groups);
    const groupKeys = Object.keys(groups);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.header}>Your Tool Group Filter</Text>
            <Text style={{ color: BrandColors.Primary, margin: 5 }}>
                Hello, you are logged in as:{' '}
                {firebase.auth().currentUser.email}
                {' '}REMEMBER, that all tools you create are made under this profile
            </Text>
            <Text style={{ margin: 5 }}>
                On this page you can choose which Tool-Group you wish to search within.
                Choose one of the groups, then go to the Map-view and refresh the map.
                You will now be presented with a map of where that group of tools are available.
                Right now, these groups are hardcoded in the database. In future iterations, this will
                be something users can add.
                It will also show locations of specific hardware stores that have these tools.
            </Text>
            <FlatList
                data={groupArray}
                // Vi bruger groupKeys til at finde ved hjælp af ID
                keyExtractor={(item, index) => groupKeys[index]}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={GlobalStyles.container}
                            onPress={() => handleSelectGroup(groupKeys[index])}
                        >
                            <Text style={{ color: BrandColors.Grey, fontSize: 25 }}>
                                {item.toolGroup}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default ToolGroupPage;
