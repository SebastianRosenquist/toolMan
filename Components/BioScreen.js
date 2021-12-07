import React, {useEffect, useState} from "react";
import {Alert, Button, Platform, StyleSheet, Text, View} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

const BioScreen = () => {

    // Vi laver et samlet state for Bio-staten, hvor der er nested objecter deri.
    // Dette gøres for at samle de forskellige states så hvis der skal laves fleres states
    // så er der en logisk sammenhæng, og nemmmere at sortere
    const [bio,setBio] = useState({
        hasBiometricHardware: false,
        hasBiometricData: false,
        isRequestingBiometricLogin: false,
        isLoggedInBiometic:false
    })

    // Vi checker om det er muligt at bruge biometrics
    useEffect( () => {
        /*Hvis der ikke er bio hardware, eller at man kan modtage bio data så tjek om vi kan*/
        !bio.hasBiometricHardware || !bio.hasBiometricData && checkBiometricAvailability()
    },[]);

    const checkBiometricAvailability = async () => {
        const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
        const hasBiometricData = await LocalAuthentication.isEnrolledAsync();
        setBio({...bio,hasBiometricHardware,hasBiometricData})
    };

    // Vi foretager en biometrisk scanning
    const requestBiometricLogin = async () => {
        try {
            // For at kunne vise en besked på android, sætter vi dette response i staten,
            // så man kan se vi prøver at requeste bio
            setBio({...bio,isRequestingBiometricLogin:true})

            const response = await LocalAuthentication.authenticateAsync({
                promptMessage: 'log in with faceID/touchID?',
                fallbackLabel: 'use your passcode',
            });
            /*Hvis der er en key med succes, så set logged ind til true*/
            if (response.success) {
                setBio({...bio,isLoggedInBiometic:true})
            } else {
                Alert.alert('Failure');
            }
            // Vi viser en evt fejl som kommer tilbage
            if (response.error) {
                Alert.alert(response.error);
            }
        } catch (error) {
            // Vi viser en fejl hvis kaldets promise rejecter
            Alert.alert(error.message);
        }
    };

    // For at kunne annullere på Android har vi denne
    const cancelBiometricLogin = () => {
        LocalAuthentication.cancelAuthenticate();
    };

    /*Logud, så ændrer vi vores isLoggedIn State*/
    const logout =() =>{
        setBio({...bio,isLoggedInBiometic:false})
    }


    if(!bio.isLoggedInBiometic){
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Login ind med biometrics!
                </Text>
                {/*   Vi viser knappen hvis brugerens device understøtter biometrics*/}
                {bio.hasBiometricData && bio.hasBiometricHardware && (
                    <Button
                        title="Biometric login"
                        onPress={requestBiometricLogin}
                    />
                )}
                {/*   På Android viser vi denne besked når brugeren skal scanne sin finger*/}
                {bio.isRequestingBiometricLogin && Platform.OS === 'android' && (
                    <View>
                        <Text>Put your finger on fingerprint scanner now.</Text>
                        <Button title="Cancel" onPress={cancelBiometricLogin} />
                    </View>
                )}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Du er logget ind med biometrics!!
                    <Button onPress={logout} title="Log ud"/>
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BioScreen