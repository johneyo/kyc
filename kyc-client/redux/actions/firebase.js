import * as firebase from "firebase";
import firestore from "firebase/firestore";

//const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
  apiKey: "AIzaSyDqdLVlR7rK5bHaH3M2VtywNh810gvJ5-w",
  authDomain: "kolowalletmoney.firebaseapp.com",
  databaseURL: "https://kolowalletmoney.firebaseio.com",
  projectId: "kolowalletmoney",
  storageBucket: "kolowalletmoney.appspot.com",
  messagingSenderId: "573369497474",
  appId: "1:573369497474:web:f62172fd811b9c37",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.firestore().settings(settings);

export default firebase;
export const storage = firebase.storage();
export const auth = firebase.auth();
export const db = firebase.firestore();
