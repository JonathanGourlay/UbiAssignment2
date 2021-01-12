
import React from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth"

export const GenerateMealPlan = () => {
    const [] = React.useState([]);
    const mealBreakfastArray = [];
    const mealLunchArray = [];
    const mealDinnerArray = [];

    React.useEffect(() => {
        firebase.firestore().collection('/meals/').where('mealTime', '==', 'Breakfast').get().then((res) => { res.forEach((meal) => { mealBreakfastArray.push(meal.data()) }) });
        firebase.firestore().collection('/meals/').where('mealTime', '==', 'Lunch').get().then((res) => { res.forEach((meal) => { mealLunchArray.push(meal.data()) }) });
        firebase.firestore().collection('/meals/').where('mealTime', '==', 'Dinner').get().then((res) => { res.forEach((meal) => { mealDinnerArray.push(meal.data()) }) });
    }, [])
    const submitMealPlan = (mealPlan, created) => {
        firebase.auth().s
        firebase.firestore().collection("/mealPlans").add({
            mealPlan,
            created
        }).then(() => {

        })
    }


    return (
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', alignSelf: 'stretch' }}>
                <View>
                    <Button
                        title={"Add"}
                        onPress={() => {
                            var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                            var breakfasts = mealBreakfastArray.sort(() => Math.random() - 0.5).slice(0, 7)
                            var lunches = mealLunchArray.sort(() => Math.random() - 0.5).slice(0, 7)
                            var dinners = mealDinnerArray.sort(() => Math.random() - 0.5).slice(0, 7)
                            var mealPlan = {
                                1: {
                                    day: days[0],
                                    meals: {
                                        breakfast: breakfasts[0],
                                        lunch: lunches[0],
                                        dinner: dinners[0],
                                    }
                                },
                                2: {
                                    day: days[1],
                                    meals: {
                                        breakfast: breakfasts[1],
                                        lunch: lunches[1],
                                        dinner: dinners[1],
                                    }
                                },
                                3: {
                                    day: days[2],
                                    meals: {
                                        breakfast: breakfasts[2],
                                        lunch: lunches[2],
                                        dinner: dinners[2],
                                    }
                                },
                                4: {
                                    day: days[3],
                                    meals: {
                                        breakfast: breakfasts[3],
                                        lunch: lunches[3],
                                        dinner: dinners[3],
                                    }
                                },
                                5: {
                                    day: days[4],
                                    meals: {
                                        breakfast: breakfasts[4],
                                        lunch: lunches[4],
                                        dinner: dinners[4],
                                    }
                                },
                                6: {
                                    day: days[5],
                                    meals: {
                                        breakfast: breakfasts[5],
                                        lunch: lunches[5],
                                        dinner: dinners[5],
                                    }
                                },
                                0: {
                                    day: days[6],
                                    meals: {
                                        breakfast: breakfasts[6],
                                        lunch: lunches[6],
                                        dinner: dinners[6],
                                    }
                                },


                            }

                            submitMealPlan(mealPlan, new Date())

                        }}
                    >
                    </Button>
                </View>
            </View>
        </View>
    );
}


