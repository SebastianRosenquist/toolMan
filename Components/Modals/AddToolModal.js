//Import af Pages og Components
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { auth, db } from '../../firebase';
import Modal from 'react-native-modal';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

//Vores modal til at skabe koordinator på kortet
const AddCoordinateModal = ({
                                isOpen,
                                handleClose,
                                coordinate,
                                setUserMarkerCoordinate,
                                address,
                                group,
                            }) => {
    //Her impotere vi de forskellige variabler vi ønsker at bruge
    //userDate hentes fra date picker
    const [userDate, setUserDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [availableTools, setAvailableTools] = useState();
    const [description, setDescription] = useState()

    //Hent metoden til at vise date-picker hvis man trykker ændre tid eller dato
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    //For tid
    const showTimepicker = () => {
        showMode('time');
    };

    //For dato
    const showDatepicker = () => {
        showMode('date');
    };

    //Denne funktion skaber vores ToolRental
    const createToolRental = async (event) => {
        let newDate = userDate.toString();
        try {
            //Vi pusher vores nye coordinater ind i vores coodinate objekt.
            db.ref('coordinates/').push({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                address: address,
                userid: auth.currentUser.uid,
                availableTools: availableTools,
                description: description,
                groupId: group,
                date: newDate,
                address: { //Webstorm siger at der er en fejl her fordi vi har deklareret variablen 2 gange. Dog virker
                            // det ligesom det gjorde i den video vi har set omkring react-native modal og maps.
                    city: address[0].city,
                    country: address[0].country,
                    district: address[0].district,
                    isoCountryCode: address[0].isoCountryCode,
                    name: address[0].name,
                    postalCode: address[0].postalCode,
                    street: address[0].street,
                },
            });
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }

        //Vi sætter vorse userMaker til null så vores midlertidig markør forsvinder
        setUserMarkerCoordinate(null);
        //Vi lukker vores modal
        handleClose();
    };

    //Når vi skal ændre vores dato, sætter vi vores dato til userDate
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || userDate;
        setShow(Platform.OS === 'ios');
        setUserDate(currentDate);
    };

    //Hvis addressen ikke eksistere (returnere null), viser vi en loading modal
    if (!address) {
        return (
            <Modal
                visible={isOpen}
                animationType="fade"
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
    //Her returnere vi den modal som vises på vores MapPage
    return (
        <Modal
            visible={isOpen}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
                handleClose();
            }}
        >
            <View style={styles.modalView}>
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}
                >
                    Create Tool for Rent
                </Text>
                <Text style={styles.modalText}>Tool Pickup Time: </Text>
                <View style={styles.pickedDateContainer}>
                    <Text>{userDate.toString().split(' ').splice(0, 5).join(' ')}</Text>
                </View>
                <TouchableOpacity
                    onPress={showDatepicker}
                    style={[styles.button, styles.buttonClose]}
                >
                    <Text style={styles.textStyle}>Choose Pickup date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showTimepicker}
                    style={[styles.button, styles.buttonClose]}
                >
                    <Text style={styles.textStyle}>Choose Pickup time</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Address: </Text>
                <Text>{`${address[0].street} ${address[0].name} ${address[0].city} ${address[0].postalCode}`}</Text>

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
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Please indicate how many tools you have available to rent out (default=1): </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={setAvailableTools}
                    //defaultValue={'1'}
                    //Har forsøgt at sætte en default værdi - men dette skaber problemer hvis
                    //ikke det er fyldt manuelt ud.
                    value={availableTools}
                    placeholder="How many tools you have available to rent out"
                    keyboardType="default"
                />
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>What are you renting out? </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Describe the Tool you are renting out"
                    keyboardType="default"
                />
                <View style={{flexDirection: 'row'}}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleClose()}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonSave] }
                        onPress={() => createToolRental()}
                    >
                        <Text style={styles.textStyle}>Create Tool Rental</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default AddCoordinateModal;

const styles = StyleSheet.create({
    modalView: {
        margin: 30,
        padding: 35,
        marginTop: 70,
        backgroundColor: BrandColors.WhiteLight,
        borderRadius: 20,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    buttonClose: {
        backgroundColor: BrandColors.Primary,
        marginRight: 5
    },
    buttonSave: {
        backgroundColor: BrandColors.Primary,
    },
    textStyle: {
        color: BrandColors.WhiteLight,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        marginTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pickedDateContainer: {
        padding: 5,
        backgroundColor: BrandColors.WhiteDark,
        borderRadius: 2,
    },
});
