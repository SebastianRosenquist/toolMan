//Import af Pages og Components
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity, Image,
} from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../../firebase';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';


const ProfilePage = () => {
    const [groups, setGroups] = useState();

    //Hvis en bruger skulle komme ind uden at have logget ind.
    if (!firebase.auth().currentUser) {
        return (
            <View style={GlobalStyles.container}>
                <Text>
                    HEY! You should not have access to this site as you are not logged in
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


    // Hvis en user er loggedIn vil de se dette page med deres email
    return (
        <View style={GlobalStyles.container}>
            {/*<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/ToolManLogo2.png')}
                    style={{
                        height: 300,
                        width: 456,
                        margin: 10,
                    }}
                />
            </View>*/}
            <Text style={GlobalStyles.header}>Welcome User!</Text>
            <Text style={{ color: BrandColors.Primary, margin: 5 }}>
                This is your profile page, and you are logged in as:{' '}
                {firebase.auth().currentUser.email}
            </Text>
            <Text style={{ margin: 5 }}>
                This page will in future iterations have all the relevant information about
                your profile. Here you will be able to see:
            </Text>
                <Text style={GlobalStyles.ul}>
                    {'\u2B24'} What you are renting out and from where
                </Text>
                <Text style={GlobalStyles.ul}>
                    {'\u2B24'} Who you are renting to, if you choose to accept
                </Text>
                <Text style={GlobalStyles.ul}>
                    {'\u2B24'} What you are renting and from where
                </Text>
                <Text style={GlobalStyles.ul}>
                    {'\u2B24'} Who you are renting from, should they choose to accept
                </Text>
            <Text style={{ margin: 5 }}>
                Once someone has asked to rent your item, or if you are renting an item, you will be able to chat with
                said person about said item.
            </Text>
            <Text style={{ margin: 5 }}>
                Right now you can logout of your account using the button in the top-left
                corner. We hope to be able to implement more features in the future.
            </Text>
        </View>

    );
};

export default ProfilePage;
