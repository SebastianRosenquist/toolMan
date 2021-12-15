//Import af Pages og Componenter
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { auth, db } from '../../firebase';
import Modal from 'react-native-modal';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

//Vores modal til at redigere koordinator/modal på kortet. Både vores AddToolModal og EditToolModal
// har næsten samme konstruktion.
const EditCoordinateModal = ({ isOpen, handleClose, coordinate }) => {
    //Vores initial states
    const initialState = {
        address: '',
        date: '',
        availableTools: '',
        //description: '',
    };
    //Vi indrager de forskellige variabler vi ønsker at bruge
    const [userDate, setUserDate] = useState(new Date(coordinate.date));
    const [mode, setMode] = useState('date');
    const [newCoordinate, setNewCoordinate] = useState(initialState);
    const [joinedUsers, setjoinedUsers] = useState([]);
    const [show, setShow] = useState(false);

    //Hent metoden til at vise date-picker hvis man trykker ændre tid eller dato
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || userDate;
        setShow(Platform.OS === 'ios');
        setUserDate(currentDate);
    };

    useEffect(() => {
        //Her henter vi de tilkoblet users som er tilbundet koordinaterne,
        // hvilke ikke bruges lige nu men skulle vises i vores modal
        setNewCoordinate(coordinate);
        if (coordinate.userjoined) {
            setjoinedUsers(Object.keys(coordinate.userjoined));
        }
    }, []);

    // Når programmet modtager et input, indsætter den dette som et newCoordinate object.
    const changeTextInput = (key, event) => {
        setNewCoordinate({ ...newCoordinate, [key]: event });
    };

    const handleSave = () => {
        //Hvis ikke user kan bekræftes, sker dette.
        if (newCoordinate.userid != auth.currentUser.uid) {
            return Alert.alert('Not your rental.');
        }

        //Vi henter det variabler vi har behov for.
        const date = userDate;
        const id = newCoordinate.id;
        const { availableTools } = newCoordinate;
        const { latitude, longitude } = coordinate;
        if (
            latitude.length === 0 ||
            latitude.length === 0 ||
            date.length === 0 ||
            availableTools.length === 0
        ) {
            return Alert.alert('Error with input');
        }

        //Hvis vi ønsker at opdatere vores coodinates object, henter vi ID fra firebase og bruger .update til at
        //opdatere vores attributer.
        try {
            db.ref(`coordinates/${id}`)
                // Kun de valgte attributer vil blive opdateret
                .update({ latitude, longitude, date, availableTools });
            // OBS. pt. kan man kun opdatere lat og longitude. Adressen kan ikke opdateres endnu.
            Alert.alert('Your info has been updated');
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
        // Vi lukker vores modal
        handleClose();
    };

    // Vi kalder en alert hvis bruger ønsker at slette deres tool-rental. Kører handleDelete hvis Delete er trykket
    const confirmDelete = () => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Are you sure?', 'Do you want to delete the Tool-rental?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi fjerner vores koordinater fra firebase databsen og navigere tilbage. Hvis der opstår fejl, fanger vi
    // den og udskriver i console.log
    const handleDelete = () => {
        const id = coordinate.id;
        try {
            db.ref(`coordinates/` + id).remove();
            handleClose();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    if (!newCoordinate) {
        return (
            <Modal
                visible={isOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    handleClose();
                }}
            >
                <Text>Loading...</Text>
                <Button title="Close" onPress={() => handleClose()} />
            </Modal>
        );
    }

    return (
        <Modal
            visible={isOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                handleClose();
            }}
        >
            <View style={styles.modalView}>
                {Object.keys(initialState).map((key, index) => {
                    if (typeof newCoordinate[key] == 'number') {
                        newCoordinate[key] = newCoordinate[key].toString();
                    }
                    if (key == 'address') {
                        return (
                            <View key={index}>
                                <View style={styles.row}>
                                    <Text style={{ fontWeight: 'bold' }}>Street: </Text>
                                    <Text>{`${coordinate[key].street} ${coordinate[key].name}`} </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontWeight: 'bold' }}>City: </Text>
                                    <Text>{`${coordinate[key].city}`} </Text>
                                </View>
                            </View>
                        );
                    } else if (key == 'date') {
                        return (
                            <View key={index}>
                                <Text style={styles.modalText}>Tool-Pickup Time: </Text>
                                <View style={styles.pickedDateContainer}>
                                    <Text>
                                        {userDate.toString().split(' ').splice(0, 5).join(' ')}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={showDatepicker}
                                    style={styles.button}
                                >
                                    <Text>Choose Rental-Pickup date</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={showTimepicker}
                                    style={styles.button}
                                >
                                    <Text>Choose Rental-Pickup time</Text>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={userDate}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                        );
                    } else {
                        return (
                            <View key={index}>
                                <Text style={{ fontWeight: 'bold' }}>Amount of Available Tools: </Text>
                                <TextInput
                                    value={newCoordinate[key]}
                                    style={GlobalStyles.input}
                                    onChangeText={(event) => changeTextInput(key, event)}
                                />
                            </View>
                        );
                    }
                })}
                {/*Denne kamp bruger handleSave() til at håndtere ændringer til ens Tool-rental*/}
                <View style={{flexDirection: 'row'}}>
                    <View style={{ marginVertical: 5, marginRight: 5}}>
                        <Button
                            title={'Save changes'}
                            color={BrandColors.Primary}
                            onPress={() => handleSave()}
                        />
                    </View>
                    {/* Denne knap bruges til at lukkke vores modal */}
                    <View style={{ marginVertical: 5 }}>
                        <Button
                            title="Close"
                            color={BrandColors.Primary}
                            onPress={() => {
                                handleClose();
                            }}
                        />
                    </View>
                </View>
                {/* Denne knap bruges til at slette */}
                <View style={{ marginVertical: 5 }}>
                    <Button
                        title={'Delete Tool Rental'}
                        color={BrandColors.Primary}
                        onPress={() => confirmDelete()}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default EditCoordinateModal;

const styles = StyleSheet.create({
    modalView: {
        margin: 30,
        backgroundColor: BrandColors.WhiteLight,
        borderRadius: 20,
        padding: 35,
        marginTop: 70,
        alignItems: 'flex-start',
        shadowColor: BrandColors.GreyDark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pickedDateContainer: {
        padding: 5,
        backgroundColor: BrandColors.WhiteDark,
        borderRadius: 2,
        marginBottom: 5,
    },
    modalText: {
        marginBottom: 15,
        marginTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        margin: 5,
        backgroundColor: BrandColors.WhiteLight,
        width: '100%',
        borderColor: BrandColors.PrimaryLight,
        borderWidth: 2,
        marginTop: 5,
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
    },
});
