import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    LogBox,
    Text,
    Button
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { GenerateMealPlan } from "../Components/GenerateMealPlan";
import { MealPlanCard } from "../Components/MealCard";
import { MealModal } from "../Components/MealModal";
import { EditPlanModal } from "../Components/EditPlanModal";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { SignInWithGoogle, SignOut } from "../Utils/Firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import IsAuthed from "../Scripts/GlobalState";
import { ThemeSwitch } from '../Scripts/GlobalState';
import themeOptions from '../Objects/ThemesObjects';
LogBox.ignoreLogs(["VirtualizedList:"]);

export const MealPlan = () => {
    const [mealPlanCollection, setMealPlanCollection] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedDayPlan, setSelectedDayPlan] = React.useState();
    const [mealPlanCal, setMealPlanCal] = React.useState();
    let themeSwitch = ThemeSwitch.useContainer();
    var totalMealPlanCal = 0.00;
    var totalMealPlanCal = 0.00;
    var totalMealPlanFat = 0.00;
    var totalMealPlanPro = 0.00;
    var totalMealPlanCarbs = 0.00;
    var totalMealPlanSugar = 0.00;
    var totalMealPlanWater = 0.00;
    var totalMealPlanFiber = 0.00;
    var totalMealPlanChol = 0.00;



    // if no meal plan -> button to generate meal plan
    // if meal plan is out of date generate new meal plan
    // if meal plan -> button to generate new meal plan
    React.useEffect(() => {
        let mealPlanArray = [];
        firebase
            .firestore()
            .collection("/mealPlans/")
            .orderBy("created", "desc")
            .limit(1)
            .get()
            .then((res) => {
                res.forEach((mealPlan) => {
                    mealPlanArray.push(mealPlan.data());
                });
                setMealPlanCollection(mealPlanArray);
            });
    }, []);

    React.useEffect(() => {
        if (mealPlanCollection[0] !== undefined) {
            Object.keys(mealPlanCollection[0].mealPlan).map((planKey) => {
                if (mealPlanCollection[0].mealPlan[planKey].day === selectedDayPlan.day) {
                    mealPlanCollection[0].mealPlan[planKey] = selectedDayPlan
                }
            })
        }
    }, [selectedDayPlan])

    if (mealPlanCollection[0] === undefined) {
        return (
            <View style={{ flex: 1 }}>
                <GenerateMealPlan></GenerateMealPlan>
                <Text style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}>
                    Create Plan
</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
            <ScrollView>

                <Text style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
                    onPress={() => {
                        mealPlanCollection[0].created = new Date()
                        firebase.firestore().collection('/mealPlans/').add(mealPlanCollection[0])
                    }}
                >
                    SETTT Changes
            </Text>

                {Object.keys(mealPlanCollection[0].mealPlan).map((planKey, index) => {
                    let totalDayPlanCal = 0.00
                    totalDayPlanCal = Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Calories.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0)
                    totalMealPlanCal += totalDayPlanCal
                    totalMealPlanFat += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalFat.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0)
                    totalMealPlanPro += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalProtein.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0)
                    totalMealPlanCarbs += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalCarbs.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0);
                    totalMealPlanSugar += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalSugar.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0);
                    totalMealPlanWater += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalWater.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0);
                    totalMealPlanFiber += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalFiber.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0);
                    totalMealPlanChol += Object.keys(mealPlanCollection[0].mealPlan[planKey].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.TotalNutrients.TotalCholesterol.Quantity.toFixed(2)) / parseFloat(mealPlanCollection[0].mealPlan[planKey].meals[meal].meal.Serves).toFixed(2)), 0);
                    return (
                        <View>
                            <MealPlanCard
                                key={index}
                                day={mealPlanCollection[0].mealPlan[planKey].day}
                                meals={mealPlanCollection[0].mealPlan[planKey].meals}
                                setSelectedDayPlan={setSelectedDayPlan}
                                setModalVisible={setModalVisible}
                            ></MealPlanCard>
                        </View>
                    )
                })}
                <Text style={styles.title}>
                    {totalMealPlanCal.toFixed(2) + " - Total Calories"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanSugar.toFixed(2) + " - Total Sugar"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanCarbs.toFixed(2) + " - Total Carbs"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanFat.toFixed(2) + " - Total Fats"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanChol.toFixed(2) + " - Total Cholesterol"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanFiber.toFixed(2) + " - Total Fiber"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanPro.toFixed(2) + " - Total Protein"}
                </Text>
                <Text style={styles.title}>
                    {totalMealPlanWater.toFixed(2) + " - Total Water"}
                </Text>
                <EditPlanModal
                    selectedDayPlan={selectedDayPlan}
                    setSelectedDayPlan={(value) => {
                        console.log(value)
                        setSelectedDayPlan(value)
                    }}
                    visible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
    },
    title: {
        fontSize: 24,
    },
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
});
