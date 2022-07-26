import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAyVWFdH5q1er1D-9HWKur-ae6676Ew4sA",
    authDomain: "video-player-app-c9295.firebaseapp.com",
    projectId: "video-player-app-c9295",
    storageBucket: "video-player-app-c9295.appspot.com",
    messagingSenderId: "836346460297",
    appId: "1:836346460297:web:df9ef40f1e0516335cae58",
    measurementId: "G-59D7YXRSQE"
  };

const firebaseapp=firebase.initializeApp(firebaseConfig)
const db=firebaseapp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;