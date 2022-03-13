import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDoXMCGuft534vMKG1T0pXG6yd47GEuuOg",
    authDomain: "instagram-clone-96e8f.firebaseapp.com",
    projectId: "instagram-clone-96e8f",
    storageBucket: "instagram-clone-96e8f.appspot.com",
    messagingSenderId: "36360262323",
    appId: "1:36360262323:web:3f90eba3766348c32896c6",
    measurementId: "G-6ERQ0CN13E"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };