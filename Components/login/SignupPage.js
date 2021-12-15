//Import af Pages og Componenter
import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth, db } from '../../firebase';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';

const LoginScreen = ({ navigation }) => {
    //Vores tre variabler der bruges til email, password og brugernavn
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        //Hvis bruger er logget ind -> gå til HomeScreen hvilke er vores tabNaviagator
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('HomeScreen');
            }
        });
        return unsubscribe;
    }, []);

    //Vores register handler
    const handleRegister = () => {
        //Vi skal først skabe vores user
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const userCredentials = user.user;
                if (user && name) {
                    try {
                        //Hvis vores user og navn er der, sætter vi noget data i vores userData object
                        //Vi gør dette fordi vi man ikke kan tilføje properties til et auth object
                        //Så vi er nødt til at skabe dem her
                        //Vi tildeler også alle group 1 som start
                        db.ref('userData/' + userCredentials.uid).set({
                            name: name,
                            group: 1,
                        });
                    } catch (error) {
                        Alert.alert(`Error: ${error.message}`);
                    }
                }
                console.log('Registered user with email: ', userCredentials.uid);
            })
            .catch((error) => alert(error.message));
    };

    //Gå til loginPage
    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView //Bruger denne funktion så tastatur ikke dækker for vores inputs.
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.inputContainer}>
                <Text style={styles.header}>
                    Register to ToolMan
                </Text>
                <Text style={styles.buttonOutlineText}>
                    Please input your desired credentials to register.
                </Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login Here</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        backgroundColor: BrandColors.SecondaryLight,
    },
    header: {
        ...GlobalStyles.header,
        color: BrandColors.GreyDark,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: BrandColors.WhiteLight,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        color: BrandColors.GreyDark,
        borderColor: BrandColors.PrimaryDark,
        borderWidth: 2,
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: BrandColors.PrimaryDark,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonOutline: {
        backgroundColor: BrandColors.WhiteLight,
        marginTop: 5,
        marginBottom: 5,
        borderColor: BrandColors.PrimaryDark,
        borderWidth: 2,
    },

    buttonText: {
        color: BrandColors.SecondaryLight,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: BrandColors.PrimaryDark,
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
    },
});
