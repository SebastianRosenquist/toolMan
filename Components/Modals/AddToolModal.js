// Import modules and firebase to access data from database
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

//Modal for use in Map Screen to make a coordinate.
const AddCoordinateModal = ({
                                isOpen,
                                handleClose,
                                coordinate,
                                setUserMarkerCoordinate,
                                address,
                                group,
                            }) => {
    // Here we take in the different variables we want to use
    // A userDate made from the data picker
    const [userDate, setUserDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [availableSeats, setAvailableSeats] = useState();
    const [description, setDescription] = useState()

    //Get the mode to show in date picker, depending if you press change time or date
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    //For the date
    const showDatepicker = () => {
        showMode('date');
    };

    //For the time
    const showTimepicker = () => {
        showMode('time');
    };

    //This creates the ride
    const createToolRental = async (event) => {
        let newDate = userDate.toString();
        try {
            //Here we push the new coordinate into the coordinate object.
            db.ref('coordinates/').push({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                address: address,
                userid: auth.currentUser.uid,
                availableSeats: availableSeats,
                description: description,
                groupId: group,
                date: newDate,
                //Should deconstruct the address later, to only use the things we use.
                address: {
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

        //Here we set the userMarker to null, so the yellow marker disappers
        setUserMarkerCoordinate(null);
        //Here the modal is closed
        handleClose();
    };

    //When changing the date, we set the date as userDate
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || userDate;
        setShow(Platform.OS === 'ios');
        setUserDate(currentDate);
    };

    //If address is null, then we show a loading modal
    if (!address) {
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
    //Here we return the modal which is seen in the MapScreen
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
                    onChangeText={setAvailableSeats}
                    defaultValue={'1'}
                    value={availableSeats}
                    placeholder="Please indicate how many tools you have available to rent out"
                    keyboardType="default"
                />
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>What are you renting out? </Text>
                <TextInput
                    style={GlobalStyles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Please describe the Tool you are renting out"
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
