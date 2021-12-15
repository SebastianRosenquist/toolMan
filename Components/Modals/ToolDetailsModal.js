//Import af Pages og Components
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Button, Alert } from 'react-native';
import { auth, db } from '../../firebase';
import Modal from 'react-native-modal';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';

// Vi henter vores inital states af de vi ønsker at presentere i vores modal
const CoordinateDetailsModal = ({ isOpen, handleClose, coordinate }) => {
    const initialState = {
        address: '',
        date: '',
        availableTools: '',
    };
    const [joinedUsers, setjoinedUsers] = useState([]);
    const [nameOfUser, setnameOfUser] = useState([]);

    // Vin finder et username på det userId som er tilknyttet det valgte koordinat
    useEffect(() => {
        getUserName(coordinate.userid);
        //Her finder vi den/de bruger som har ønsket at leje på det koordinat. Det er dog ikke færdigkodet.
        if (coordinate.userjoined) {
            setjoinedUsers(Object.keys(coordinate.userjoined));
        }
    }, [isOpen]);

    //Vi skaber en funktion der skal tilknytte en bruger med et udlejnings-koordinat
    const handleAskRental = () => {
        const id = coordinate.id;

        if (coordinate.userid == auth.currentUser.uid) {
            return Alert.alert('This is your Tool-rental');
        }
        // For at redigere koordinatet, sender vi et id request til firebase og bruge .update til at opdatere attributtet
        // af vores initialState objekt.
        // Vi trækker også 1 fra vores availableTools for at vise at der nu er udlejet et værktøj fra det koordinat.
        coordinate.availableTools -= 1;
        try {
            db.ref(`coordinates/${id}`)
                // Kun de valgte værdiere opdateres
                .update({ availableTools: coordinate.availableTools });
            // En alert til at informere user
            Alert.alert(`You asked to rent this Tool: ${coordinate.description}`);
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }

        //Vi indsætter en userJoined ind i vores koordinater objekt. Så kan vi se at der er en eller flere som
        //er tilknyttet dette værktøj.
        try {
            db.ref(`coordinates/${id}/userjoined/` + auth.currentUser.uid)
                //userjoined/:id sættes til true. Dermed er en user sat på værktøjet
                .set({ 0: true });

            Alert.alert(`You asked to rent this Tool: ${coordinate.description}`);
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
        //Vi lukker vores modal
        handleClose();
    };

    //Denne funktion muligøre at man kan afbestille ens udlejning. Den driller stadig lidt og vi arbejder på det.
    const handleCancelRental = () => {
        const id = coordinate.id;

       /*
        Prøvet at indsætte disse til at fange problemer. Det viser sig at de skaber problemer selv
        if (coordinate.userid == auth.currentUser.uid) {
            return Alert.alert('This is your rental');
        }

        if (coordinate.availableTools == 0) {
            return Alert.alert('This Tool has already been rented');
        }*/

        coordinate.availableTools += 1;
        try {
            db.ref(`coordinates/${id}`)
                .update({ availableTools: coordinate.availableTools });
            Alert.alert(`You asked to cancel your rental of this Tool: ${coordinate.description}`);
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }

        try {
            db.ref(`coordinates/${id}/userjoined/` + auth.currentUser.uid)
                // Vi fjerner vores userjoined, så det virker som om værktøjet er ledig igen.
                .remove();
            // Kalder en alert
            Alert.alert('You cancelled your Tool-rental');
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
        //Vi lukker vores modal
        handleClose();
    };

    //Vi henter username på den user som har oprettet rental. Dette hentes fra userData.
    const getUserName = async (id) => {
        let name;
        await db
            .ref('userData/' + id)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    name = snapshot.val().name;
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });

        setnameOfUser(name);
    };

    // Hvis der ingen koordinater er, vises følgende:
    if (!coordinate) {
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
                <Button
                    title="Close"
                    color={BrandColors.Primary}
                    onPress={() => handleClose()}
                />
            </Modal>
        );
    }

    //Hvis man er den user som har ønsket at leje et værktøj, som ses i joinedUserKey, så kan man cancel sin udlejning.
    //Hvis ikke, kan man ønske at leje værktøjet.
    const buttons = () => {
        if (joinedUsers.includes(auth.currentUser.uid)) {
            return (
                <View style={{ marginVertical: 5}}>
                    <Button
                        title="Cancel your Tool-rental"
                        color={BrandColors.Primary}
                        onPress={() => handleCancelRental()}
                    />
                </View>
            );
        } else {
            return (
                <View style={{ marginVertical: 5}}>
                    <Button
                        title="Ask for rental of this tool"
                        color={BrandColors.Primary}
                        onPress={() => handleAskRental()}
                    />
                </View>
            );
        }
    };

    //Vi returnere vores modal
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
                <Text style={{ fontWeight: 'bold' }}> Rentee: {nameOfUser} </Text>
                {Object.keys(initialState).map((key, index) => {
                    //Vi nødt til at reformatere vores keys da vi skal bruge mere data når key er en adresse.
                    if (key == 'address') {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                                <Text style={{ width: '80%' }}>
                                    {`${coordinate[key].street} ${coordinate[key].name} ${coordinate[key].city} ${coordinate[key].postalCode}`}{' '}
                                </Text>
                            </View>
                        );
                    } else if (key == 'date') {
                        //Med dato skal data være en læselig string
                        let formattedDate = new Date(Date.parse(coordinate[key]));
                        let dateString = `${formattedDate.toLocaleString('default', {
                            month: 'short',
                        })}`;
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={{ fontWeight: 'bold' }}>Date:</Text>
                                <Text> {dateString} </Text>
                            </View>
                        );
                    } else {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={{ fontWeight: 'bold' }}>Number of tools available: </Text>
                                <Text> {coordinate[key]} </Text>
                            </View>
                        );
                    }
                })}
                <View style={{flexDirection: 'row'}}>
                    <View style={{ marginVertical: 5, marginRight: 5}}>
                        <Button
                            title="Close"
                            color={BrandColors.Primary}
                            style={{marginVertical: 5}}
                            onPress={() => {
                                handleClose();
                            }}
                        />
                    </View>
                    {buttons()}

                </View>
            </View>
        </Modal>
    );
};

export default CoordinateDetailsModal;

const styles = StyleSheet.create({
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    modalView: {
        margin: 30,
        backgroundColor: BrandColors.WhiteLight,
        borderRadius: 20,
        padding: 35,
        marginTop: 70,
        alignItems: 'center',
        shadowColor: BrandColors.GreyDark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: BrandColors.PrimaryLight,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: BrandColors.WhiteLight,
        marginTop: 5,
        borderColor: BrandColors.PrimaryLight,
        borderWidth: 2,
    },

    buttonText: {
        color: BrandColors.WhiteLight,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: BrandColors.PrimaryLight,
        fontWeight: '700',
        fontSize: 16,
    },
});
