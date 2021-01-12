import firebase from "firebase";
import "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyB2e_5cd3McLtJV5TB1sLj3hWDdkC3Q6Qg",
  authDomain: "ubi-assignment-2-1.firebaseapp.com",
  projectId: "ubi-assignment-2-1",
  storageBucket: "ubi-assignment-2-1.appspot.com",
  messagingSenderId: "816463589408",
  appId: "1:816463589408:web:4d918fcc9e0b1cefa1cc45",
};

export const SignInWithGoogle = async () => {
  await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

export const SignOut = () => firebase.auth().signOut();

export const GetUserIdToken = async () =>
  await firebase.auth().currentUser?.getIdToken();
