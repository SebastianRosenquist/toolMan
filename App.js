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
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const firebaseConfig = {
        apiKey: "AIzaSyDyilxsV2j9PhYgBYobp58O19Ps4YAodNA",
        authDomain: "toolman-d0bd2.firebaseapp.com",
        databaseURL: "https://toolman-d0bd2-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "toolman-d0bd2",
        storageBucket: "toolman-d0bd2.appspot.com",
        messagingSenderId: "500755517934",
        appId: "1:500755517934:web:f444482ffa1347abb1beff"
  };


  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

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
              <Tab.Screen name={'Add'} component={Add_edit_Tool} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
          </Tab.Navigator>
      </NavigationContainer>
  );

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