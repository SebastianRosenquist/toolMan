import ToolList from "../Pages/ToolList";
import ToolDetails from "../Pages/ToolDetails";
import Add_edit_Tool from "../Pages/Add_edit_Tool";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();


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