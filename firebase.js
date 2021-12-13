// Firebase setup
// Import firebase
import firebase from 'firebase';


// Firebase configuration for project
const firebaseConfig = {
    apiKey: "AIzaSyDcwn5RjQKs0M2tWk360oPacpUdL8jH3jw",
    authDomain: "toolmantwo-3cd62.firebaseapp.com",
    databaseURL: "https://toolmantwo-3cd62-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "toolmantwo-3cd62",
    storageBucket: "toolmantwo-3cd62.appspot.com",
    messagingSenderId: "621004841089",
    appId: "1:621004841089:web:18d5cf6796f7f8d1d22d80"
};

// Initialize Firebase if it is not already initialized
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

//we export both the auth and the db objects, which we get from these two functions.
const auth = firebase.auth();
const db = firebase.database();


export { auth, db };
