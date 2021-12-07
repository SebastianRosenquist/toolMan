import * as React from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import firebase from 'firebase';
//import TitleModule from "../modules/TitleModule.js";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
//import GlobalStyles from "../modules/GlobalStyle";


export default class loginScreen extends React.Component {
    state = {
        email: 'admin@admin.dk',
        password: '123456',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    /*Login Render*/
    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        return (
            <View style={GlobalStyles.mainContainer}>
                <TitleModule title="Velkommen til PlingIt!"/>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{width:"60%",height:"30%",marginBottom:-20,marginTop:-20}}
                />
                <View style={GlobalStyles.innerContainer}>
                    <Text style={GlobalStyles.header}>Login</Text>
                    <TextInput
                        placeholder="email"
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        style={GlobalStyles.inputField}
                    />
                    <TextInput
                        placeholder="password"
                        value={password}
                        onChangeText={this.handleChangePassword}
                        secureTextEntry
                        style={GlobalStyles.inputField}
                    />
                    {errorMessage && (
                        <Text style={GlobalStyles.error}>Error: {errorMessage}</Text>
                    )}
                    {this.renderButton()}
                </View>
            </View>
        );
    };
    /*Render knapper afhængig og jeg er loadet*/
    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Login" />;
    };
}


/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});*/
