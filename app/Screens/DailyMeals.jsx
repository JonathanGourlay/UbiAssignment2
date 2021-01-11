import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { SafeAreaView } from "react-native";
import { mealTypePriority } from "../Utils/constants";
import { ScrollView } from "react-native";
import { MealModal } from '../Components/MealModal';
import themeOptions from '../Objects/ThemesObjects';

import { DailyMealcard } from "../Components/MealCard";

export const DailyMeals = () => {
    const [state, setState] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState();
    // const [] = React.useState(false);
    const [] = React.useState();
    // const [] = React.useState();

    var dayNum = new Date();
    dayNum = dayNum.getDay();
    var totalDayPlanCal = 0.00;
    var totalDayPlanFat = 0.00;
    var totalDayPlanPro = 0.00;
    var totalDayPlanCarbs = 0.00;
    var totalDayPlanSugar = 0.00;
    var totalDayPlanWater = 0.00;
    var totalDayPlanFiber = 0.00;
    var totalDayPlanChol = 0.00;

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("/mealPlans/")
            .orderBy("created", "desc")
            .limit(1)
            .get()
            .then((res) => {
                // have to loop through
                // object is collection, howerver limit is 1, 
                // so setState only called once

                res.forEach((mealPlan) => {
                    const day = mealPlan.get("mealPlan." + dayNum)
                    let sortedMeals = Object.keys(day.meals).sort((a, b) => {
                        return mealTypePriority[a] - mealTypePriority[b];
                    }).map((key) => {
                        return day.meals[key]
                    })
                    setState(sortedMeals);
                });
            })
            .catch((err) => console.log(err))

    }, []);


    if (state === undefined) { return null; }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                alignSelf: "auto",
                marginTop: 60,
            }}
        >
            <ScrollView>
                {state.map((mealType, index) => {
                    totalDayPlanCal += mealType.meal.Calories / mealType.meal.Serves
                    totalDayPlanFat += mealType.meal.TotalNutrients.TotalFat.Quantity / mealType.meal.Serves
                    totalDayPlanPro += mealType.meal.TotalNutrients.TotalProtein.Quantity / mealType.meal.Serves
                    totalDayPlanCarbs += mealType.meal.TotalNutrients.TotalCarbs.Quantity / mealType.meal.Serves
                    totalDayPlanSugar += mealType.meal.TotalNutrients.TotalSugar.Quantity / mealType.meal.Serves
                    totalDayPlanWater += mealType.meal.TotalNutrients.TotalWater.Quantity / mealType.meal.Serves
                    totalDayPlanFiber += mealType.meal.TotalNutrients.TotalFiber.Quantity / mealType.meal.Serves
                    totalDayPlanChol += mealType.meal.TotalNutrients.TotalCholesterol.Quantity / mealType.meal.Serves

                    return (
                        <SafeAreaView key={index} style={styles.container}>
                            <DailyMealcard
                                mealObject={mealType}
                                setModalVisible={setModalVisible}
                                setSelectedMeal={setSelectedMeal}
                            />
                        </SafeAreaView>
                    );
                })}
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {totalDayPlanCal.toFixed(2) + " - Total Day's Calories / 2000 kcal"}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanFat.toFixed(2) + " - Total Day's Fats / 70g"}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanCarbs.toFixed(2) + " - Total Day's Carbs / 300g "}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanSugar.toFixed(2) + " - Total Day's Sugars / 50g"}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanChol.toFixed(2) + " - Total Day's Cholesterol / 300mg"}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanFiber.toFixed(2) + " - Total Day's Fiber / 38g"}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanPro.toFixed(2) + " - Total Day's Protein / 50g"}
                    </Text>
                    <Text style={styles.title}>
                        {totalDayPlanWater.toFixed(2) + "g - Total Day's Water"}
                    </Text>
                </View>
                <MealModal
                    selectedMeal={selectedMeal}
                    visible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    dark_label: {
        color: themeOptions.dark_theme.text,
        margin: 20,
        padding: 15,
        backgroundColor: themeOptions.dark_theme.primary_colour,
        borderRadius: 6,
        alignSelf: 'center',

    },
    light_label: {
        color: themeOptions.light_theme.text,
        margin: 20,
        padding: 15,
        backgroundColor: themeOptions.light_theme.primary_colour,
        borderRadius: 6,
        alignSelf: 'center',

    },
    container: {
        backgroundColor: "#737373",
        flex: 0.3,
        marginTop: 10,
        width: Dimensions.get("window").width - 10,
        borderRadius: 5,
    },
    item: {
        backgroundColor: "#737373",
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    large_title: {
        fontSize: 25,
        textAlign: "center",
    },
    title: {
        fontSize: 16,
        textAlign: "center",
    },
    small_container: {
        backgroundColor: "#737373",
        flex: 1,
        marginTop: 5,
        width: Dimensions.get("window").width - 10,
        padding: 15,
        borderRadius: 5,
    },
    small_item: {
        backgroundColor: "#737373",
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    small_title: {
        fontSize: 12,
        textAlign: "center",
    },
    smaller_title: {
        fontSize: 10,
        textAlign: "center",
    },
    logo: {
        position: 'relative',
        marginTop: 0,
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 6
    },
});
