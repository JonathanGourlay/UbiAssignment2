
import React from "react";
import "firebase/firestore";
import SearchbarComp from "../Components/SearchBar";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import {
    View,
    Text,
} from "react-native";

export const SearchRecipes = () => {
    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
                return isSignedIn ? (
                    <SearchbarComp></SearchbarComp>
                ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', alignSelf: 'stretch' }}>
                            <Text
                                style={{ textAlign: 'center' }}
                            >Please Login to use the application</Text>
                        </View>
                    )
            }}
        </FirebaseAuthConsumer>
    );

}


