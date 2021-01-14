import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    LogBox,
    Text,
    Pressable,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { GenerateMealPlan } from "../Components/GenerateMealPlan";
import { MealPlanCard } from "../Components/MealCard";
import { EditPlanModal } from "../Components/EditPlanModal";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { IsAuthed } from "../Scripts/GlobalState";
import { ThemeSwitch } from "../Scripts/GlobalState";
import themeOptions from "../Objects/ThemesObjects";
import { NotificationModal } from "../Components/NotificationModal";
LogBox.ignoreLogs(["VirtualizedList:"]);

export const MealPlan = () => {
    const [mealPlanCollection, setMealPlanCollection] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [] = React.useState(false);
    const [notificationModalVisible, setNotificationModalVisible] = React.useState(false);
    const [selectedDayPlan, setSelectedDayPlan] = React.useState();
    const [notification, setNotification] = React.useState();
    const [] = React.useState(false);
    let themeSwitch = ThemeSwitch.useContainer();
    let { token, tryGetToken } = IsAuthed.useContainer();
    var totalMealPlanCal = 0.0;
    var totalMealPlanCal = 0.0;
    var totalMealPlanFat = 0.0;
    var totalMealPlanPro = 0.0;
    var totalMealPlanCarbs = 0.0;
    var totalMealPlanSugar = 0.0;
    var totalMealPlanWater = 0.0;
    var totalMealPlanFiber = 0.0;
    var totalMealPlanChol = 0.0;
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // run when token changes, searches firebase for mealplans where the uid matches logged in user's
    React.useEffect(() => {
        if (token !== undefined) {
            let mealPlanArray = [];
            (async () => {

                const result = await firebase
                    .firestore()
                    .collection("/mealPlans/")
                    .orderBy("created", "desc")
                    .where("uid", "==", token)
                    .limit(1)
                    .get();

                result.forEach((mealPlan) => {
                    mealPlanArray.push(mealPlan.data());
                })
                setMealPlanCollection(mealPlanArray);
            })();
        }
    }, [token]);
    // run when notification changes, searches firebase for mealplans where the uid matches logged in user's
    React.useEffect(() => {
        if (token !== undefined) {
            let mealPlanArray = [];
            (async () => {

                const result = await firebase
                    .firestore()
                    .collection("/mealPlans/")
                    .orderBy("created", "desc")
                    .where("uid", "==", token)
                    .limit(1)
                    .get();

                result.forEach((mealPlan) => {
                    mealPlanArray.push(mealPlan.data());
                })
                setMealPlanCollection(mealPlanArray);
            })();
        }
    }, [notification]);

    React.useEffect(() => {
        if (mealPlanCollection[0] !== undefined) {
            Object.keys(mealPlanCollection[0].mealPlan).map((planKey) => {
                if (
                    mealPlanCollection[0].mealPlan[planKey].day === selectedDayPlan?.day
                ) {
                    mealPlanCollection[0].mealPlan[planKey] = selectedDayPlan;
                }
            });
        }
    }, [selectedDayPlan]);

    if (mealPlanCollection[0] === undefined) {
        setMealPlanCollection([
            {
                mealPlan: {
                    0: {
                        day: "Sunday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                    1: {
                        day: "Monday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                    2: {
                        day: "Tuesday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                    3: {
                        day: "Wednesday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                    4: {
                        day: "Thursday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                    5: {
                        day: "Friday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                    6: {
                        day: "Saturday",
                        meals: {
                            breakfast: {},
                            lunch: {},
                            dinner: {},
                        },
                    },
                },
            },
        ]);
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background
            }}
        >
            <NotificationModal
                notification={notification}
                setModalVisible={setNotificationModalVisible}
                visible={notificationModalVisible}
                setNotification={setNotification}
            />
            <ScrollView>

                <FirebaseAuthConsumer>
                    {({ isSignedIn }) => {
                        return isSignedIn ? (
                            <View >
                                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', }}>
                                    <Pressable
                                        onPress={() => {
                                            mealPlanCollection[0].created = new Date();
                                            // add new mealplan to firestore, set notification and modal visiible to true
                                            firebase
                                                .firestore()
                                                .collection("/mealPlans/")
                                                .add({ ...mealPlanCollection[0], uid: token }).then(() => {
                                                    setNotification("Meal Plan Created")
                                                    setNotificationModalVisible(true)
                                                }).then(() => {
                                                    tryGetToken()
                                                });
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
                                                flex: 0.5,
                                                maxWidth: 180,
                                            },
                                            ,
                                        ]}
                                    >
                                        <Text>Save Changes</Text>
                                    </Pressable>
                                    <View style={{ flex: 0.5 }}>
                                        <GenerateMealPlan
                                            setMealPlanCollection={setMealPlanCollection}
                                            notification={notification}
                                            setNotification={setNotification}
                                            setNotificationModalVisible={setNotificationModalVisible}
                                        ></GenerateMealPlan>
                                    </View>
                                </View>
                                {Object.keys(mealPlanCollection[0].mealPlan).map(
                                    (planKey, index) => {
                                        totalMealPlanCal += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all calories from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.Calories.toFixed(2) // to the decimal point of 2
                                                            : 0.0 // if meal exists return value else return 0.0
                                                    ) / // divide value by number of servings
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0 // if meal exists return value else return 0.0
                                                    ).toFixed(2)// to the decimal point of 2
                                                )),
                                            0
                                        );
                                        totalMealPlanFat += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all fats from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalFat.Quantity.toFixed(2)// to the decimal point of 2
                                                            : 0.0 // if meal exists return value else return 0.00
                                                    ) / // divide value by number of servings
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0 // if meal exists return value else return 0.00
                                                    ).toFixed(2) // to the decimal point of 2
                                                )),
                                            0
                                        );
                                        totalMealPlanPro += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all protein from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalProtein.Quantity.toFixed(
                                                                2
                                                            )
                                                            : 0.0
                                                    ) /
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0
                                                    ).toFixed(2)
                                                )),
                                            0
                                        );
                                        totalMealPlanCarbs += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all carbs from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalCarbs.Quantity.toFixed(
                                                                2
                                                            )
                                                            : 0.0
                                                    ) /
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0
                                                    ).toFixed(2)
                                                )),
                                            0
                                        );
                                        totalMealPlanSugar += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all sugar from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalSugar.Quantity.toFixed(
                                                                2
                                                            )
                                                            : 0.0
                                                    ) /
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0
                                                    ).toFixed(2)
                                                )),
                                            0
                                        );
                                        totalMealPlanWater += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all calories from the water mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalWater.Quantity.toFixed(
                                                                2
                                                            )
                                                            : 0.0
                                                    ) /
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0
                                                    ).toFixed(2)
                                                )),
                                            0
                                        );
                                        totalMealPlanFiber += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all fiber from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalFiber.Quantity.toFixed(
                                                                2
                                                            )
                                                            : 0.0
                                                    ) /
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0
                                                    ).toFixed(2)
                                                )),
                                            0
                                        );
                                        totalMealPlanChol += Object.keys(
                                            mealPlanCollection[0].mealPlan[planKey].meals
                                        ).reduce(
                                            //reduce and add all cholesterol from the current mealplan
                                            (acc, meal) =>
                                            (acc =
                                                parseFloat(acc) +
                                                parseFloat(
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals[
                                                                meal
                                                            ].meal.TotalNutrients.TotalCholesterol.Quantity.toFixed(
                                                                2
                                                            )
                                                            : 0.0
                                                    ) /
                                                    parseFloat(
                                                        mealPlanCollection[0].mealPlan[planKey].meals[
                                                            meal
                                                        ].meal
                                                            ? mealPlanCollection[0].mealPlan[planKey]
                                                                .meals[meal].meal.Serves
                                                            : 0.0
                                                    ).toFixed(2)
                                                )),
                                            0
                                        );
                                        return (
                                            <View key={index / 0.4}>
                                                <MealPlanCard
                                                    key={index}
                                                    day={
                                                        mealPlanCollection[0].mealPlan[planKey]
                                                            ? mealPlanCollection[0].mealPlan[planKey].day
                                                            : days[new Date()]
                                                    }
                                                    meals={
                                                        mealPlanCollection[0].mealPlan[planKey]
                                                            ? mealPlanCollection[0].mealPlan[planKey].meals
                                                            : { breakfast: {}, lunch: {}, dinner: {} }
                                                    }
                                                    setSelectedDayPlan={setSelectedDayPlan}
                                                    setModalVisible={setModalVisible}
                                                ></MealPlanCard>
                                            </View>
                                        );
                                    }
                                )}


                                <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container}>
                                    <Text style={styles.title}>
                                        {"Calories: " + totalMealPlanCal.toFixed(2) + " / 2000 kcal"}
                                    </Text>
                                    <Text style={styles.title}>
                                        {"Fats: " + totalMealPlanFat.toFixed(2) + " / 70g"}
                                    </Text>
                                    <Text style={styles.title}>
                                        {"Carbs: " + totalMealPlanCarbs.toFixed(2) + " / 300g "}
                                    </Text>
                                    <Text style={styles.title}>
                                        {"Sugars: " + totalMealPlanSugar.toFixed(2) + " / 50g"}
                                    </Text>
                                    <Text style={styles.title}>
                                        {"Cholesterol: " + totalMealPlanChol.toFixed(2) + " / 300mg"}
                                    </Text>
                                    <Text style={styles.title}>
                                        {"Fiber: " + totalMealPlanFiber.toFixed(2) + " / 38g"}
                                    </Text>
                                    <Text style={styles.title}>
                                        {"Protein: " + totalMealPlanPro.toFixed(2) + " / 50g"}
                                    </Text>
                                    <Text style={styles.title}>
                                        {totalMealPlanWater.toFixed(2) + "g - Total Weeks's Water"}
                                    </Text>
                                </View>
                                <EditPlanModal
                                    selectedDayPlan={selectedDayPlan}
                                    setSelectedDayPlan={(value) => {
                                        setSelectedDayPlan(value);
                                    }}
                                    visible={modalVisible}
                                    setModalVisible={setModalVisible}
                                />
                            </View>
                        ) : (
                                <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container}  >
                                    <Text
                                        style={{ textAlign: 'center' }}
                                    >Please Login to use the application</Text>
                                </View>
                            )
                    }}
                </FirebaseAuthConsumer>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 16,
        textAlign: "center",
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
