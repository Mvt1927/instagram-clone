import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCvSJOd3jo5kShV6ux68nNrB5eD-5phpPc",
    authDomain: "instagram-b65dc.firebaseapp.com",
    projectId: "instagram-b65dc",
    storageBucket: "instagram-b65dc.appspot.com",
    messagingSenderId: "1064746753374",
    appId: "1:1064746753374:web:1542c0f211b1df4314c3cf",
    measurementId: "G-7HNQRTGZ2S"
});

const db = firebase.firestore(firebaseApp)
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage
};