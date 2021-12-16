//Import af Pages og Components
import React, { useEffect, useState } from 'react';
import { Image, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToolGroupPage from '../Pages/ToolGroupPage';
import { auth, db } from '../../firebase';
import { Button } from 'react-native';
import MapScreen from '../Pages/MapPage';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';
import InfoScreen from '../Pages/InfoPage';
import SearchTool from "../Pages/SearchTool";
import ProfilePage from '../Pages/ProfilePage';


const Tab = createBottomTabNavigator();

// Vi passere navigation som en state da det er nødvendigt for at se om brugeren er loggedIn
const TabNavigator = ({ navigation }) => {
    // Vi sætter den initial state af loggedIn til falsk
    const [user, setUser] = useState({ loggedIn: false });
    const [group, setGroup] = useState();

    // Check for at se om bruger er logget ind. Koden er taget direkte fra Firebase dokumentation
    function onAuthStateChange(callback) {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                callback({ loggedIn: true, user: user });
            } else {
                callback({ loggedIn: false });
            }
        });
    }

    //Her sætter vi en useEffect hook som lytter efter en onAuthChanged for at se om brugeren er aktiv ellers logger
    //den dem ud.
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

    // Vores logout knap vises hvis en bruger er logget ind.
    // Den ændre sin loggedIn state hvis den trykkes og navigere derefter til homeScreen
    const LogoutButton = () => {
        if (user.loggedIn) {
            return (
                <View style={{ marginLeft: 10 }}>
                    <Button
                        onPress={() => {
                            auth
                                .signOut()
                                .then(() => {
                                    navigation.replace('Login');
                                })
                                .catch((error) => alert(error.message));
                        }}
                        title="Logout"
                        color={BrandColors.Secondary}
                    />
                </View>
            );
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{ tabBarActiveTintColor: BrandColors.SecondaryLight }}
        >
            <Tab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    headerTintColor: BrandColors.White,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: BrandColors.PrimaryDark,
                    },
                    //headerLeft: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="help-circle-outline"
                            color={
                                focused ? BrandColors.SecondaryLight : BrandColors.PrimaryDark
                            }
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Tool Group"
                component={ToolGroupPage}
                options={{
                    headerTintColor: BrandColors.White,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: BrandColors.PrimaryDark,
                    },
                    //headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="hammer-outline"
                            color={
                                focused ? BrandColors.SecondaryLight : BrandColors.PrimaryDark
                            }
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                initialParams={{ group: group }}
                options={{
                    headerTintColor: BrandColors.White,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: BrandColors.PrimaryDark,
                    },
                    //headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="globe"
                            color={
                                focused ? BrandColors.SecondaryLight : BrandColors.PrimaryDark
                            }
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchTool}
                initialParams={{ group: group }}
                options={{
                    headerTintColor: BrandColors.White,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: BrandColors.PrimaryDark,
                    },
                    //headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="search"
                            color={
                                focused ? BrandColors.SecondaryLight : BrandColors.PrimaryDark
                            }
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfilePage}
                initialParams={{ group: group }}
                options={{
                    headerTintColor: BrandColors.White,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: BrandColors.PrimaryDark,
                    },
                    headerLeft: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="person-circle-outline"
                            color={
                                focused ? BrandColors.SecondaryLight : BrandColors.PrimaryDark
                            }
                            size={30}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;










/*import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchTool from "../Pages/SearchTool";
import Add_edit_Tool from "../Pages/Add_edit_Tool";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StackNav from "./StackNavigator";
import ToolMap from "../Pages/ToolMap";


const Tab = createBottomTabNavigator();


function TabNavigator(){
return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name={'Home'} component={StackNav} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
            <Tab.Screen name={'Search'} component={ToolMap} options={{tabBarIcon: () => ( <Ionicons name="search" size={20} />)}}/>
            <Tab.Screen name={'Rent'} component={Add_edit_Tool} options={{tabBarIcon: () => ( <Ionicons name="cash-outline" size={20} />)}}/>
        </Tab.Navigator>
    </NavigationContainer>
);
}
export default TabNavigator;*/
