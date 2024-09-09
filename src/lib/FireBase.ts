import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyBtTtL_tQNOy39fNZBJFNULEIPSteolOC4",
    authDomain: "gt-auto-portal.firebaseapp.com",
    projectId: "gt-auto-portal",
    storageBucket: "gt-auto-portal.appspot.com",
    messagingSenderId: "362269636344",
    appId: "1:362269636344:web:9ef717dc1fb59e841a2d0d",
    measurementId: "G-RHMW1YD33D"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;