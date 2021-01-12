import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ThemeSwitch,
  ColourSwitch,
  MealArray,
  MealType,
  SearchObject,
  IsAuthed,
} from "./app/Scripts/GlobalState";
import Navigation from "./app/Navigation/Navigation";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./app/Utils/Firebase";
import "firebase/firestore";
import { FirestoreProvider } from "@react-firebase/firestore";
import { FirebaseAuthProvider } from "@react-firebase/auth";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <SafeAreaProvider>
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <IsAuthed.Provider>
          <FirestoreProvider firebase={firebase} {...firebaseConfig}>
            <ThemeSwitch.Provider>
              <ColourSwitch.Provider>
                <SearchObject.Provider>
                  <MealType.Provider>
                    <Navigation />
                  </MealType.Provider>
                </SearchObject.Provider>
              </ColourSwitch.Provider>
            </ThemeSwitch.Provider>
          </FirestoreProvider>
        </IsAuthed.Provider>
      </FirebaseAuthProvider>
    </SafeAreaProvider>
  );
}
