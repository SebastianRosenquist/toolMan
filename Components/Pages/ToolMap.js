import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";
import {useState, useEffect} from "react";


function ToolMap() {

    //Her instantieres alle anvendte statevariabler
    const [hasLocationPermission, setlocationPermission] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([])
    const [selectedCoordinate, setSelectedCoordinate] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)

    /*
    * getLocationPermission udnytter den prædefinerede asynkrone metode requestForegroundPermissionsAsync,
    * som aktiverer en forespørgsel om tilladelse til at benytte enhedens position
    * resultatet af denne handling leveres og benyttes til at sætte værdien af locationPermission
    * Værdien sættes pba. af værdien item.granted
    * Læs mere i dokumentationen:  https://docs.expo.dev/versions/latest/sdk/location/
    */
    const getLocationPermission = async () => {
        await Location.requestForegroundPermissionsAsync().then((item)=>{
            setlocationPermission(item.granted)
        } );

    };

    // I useEffect kaldes getlocationPermission, der sikrer at enheden forespørger tilladelse
    // så snart appen kører
    useEffect (() => {
        const response = getLocationPermission()
    });

    /*
    * Metoden updateLocation udnytter det prædefinerede asynkrone kald, getCurrentPositionAsync, returnerer enhedens aktuelle position
    * Resultatet fra kaldet benyttes til at fastsætte værdien af currentlokation.
    * argumentet, Accuracy.Balanced, angiver den nøjagtighed vi ønsker skal bruges til at angive positionen.
    * Læs mere på den førnævnte dokumentation
      */
    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
            setCurrentLocation(item.coords)
        } );
    };
    /*
    * Metoden handleLongPress tager en event med som argument og henter værdien af et koordinatsæt fra denne
    * Værdien gemmes i en variabel, der tilføjes til et array af koordinater.
    */
    const handleLongPress = event => {
        const coordinate = event.nativeEvent.coordinate
        setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate])
    };

    /*
  * Metoden handleSelectMarker tager en koordinat med som argument. Kordinaten bruges
  * til at sætte værdien af selectedCoordinat-variablen
  * Dernæst aktiveres et asynkront kald, i form af den prædefinerede metode, reverseGeocodeAsync.
  * reverseGeocodeAsync omsætter koordinatsættet til en række data, herunder område- og adresse data.
  * selectedAdress sættes til at være resultatet af det asynkrone kald
  */
    const handleSelectMarker = async coordinate =>{
        setSelectedCoordinate(coordinate)
        await Location.reverseGeocodeAsync(coordinate).then((data) => {
                setSelectedAddress(data)
            }
        )
    };


    //Metoden closeInfoBox nulstiller værdienne fro selectedAddress og selectedCoordinate
    const closeInfoBox = () =>
        setSelectedCoordinate(null) && setSelectedAddress(null)

    // RenderCurrentLocation tager props med som argument og tjekker om, der er givet adgang til enhedens lokationsdata
    // Er der ikke givet adgang returneres der en tekstkomponent med instruktioner til brugeren
    //Er der givet tilladelse og currenLocation ikke har en værdi, vil der fremvises en knap komponent
    //Er der givet tilladelse go currentlokation har en værdi, vil lokationsdata blive udskrvet i en infoboks
    const RenderCurrentLocation = (props) => {
        if (props.hasLocationPermission === null) {
            return null;
        }
        if (props.hasLocationPermission === false) {
            return <Text>No location access. Go to settings to change</Text>;
        }
        return (
            <View>
                <Button style title="update location" onPress={updateLocation} />
                {currentLocation && (
                    <Text>
                        {`lat: ${currentLocation.latitude},\nLong:${
                            currentLocation.longitude
                        }\nacc: ${currentLocation.accuracy}`}
                    </Text>
                )}
            </View>
        );
    };

//Slutteligt benyttes SafeAreaView der sikrer at indholdet ikke overskrider grænser for enheden(Kun for IOS enheder version 11 eller nyere )
    /*
    * Dernæst kaldes RenderCurrenokation view
    * Mapview er fremviser et kort, der viser brugerens lokation
    * Dernæst aktiverer metoden handleLongPress igennem onLongPress
    * I Mapview vises tre markører ud fra vilkårlige koordinatsæt. Hver markør får en titel og en beskrivelse
    * Derudover vil alle koordinatsæt i userMarkerCoordinates blive vist som markører på kortet.
    * For hver af markørerne vil metoden handleSelectMarker blive aktiveret ved onPress,
    * hvorved selectedCoordinate og selectedAddres får en værdi og der udskrives data om den vaælgte markør
    *
    */
    {
        return (
            <SafeAreaView style={styles.container}>
                <RenderCurrentLocation props={{hasLocationPermission: hasLocationPermission, currentLocation: currentLocation}} />
                <MapView
                    provider="google"
                    style={styles.map}
                    showsUserLocation
                    onLongPress={handleLongPress}>
                    <Marker
                        coordinate={{ latitude: 55.676195, longitude: 12.569419 }}
                        title="Rådhuspladsen"
                        description="blablabal"
                    />
                    <Marker
                        coordinate={{ latitude: 55.673035, longitude: 12.568756 }}
                        title="Tivoli"
                        description="blablabal"
                    />
                    <Marker
                        coordinate={{ latitude: 55.674082, longitude: 12.598108 }}
                        title="Christiania"
                        description="blablabal"
                    />
                    {userMarkerCoordinates.map((coordinate, index) => (
                        <Marker
                            coordinate={coordinate}
                            key={index.toString()}
                            onPress={() => handleSelectMarker(coordinate)}
                        />
                    ))}
                </MapView>
                {selectedCoordinate && selectedAddress && (
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                        </Text>
                        <Text style={styles.infoText}>
                            name: {selectedAddress[0].name}  region: {selectedAddress[0].region}
                        </Text>
                        <Button title="close" onPress={closeInfoBox} />
                    </View>
                )}
            </SafeAreaView>
        );
    }
}


//Lokal styling til brug i App.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    map: { flex: 1 },
    infoBox: {
        height: 200,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    infoText: {
        fontSize: 15,
    },
});
export default ToolMap