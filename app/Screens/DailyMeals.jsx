import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { mealTypePriority } from "../Utils/constants";
import { ScrollView } from "react-native";
import { MealModal } from '../Components/MealModal';
import themeOptions from '../Objects/ThemesObjects';
import { ThemeSwitch } from "../Scripts/GlobalState";
import { IsAuthed } from "../Scripts/GlobalState";
import { DailyMealcard } from "../Components/MealCard";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

export const DailyMeals = () => {
    const [state, setState] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState();
    let { token } = IsAuthed.useContainer();
    let themeSwitch = ThemeSwitch.useContainer();
    const [] = React.useState();

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

    // run once on initial render
    React.useEffect(() => {
        if (token) {
            (async () => {
                const result = await firebase
                    .firestore()
                    .collection("/mealPlans/")
                    .orderBy("created", "desc")
                    .where("uid", "==", token)
                    .limit(1)
                    .get();

                result.forEach((mealPlan) => {
                    const day = mealPlan.get("mealPlan." + dayNum)
                    let sortedMeals = Object.keys(day.meals).sort((a, b) => {
                        return mealTypePriority[a] - mealTypePriority[b];
                    }).map((key) => {
                        return day.meals[key]
                    })
                    setState(sortedMeals);
                })
            })();
        }
    }, []);

    // run when token changes, searches firebase for mealplans where the uid matches logged in user's
    React.useEffect(() => {
        if (token !== undefined) {
            (async () => {

                const result = await firebase
                    .firestore()
                    .collection("/mealPlans/")
                    .orderBy("created", "desc")
                    .where("uid", "==", token)
                    .limit(1)
                    .get();

                result.forEach((mealPlan) => {
                    const day = mealPlan.get("mealPlan." + dayNum)
                    let sortedMeals = Object.keys(day.meals).sort((a, b) => {
                        return mealTypePriority[a] - mealTypePriority[b];
                    }).map((key) => {
                        return day.meals[key]
                    })
                    setState(sortedMeals);
                })
            })();
        }
    }, [token]);

    // return null so the content is not displayed
    if (state === undefined) { return null; }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                alignSelf: "auto",
            }}
        >
            <FirebaseAuthConsumer>
                {({ isSignedIn }) => {
                    return isSignedIn ? (
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

                                    <DailyMealcard
                                        key={index}
                                        mealObject={mealType}
                                        setModalVisible={setModalVisible}
                                        setSelectedMeal={setSelectedMeal}
                                    />
                                );
                            })}
                            <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container}>
                                <Text style={styles.title}>
                                    {"Calories: " + totalDayPlanCal.toFixed(2) + " / 2000 kcal"}
                                </Text>
                                <Text style={styles.title}>
                                    {"Fats: " + totalDayPlanFat.toFixed(2) + " / 70g"}
                                </Text>
                                <Text style={styles.title}>
                                    {"Carbs: " + totalDayPlanCarbs.toFixed(2) + " / 300g "}
                                </Text>
                                <Text style={styles.title}>
                                    {"Sugars: " + totalDayPlanSugar.toFixed(2) + " / 50g"}
                                </Text>
                                <Text style={styles.title}>
                                    {"Cholesterol: " + totalDayPlanChol.toFixed(2) + " / 300mg"}
                                </Text>
                                <Text style={styles.title}>
                                    {"Fiber: " + totalDayPlanFiber.toFixed(2) + " / 38g"}
                                </Text>
                                <Text style={styles.title}>
                                    {"Protein: " + totalDayPlanPro.toFixed(2) + " / 50g"}
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
                        </ScrollView>)

                        : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column', alignSelf: 'stretch' }} >
                                <Text
                                    style={{ textAlign: 'center' }}
                                >Please Login to use the application</Text>
                            </View>
                        )
                }}
            </FirebaseAuthConsumer>
        </View>
    );
};

const styles = StyleSheet.create({
    dark_label: {
        color: themeOptions.dark_theme.text,
        margin: 20,
        padding: 15,
        backgroundColor: themeOptions.dark_theme.secondary_colour,
        color: themeOptions.light_theme.text,
        borderRadius: 6,
        alignSelf: 'center',
        textAlign: 'center',
        flex: 0.3,
        marginTop: 10,
        width: Dimensions.get("window").width - 50,

    },
    light_label: {
        color: themeOptions.light_theme.text,
        margin: 20,
        padding: 15,
        backgroundColor: themeOptions.light_theme.secondary_colour,
        borderRadius: 6,
        alignSelf: 'center',
        textAlign: 'center',
        flex: 0.3,
        marginTop: 10,
        width: Dimensions.get("window").width - 10,

    },
    dark_container: {
        backgroundColor: themeOptions.dark_theme.primary_colour,
        flex: 0.3,
        marginTop: 10,
        width: Dimensions.get("window").width - 10,
        borderRadius: 5,
        padding: 20,

    },
    light_container: {
        backgroundColor: themeOptions.light_theme.primary_colour,
        flex: 0.3,
        marginTop: 10,
        width: Dimensions.get("window").width - 10,
        borderRadius: 5,
        padding: 20,

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
