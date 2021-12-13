// Importing modules, screens and components used for the bootom tab navigator
import React, { useEffect, useState } from 'react';
import { Image, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../Pages/TestPage';
import { auth, db } from '../../firebase';
import { Button } from 'react-native';
import MapScreen from '../Pages/MapPage';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';
import InfoScreen from '../Pages/InfoPage';
import SearchTool from "../Pages/SearchTool";

const Tab = createBottomTabNavigator();

// Is passed navigation as state
const TabNavigator = ({ navigation }) => {
    // We set an initial state of loggedIn to false, to use firebase to check whether a user is logged in or not
    const [user, setUser] = useState({ loggedIn: false });
    const [group, setGroup] = useState();

    // Check the login state of a user - This is code from firebase
    function onAuthStateChange(callback) {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                callback({ loggedIn: true, user: user });
            } else {
                callback({ loggedIn: false });
            }
        });
    }

    //useEffect hook, which listens for onAuthChanged to know if the user is active or not or unsubscribes them (log out)
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

    // The logout button is shown if a user is logged in and changes the loggedIn state if pressed, and navigates to homescreen
    const LogoutButton = () => {
        if (user.loggedIn) {
            return (
                <View style={{ marginRight: 10 }}>
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
                        color={BrandColors.PrimaryLight}
                    />
                </View>
            );
        }
    };

    //Show Homescreen, MapScreen and CoordinateStackNavigator regardless of loggedIn status
    return (
        <Tab.Navigator
            screenOptions={{ tabBarActiveTintColor: BrandColors.PrimaryLight }}
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
                    headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="help-circle-outline"
                            color={
                                focused ? BrandColors.PrimaryLight : BrandColors.PrimaryDark
                            }
                            size={20}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTintColor: BrandColors.White,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: BrandColors.PrimaryDark,
                    },
                    headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="person-circle-outline"
                            color={
                                focused ? BrandColors.PrimaryLight : BrandColors.PrimaryDark
                            }
                            size={20}
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
                    headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="globe"
                            color={
                                focused ? BrandColors.PrimaryLight : BrandColors.PrimaryDark
                            }
                            size={20}
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
                    headerRight: () => LogoutButton(),
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="search"
                            color={
                                focused ? BrandColors.PrimaryLight : BrandColors.PrimaryDark
                            }
                            size={20}
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
