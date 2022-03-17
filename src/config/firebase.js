import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAgkXzG4887lZVdtjrcpuR2ztwauczK-ZA",
    authDomain: "instagram-clone-c29a4.firebaseapp.com",
    projectId: "instagram-clone-c29a4",
    storageBucket: "instagram-clone-c29a4.appspot.com",
    messagingSenderId: "569270760334",
    appId: "1:569270760334:web:264e5ce5744ac3f6f32adf",
    measurementId: "G-VKSY22B9TP"
});

const db = firebase.firestore(firebaseApp)
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };