import React, {useState} from "react";
import {Alert, Button, StyleSheet, Text, View} from "react-native";
import * as Google from 'expo-google-app-auth';

const GoogleScreen = () => {
    const [googleUser, setGoogleUser] = useState(null);
    const [googleToken, setGoogleToken] = useState('');

    const googleConfig = {
        /*Android/IOS ID behøver ikke at blive skiftet */
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>'
    }

    /*Metode der kaldes for at logge ind med Async! */
    const handleGoogleLogin = async () => {
        try {
            /*Returnere et true false med type og en bruger du logger ind med*/
            const {type, accessToken, user} = await Google.logInAsync(googleConfig);

            /*Er det et en success?*/
            if (type === "success") {
                setGoogleUser(user);
                setGoogleToken(accessToken)

                /*Jeg går ikke igennem med login*/
            } else if (type === "cancel") {
                Alert.alert(
                    'Cancelled!',
                    'Login was cancelled!',
                );
                /*Hvis alt andet fejler så vis en fejl*/
            } else {
                Alert.alert(
                    'Oops!',
                    'Login failed!',
                );
            }
            /*Håndter fejl med catchs*/
        } catch (e) {
            console.log(e)
        }
    };
    /*Logger ud*/
    const handleLogOut = async () => {
        try {
            await Google.logOutAsync({accessToken: googleToken, ...googleConfig});
            setGoogleUser(null);
            setGoogleToken('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        !googleUser ? (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Få adgang til din personlige Google profil!
                </Text>
                <Button
                    title="Login with Google"
                    onPress={handleGoogleLogin}
                />
            </View>
        ) : (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Hej {googleUser.name} {"\n"}
                    Du er logget ind med Google
                </Text>
                <Button
                    title="Log ud"
                    onPress={handleLogOut}
                />
            </View>
        )
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});

export default GoogleScreen;