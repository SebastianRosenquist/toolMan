// Firebase setup
// Import firebase
import firebase from 'firebase';

// Konfiguration af Firebase til vores projekt
const firebaseConfig = {
    apiKey: "AIzaSyDcwn5RjQKs0M2tWk360oPacpUdL8jH3jw",
    authDomain: "toolmantwo-3cd62.firebaseapp.com",
    databaseURL: "https://toolmantwo-3cd62-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "toolmantwo-3cd62",
    storageBucket: "toolmantwo-3cd62.appspot.com",
    messagingSenderId: "621004841089",
    appId: "1:621004841089:web:18d5cf6796f7f8d1d22d80"
};

// Vi sikre os at Firebase ikke allerede kører
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

//Vi exportere authentikation (auth) og database (db) til brug i vores projekt.
const auth = firebase.auth();
const db = firebase.database();


export { auth, db };
