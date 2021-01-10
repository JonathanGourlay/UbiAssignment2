
import React from "react";
import firestore from '@react-native-firebase/firestore';
import { View, SectionList, StyleSheet, Text, Dimensions, Button, FlatList } from "react-native";
import { useContainer } from "unstated-next";
import RecipiesGet from "../Scripts/GetRandomRecipies";
import firebase from "firebase";
// import "firebase/auth";
import { firebaseConfig } from "../Utils/Firebase";
import "firebase/firestore";
import { FirestoreProvider, FirestoreMutation, FirestoreDocument, FirestoreCollection } from "@react-firebase/firestore";
import { render } from "react-dom";
import { MealCard } from '../Components/MealCard';
import { MealModal } from '../Components/MealModal';
import { IngredientsModal } from "../Components/IngredientsModal";
// import mealObject from '../Objects/MealObject';



export const MealRotation = () => {
    const [state, setState] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState();
    const mealArray = [];

    React.useEffect(() => {
        firebase.firestore().collection('/meals/').get().then((res) => { res.forEach((meal) => { mealArray.push(meal.data()) }); setState(mealArray) });
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ flexDirection: 'column', alignSelf: 'stretch' }}>
                <FlatList
                    style={styles.container}
                    horizontal={false}
                    data={state}
                    renderItem={({ item, index }) => {
                        return (
                            <MealCard
                                mealObject={item}
                                key={index}
                                onPress={() => {
                                    setModalVisible(true)
                                    setSelectedMeal(item)
                                }}
                            ></MealCard>

                        )
                    }}
                />
            </View>
            <MealModal
                selectedMeal={selectedMeal}
                visible={modalVisible}
                setModalVisible={setModalVisible}
            />
            {/* <IngredientsModal
                selectedMeal={selectedMeal}
                visible={modalVisible}
                setModalVisible={setModalVisible}
            /> */}
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
