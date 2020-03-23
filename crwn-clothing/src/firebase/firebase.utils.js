import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDkm2zo9OQxcXjDBxtEmS50hsllapIQM10",
  authDomain: "crwn-db-61451.firebaseapp.com",
  databaseURL: "https://crwn-db-61451.firebaseio.com",
  projectId: "crwn-db-61451",
  storageBucket: "crwn-db-61451.appspot.com",
  messagingSenderId: "1027771012597",
  appId: "1:1027771012597:web:9e756eeb5ee09922837cbc",
  measurementId: "G-BM6XPP7TRH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;