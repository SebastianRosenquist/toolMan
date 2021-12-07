import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchTool from "../Pages/SearchTool";
import Add_edit_Tool from "../Pages/Add_edit_Tool";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StackNav from "./StackNavigator";


const Tab = createBottomTabNavigator();


function TabNavigator(){
return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name={'Home'} component={StackNav} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
            <Tab.Screen name={'Search'} component={SearchTool} options={{tabBarIcon: () => ( <Ionicons name="search" size={20} />)}}/>
            <Tab.Screen name={'Rent'} component={Add_edit_Tool} options={{tabBarIcon: () => ( <Ionicons name="cash-outline" size={20} />)}}/>
        </Tab.Navigator>
    </NavigationContainer>
);
}
export default TabNavigator;
