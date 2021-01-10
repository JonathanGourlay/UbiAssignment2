
import React from "react";
import firestore from '@react-native-firebase/firestore';
import { View, SectionList, StyleSheet, Text, Dimensions, Button, FlatList } from "react-native";
import { useContainer } from "unstated-next";
import RecipiesGet from "../Scripts/GetRandomRecipies";
import firebase from "firebase/app";
// import "firebase/auth";
import { firebaseConfig } from "../Utils/Firebase";
import "firebase/firestore";
import { FirestoreProvider, FirestoreMutation, FirestoreDocument } from "@react-firebase/firestore";
import { render } from "react-dom";
import { GenerateMealPlan } from "../Components/GenerateMealPlan";
import { MealPlanCard } from '../Components/MealCard';
import { MealModal } from '../Components/MealModal';
import { SafeAreaView } from "react-native";
// import mealObject from '../Objects/MealObject';



export const MealPlan = () => {
    const [state, setState] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState();

    // if no meal plan -> button to generate meal plan
    // if meal plan is out of date generate new meal plan
    // if meal plan -> button to generate new meal plan
    React.useEffect(() => {
        let mealPlanArray = [];
        firebase.firestore().collection('/mealPlans/').orderBy('created', 'desc').limit(1).get().then((res) => { res.forEach((mealPlan) => { mealPlanArray.push(mealPlan.data()) }); setState(mealPlanArray) });
    }, [])


    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GenerateMealPlan></GenerateMealPlan>
            <View style={{ flex: 0.8, flexDirection: 'column', alignSelf: 'stretch' }}>
                <FlatList
                    style={styles.container}
                    horizontal={false}
                    data={state}
                    renderItem={({ item, index }) => {
                        return (
                            <MealPlanCard
                                mealObject={item.mealPlan}
                                key={index}
                                onPress={() => {
                                }}
                            ></MealPlanCard>

                        )
                    }}
                />
            </View>
            <MealModal
                selectedMeal={selectedMeal}
                visible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    )
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
