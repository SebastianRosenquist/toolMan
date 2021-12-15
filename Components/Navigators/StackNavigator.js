//Import af Pages og Components
//import ToolList from "../DevelopmentPages - Unused/ToolList";
//import ToolDetails from "../DevelopmentPages - Unused/ToolDetails";
//import Add_edit_Tool from "../DevelopmentPages - Unused/Add_edit_Tool";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

//Vores første stacknavigator. Ikke i brug længere.
const StackNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Tool List'} component={ToolList}/>
            <Stack.Screen name={'Tool Details'} component={ToolDetails}/>
            <Stack.Screen name={'Edit Tool'} component={Add_edit_Tool}/>
        </Stack.Navigator>
    )
}


export default StackNavigation;