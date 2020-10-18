import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNHr_OfySN5qMOS3pVQ4IIgbuPvlqu_1s",
    authDomain: "simple-inventory-ee733.firebaseapp.com",
    databaseURL: "https://simple-inventory-ee733.firebaseio.com",
    projectId: "simple-inventory-ee733",
    storageBucket: "simple-inventory-ee733.appspot.com",
    messagingSenderId: "834606914926",
    appId: "1:834606914926:web:f567360d8f8b4184bb757f"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();