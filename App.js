import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ToolList from "./Components/ToolList";
import Add_edit_Tool from "./Components/Add_edit_Tool";
import ToolDetails from "./Components/ToolDetails";
import SearchTool from "./Components/SearchTool";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./Components/Navigators/TabNavigator";

export default function App() {

    /*
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();*/

  const firebaseConfig = {
      apiKey: "AIzaSyDcwn5RjQKs0M2tWk360oPacpUdL8jH3jw",
      authDomain: "toolmantwo-3cd62.firebaseapp.com",
      databaseURL: "https://toolmantwo-3cd62-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "toolmantwo-3cd62",
      storageBucket: "toolmantwo-3cd62.appspot.com",
      messagingSenderId: "621004841089",
      appId: "1:621004841089:web:18d5cf6796f7f8d1d22d80"
  };


  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


/*
  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Tool List'} component={ToolList}/>
          <Stack.Screen name={'Tool Details'} component={ToolDetails}/>
          <Stack.Screen name={'Edit Tool'} component={Add_edit_Tool}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
              <Tab.Screen name={'Search'} component={SearchTool} options={{tabBarIcon: () => ( <Ionicons name="search" size={20} />)}}/>
              <Tab.Screen name={'Rent'} component={Add_edit_Tool} options={{tabBarIcon: () => ( <Ionicons name="cash-outline" size={20} />)}}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
*/

    return (
        <TabNavigator/>
    )
  /*return (
    <View style={styles.container}>

      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, */
}