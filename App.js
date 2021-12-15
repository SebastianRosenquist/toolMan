// Vi importere de relevante komponenter til vores app
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

// Vi importere vores pages
import TabNavigator from "./Components/Navigators/TabNavigator";
import LoginPage from "./Components/login/LoginPage";
import SignupPage from "./Components/login/SignupPage";
import StackNav from "./Components/Navigators/StackNavigator";
import { AntDesign,Entypo } from '@expo/vector-icons';

// Vi sætter expo til at ignorrer "setting timer" warning. Den er super irriterende.
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {


  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


  // Vores stacknavigator som bruger en TabNavigator komponent til at navigere mellem vores pages i bunden.
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginPage}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Register"
                    component={SignupPage}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="HomeScreen"
                    component={TabNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});




// Gammel kode der ikke benyttes. Kan slættes selvom det var god læring.

    /* const firebaseConfig = {
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
   }*/


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

   /* return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name={"Bio"} component={BioScreen} options={{tabBarIcon:({tintColor}) =>(<Entypo name="fingerprint" size={24} color={tintColor} />)}} />
                {/!*Hvis det er Iphone, så vis Facebook tab'en*!/}
                {Platform.OS === 'ios' && <Tab.Screen name={"Facebook"} component={FacebookScreen} options={{tabBarIcon:({tintColor}) =>(<Entypo name="facebook" size={24} color={tintColor} />)}} />}
                <Tab.Screen name={"Google"} component={GoogleScreen} options={{tabBarIcon:({tintColor}) =>(<AntDesign name="google" size={24} color={tintColor} />)}} />
            </Tab.Navigator>
        </NavigationContainer>
    );*/

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