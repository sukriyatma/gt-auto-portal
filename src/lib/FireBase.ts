import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: process.env.DISCORD_API_KEY,
    authDomain: process.env.DISCORD_AUTH_DOMAIN,
    projectId: process.env.DISCORD_PROJECT_ID,
    storageBucket: process.env.DISCORD_STORAGE_BUCKET,
    messagingSenderId: process.env.DISCORD_MESSAGING_SENDER_ID,
    appId: process.env.DISCORD_APP_ID,
    measurementId: process.env.DISCORD_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;