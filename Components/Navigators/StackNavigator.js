import ToolList from "../ToolList";
import ToolDetails from "../ToolDetails";
import Add_edit_Tool from "../Add_edit_Tool";
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