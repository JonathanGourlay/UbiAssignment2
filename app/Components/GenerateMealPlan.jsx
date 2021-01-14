
import React from "react";
import { StyleSheet, Dimensions, Pressable, Text } from "react-native";
import firebase from "firebase";
import { ThemeSwitch } from "../Scripts/GlobalState";
import themeOptions from "../Objects/ThemesObjects";
import { IsAuthed } from "../Scripts/GlobalState";
import "firebase/firestore";
import "firebase/auth"

export const GenerateMealPlan = ({ setMealPlanCollection, setNotification, setNotificationModalVisible, notification }
) => {
    let { token, setToken, tryGetToken } = IsAuthed.useContainer();
    let mealBreakfastArray = [];
    let mealLunchArray = [];
    let mealDinnerArray = [];
    let dinners;
    let breakfasts;
    let lunches;
    let themeSwitch = ThemeSwitch.useContainer();
    const [mealPlan, setMealPlan] = React.useState();

    // run only on first render
    React.useEffect(() => {
        search()
    }, [])

    // run every time notification changes
    React.useEffect(() => {
        search()
    }, [notification])

    // this function searches firestore for meals, randomises the order reduces to 7 of each and generates a meal plan using said meals
    async function search() {
        const breakfastResult = await firebase
            .firestore()
            .collection("/meals/")
            .where("mealTime", "==", "Breakfast")
            .get();
        breakfastResult.forEach((meal) => mealBreakfastArray.push(meal.data()));
        const lunchResult = await firebase
            .firestore()
            .collection("/meals/")
            .where("mealTime", "==", "Lunch")
            .get();
        lunchResult.forEach((meal) => mealLunchArray.push(meal.data()));

        const dinnerResult = await firebase
            .firestore()
            .collection("/meals/")
            .where("mealTime", "==", "Dinner")
            .get();
        dinnerResult.forEach((meal) => mealDinnerArray.push(meal.data()));
        //------------------------------------------ Sort and reduce functionality below
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]
        breakfasts = await mealBreakfastArray.sort(() => Math.random() - 0.5).slice(0, 7)
        lunches = await mealLunchArray.sort(() => Math.random() - 0.5).slice(0, 7)
        dinners = await mealDinnerArray.sort(() => Math.random() - 0.5).slice(0, 7)
        // set state to the new mealplan object
        setMealPlan(
            {
                0: {
                    day: days[0],
                    meals: {
                        breakfast: breakfasts[0],
                        lunch: lunches[0],
                        dinner: dinners[0],
                    }
                },
                1: {
                    day: days[1],
                    meals: {
                        breakfast: breakfasts[1],
                        lunch: lunches[1],
                        dinner: dinners[1],
                    }
                },
                2: {
                    day: days[2],
                    meals: {
                        breakfast: breakfasts[2],
                        lunch: lunches[2],
                        dinner: dinners[2],
                    }
                },
                3: {
                    day: days[3],
                    meals: {
                        breakfast: breakfasts[3],
                        lunch: lunches[3],
                        dinner: dinners[3],
                    }
                },
                4: {
                    day: days[4],
                    meals: {
                        breakfast: breakfasts[4],
                        lunch: lunches[4],
                        dinner: dinners[4],
                    }
                },
                5: {
                    day: days[5],
                    meals: {
                        breakfast: breakfasts[5],
                        lunch: lunches[5],
                        dinner: dinners[5],
                    }
                },
                6: {
                    day: days[6],
                    meals: {
                        breakfast: breakfasts[6],
                        lunch: lunches[6],
                        dinner: dinners[6],
                    }
                },
            },
        )

    }

    // this function submits the mealplan, created time, uid to firestore, sets the notification state and modal visibility
    const submitMealPlan = (mealPlan, created, uid) => {
        firebase.firestore().collection("/mealPlans").add({
            mealPlan,
            created,
            uid
        })
        setMealPlanCollection([{ mealPlan }])
        setNotification("Meal Plan Generated")
        setNotificationModalVisible(true)

    }
    return (
        <Pressable
            onPress={() => {
                if (mealPlan[0].meals.breakfast !== undefined) {
                    setTimeout(() => {
                        submitMealPlan(mealPlan, new Date(), token)
                    }, 1000);
                } if (mealPlan[0].meals.breakfast === undefined) {
                    search()
                    submitMealPlan(mealPlan, new Date(), token)
                }

            }}
            style={({ pressed }) => [
                {
                    ...(themeSwitch.theme === "dark"
                        ? styles.light_label
                        : styles.dark_label),
                    backgroundColor: pressed
                        ? "green"
                        : themeSwitch.theme === "dark"
                            ? styles.light_label.backgroundColor
                            : styles.dark_label.backgroundColor,
                    width: 180,
                    alignSelf: 'flex-end'
                },
                ,
            ]}
        >
            <Text>Generate Plan</Text>
        </Pressable>
    );
}
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
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: themeOptions.dark_theme.primary_colour,
        borderRadius: 6,
        alignSelf: "center",
    },
    light_label: {
        color: themeOptions.light_theme.text,
        marginBottom: 5,
        marginTop: 10,
        padding: 10,
        backgroundColor: themeOptions.light_theme.primary_colour,
        borderRadius: 6,
        alignSelf: "center",
    },
});

