//Import af Pages og Components
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Dimensions,
    Button,
    Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';
import { auth, db } from '../../firebase';
import EditToolModal from '../Modals/EditToolModal';
import AddToolModal from '../Modals/AddToolModal';
import { Accuracy } from 'expo-location';

import ToolDetailsModal from '../Modals/ToolDetailsModal';

const MapScreen = ({ route }) => {
    // Vores states til at skabe markers. Vi sætter også en default lokation.
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userMarkerCoordinate, setUserMarkerCoordinate] = useState(null);

    //Vi sætter states for vores coodinates, groups, addresses, currentLocation, modals
    //Vi sætter currentLocation initial state til null, da det er god kode etik
    const [currentLocation, setCurrentLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markerAddress, setMarkerAddress] = useState();
    const [group, setGroup] = useState();
    const [coordinates, setCoordinates] = useState([]);
    const [groupId, setGroupId] = useState();
    const [modalInsert, setModalInsert] = useState();

    // Vi beder brugeren om lov til at benytte lokation/gps funktion
    const getLocationPermission = async () => {
        await Location.requestForegroundPermissionsAsync().then((item) => {
            setHasLocationPermission(item.granted);
        });
    };

    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({
            accuracy: Accuracy.Balanced,
        }).then((item) => {
            setCurrentLocation(item.coords);
        });
    };

    // En useEffect hook som kører hvergang siden opdateres.
    // Hvis noget sker, kører getLocationPermission igen for at se om der er tilladelse.
    useEffect(() => {
        const response = getLocationPermission();
        getCoordinates();
        updateLocation();
    }, [modalInsert, modalVisible]);

    const getCoordinates = async () => {
        let groupid;

        await db
            .ref('userData/' + auth.currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    groupid = snapshot.val().group;
                    setGroupId(groupid);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });

        let coordinates = [];
        await db
            .ref('coordinates/')
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((coordinate) => {
                        if (coordinate.val().groupId == groupid) {
                            let newObj = {
                                id: coordinate.key,
                                availableTools: coordinate.val().availableTools,
                                date: coordinate.val().date,
                                groupId: coordinate.val().groupId,
                                latitude: coordinate.val().latitude,
                                longitude: coordinate.val().longitude,
                                userid: coordinate.val().userid,
                                userjoined: coordinate.val().userjoined,
                                address: coordinate.val().address,
                            };
                            coordinates.push(newObj);
                        }
                    });
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });

        setCoordinates(coordinates);
        getGroup(groupid);
    };

    // En handleLongPress funktion som sætter coordinates og opdatere vores userMarkerCoordinates array når
    // en brugere laver et longpress på vores map
    const handleLongPress = async (event) => {
        const coordinate = event.nativeEvent.coordinate;

        await Location.reverseGeocodeAsync(coordinate).then((data) => {
            setMarkerAddress(data);
        });
        setUserMarkerCoordinate(coordinate);

        // Vi bruger haptics til at skabe en vibrations-feedback til brugeren når der laves et longpress
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setModalVisible(true);
    };

    //Vi ændre farven på vores pins alt afhængig af om den loggedIn bruger skabte pin eller en anden bruger gjorde
    const getPinColor = (userid) => {
        if (userid == auth.currentUser.uid) {
            return 'violet';
        } else {
            return 'green';
        }
    };

    const handleClose = () => {
        setModalInsert(null);
    };

    const handleNewClose = () => {
        setModalVisible(false);
    };

    const getGroup = async (groupid) => {
        await db
            .ref('groups/' + groupid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setGroup(snapshot.val());
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getModal = (coordinate) => {
        if (coordinate.userid != auth.currentUser.uid) {
            setModalInsert(
                <ToolDetailsModal
                    isOpen={true}
                    handleClose={handleClose}
                    coordinate={coordinate}
                />
            );
        } else {
            setModalInsert(
                <EditToolModal
                    isOpen={true}
                    handleClose={handleClose}
                    coordinate={coordinate}
                />
            );
        }
    };

    if (!group || !currentLocation) {
        return (
            <View>
                <Button
                    onPress={() => {
                        getCoordinates();
                    }}
                    title="Reload map (Test button)"
                    color={BrandColors.SecondaryDark}
                    accessibilityLabel="Reload map"
                />
                <Text>Loading...</Text>
            </View>
        );
    }

    const userMarker =
        userMarkerCoordinate != null ? (
            <Marker
                title="Temporary marker"
                description="This is where Tool-info will go"
                pinColor="yellow"
                coordinate={userMarkerCoordinate}
            />
        ) : null;

    return (
        <SafeAreaView style={styles.container}>
            <Button
                onPress={() => {
                    getCoordinates();
                }}
                title="Reload map"
                color={BrandColors.SecondaryDark}
                accessibilityLabel="Reload map"
            />
            {/* Vores mapPage viser den nuværende lokation og tilføjre koordinater på et onLongPress */}
            <MapView
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
                showsUserLocation
                onRegionChange={(region) => {
                    setHasLocationPermission({
                        latitude: region.latitude,
                        longitude: region.longitude,
                    });
                }}
                onRegionChangeComplete={(region) => {
                    setHasLocationPermission({
                        latitude: region.latitude,
                        longitude: region.longitude,
                    });
                }}
                onLongPress={handleLongPress}
            >
                {/* Vores butikker/organisations markør */}
                {!group ? null : (
                    <Marker
                        title={group.organisation}
                        description={`The location of ${group.organisation}`}
                        pinColor={BrandColors.Secondary}
                        coordinate={{
                            latitude: Number(group.latitude),
                            longitude: Number(group.longitude),
                        }}
                    />
                )}

                {coordinates.map((coordinate, index) => {
                    let formattedDate = new Date(Date.parse(coordinate.date));
                    let dateString = `${formattedDate.toLocaleString('default', {
                        month: 'short',
                    })}`;
                    let isUserjoined = !coordinate.userjoined
                        ? null
                        : coordinate.userjoined[auth.currentUser.uid];
                    if (coordinate.availableTools > 0 || isUserjoined) {
                        return (
                            <Marker
                                title={dateString}
                                description="Press here for more information."
                                key={index}
                                onCalloutPress={() => {
                                    getModal(coordinate);
                                }}
                                pinColor={getPinColor(coordinate.userid)}
                                coordinate={{
                                    latitude: Number(coordinate.latitude),
                                    longitude: Number(coordinate.longitude),
                                }}
                            />
                        );
                    }
                })}
                {/* Går gennem userMarkerCoordinates array og laver et output for dem alle */}
                {userMarker}
            </MapView>
            <View>
                {
                    <AddToolModal
                        isOpen={modalVisible}
                        handleClose={handleNewClose}
                        coordinate={userMarkerCoordinate}
                        address={markerAddress}
                        setUserMarkerCoordinate={setUserMarkerCoordinate}
                        group={groupId}
                    />
                }
                {modalInsert}
            </View>
        </SafeAreaView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
    },
    header: {
        ...GlobalStyles.header,
        color: BrandColors.SecondaryDark,
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    input: {
        borderWidth: 1,
        padding: 5,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    buttonClose: {
        backgroundColor: BrandColors.SecondaryDark,
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
