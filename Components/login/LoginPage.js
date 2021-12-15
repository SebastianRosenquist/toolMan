//Import af Pages og Components
import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Alert
} from 'react-native';
import { auth } from '../../firebase';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';

const LoginScreen = ({ navigation }) => {
    //Opsætning af to variabler der bruges til email og password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //Hvis bruger er logget ind -> gå til HomeScreen hvilke er vores tabNaviagator
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('HomeScreen');
            }
        });
        return unsubscribe;
    }, []);

    //En navigation til vores signupPage.
    const handleRegister = () => {
        navigation.navigate('Register');
    };

    //En handleLogin som håndtere vores login
    const handleLogin = () => {
        //Brug firebase.auth metode til at logge brugere ind gennem firebase.
        auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                Alert.alert('Logged in with: ', user.email);
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView //Bruger denne funktion så tastatur ikke dækker for vores inputs.
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.inputContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/ToolManLogo2.png')}
                        style={{
                            height: 300,
                            width: 456,
                            margin: 10,
                        }}
                    />
                </View>
                <Text style={styles.header}>Welcome to ToolMan - your friendly tool-finding App!</Text>
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
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleRegister}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register Here</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        backgroundColor: BrandColors.PrimaryLight,
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
        backgroundColor: BrandColors.SecondaryLight,
        marginTop: 5,
        borderColor: BrandColors.PrimaryLight,
        borderWidth: 2,
    },

    buttonText: {
        color: BrandColors.PrimaryLight,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: BrandColors.PrimaryDark,
        fontWeight: '700',
        fontSize: 16,
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 20,
        fontSize: 18,
        color: BrandColors.PrimaryDark,
    },
});
