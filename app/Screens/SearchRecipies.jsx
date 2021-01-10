
import React from "react";
import { View, StyleSheet, Text, Dimensions, TextInput } from "react-native";
import "firebase/firestore";
import SearchbarComp from "../Components/SearchBar";



export const SearchRecipes = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SearchbarComp></SearchbarComp>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        width: Dimensions.get('screen').width
    },
    title: {
        fontSize: 24
    }
});
