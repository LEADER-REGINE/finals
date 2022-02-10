import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOAKATk3pi-jPeHXpVOf_UhJTdm7SkSs0",
    authDomain: "finals-e6b8a.firebaseapp.com",
    projectId: "finals-e6b8a",
    storageBucket: "finals-e6b8a.appspot.com",
    messagingSenderId: "222828713722",
    appId: "1:222828713722:web:7607ec9118add180a19b43"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();

export { firebase as default };