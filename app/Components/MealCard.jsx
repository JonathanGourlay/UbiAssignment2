import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { mealTypePriority } from "../Utils/constants";
import { ThemeSwitch } from '../Scripts/GlobalState';
import themeOptions from '../Objects/ThemesObjects';
import "firebase/firestore";


const MealCard = (props) => {
    let themeSwitch = ThemeSwitch.useContainer()
    return (
        <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container} onTouchEnd={() => {
            props.onPress();
        }}>
            <Text style={{
                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                ...styles.large_title
            }}>
                {props.mealObject.meal.Name}
            </Text>
            <Text style={{
                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                ...styles.title
            }}>
                {props.mealObject.meal.Calories.toFixed(2) + " - Calories"}
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View>
                    {Object.keys(props.mealObject.meal.TotalNutrients).map((nutType, index) => {
                        return (
                            <View key={index}>
                                <View>
                                    <Text style={{
                                        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                                        ...styles.smaller_right_title
                                    }}
                                        key={index}>
                                        {props.mealObject.meal.TotalNutrients[nutType].Label + " : " + (props.mealObject.meal.TotalNutrients[nutType].Quantity / props.mealObject.meal.Serves).toFixed(2) + " " + props.mealObject.meal.TotalNutrients[nutType].Unit}
                                    </Text>
                                </View>
                                <View>
                                </View>
                            </View>
                        )

                    })}
                </View>
                <Image
                    key={props.mealObject.meal.Calories.toFixed(2)}
                    style={[styles.logo]}
                    source={{ uri: props.mealObject.meal.ImageString }}
                />
            </View>
            <Text key={props.mealObject.meal.Calories.toFixed(3)} style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
            >
                More Info
    </Text>
        </View>
    );
}
const SearchMealCard = (props) => {
    let themeSwitch = ThemeSwitch.useContainer();
    console.log("hit card")
    console.log(props.mealObject.meal.Name)
    return (
        <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container} onTouchEnd={() => {
            props.onPress();
        }}>
            <Text style={styles.title}>
                {props.mealObject.meal.Name}
            </Text>
            <Text style={styles.small_title}>
                {props.mealObject.meal.Calories.toFixed(2) + " - Calories"}
            </Text>
            <Text style={styles.small_title}>
                Click Me to add to liked meals
            </Text>
        </View>
    );
}
const DailyMealCard = ({ mealObject, setModalVisible, setSelectedMeal }) => {
    let themeSwitch = ThemeSwitch.useContainer();
    return (
        <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container}>

            <Text style={{
                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                ...styles.large_title
            }}>{mealObject.mealTime}</Text>
            <Text style={{
                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                ...styles.title
            }}>
                {mealObject.meal.Name}
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View>
                    {Object.keys(mealObject.meal.TotalNutrients).map((nutType, index) => {
                        return (
                            <View key={index}>
                                <View>
                                    <Text style={{
                                        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                                        ...styles.smaller_right_title
                                    }}
                                        key={index}>
                                        {mealObject.meal.TotalNutrients[nutType].Label + " : " + (mealObject.meal.TotalNutrients[nutType].Quantity / mealObject.meal.Serves).toFixed(2) + " " + mealObject.meal.TotalNutrients[nutType].Unit}
                                    </Text>
                                </View>
                                <View>
                                </View>
                            </View>
                        )

                    })}
                    <Text style={{
                        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                        ...styles.smaller_right_title
                    }}>
                        {(
                            mealObject.meal.Calories /
                            mealObject.meal.Serves
                        ).toFixed(2) + " - Calories"}
                    </Text>
                </View>

                <Image
                    key={mealObject.meal.Calories.toFixed(2)}
                    style={[styles.logo]}
                    source={{ uri: mealObject.meal.ImageString }}
                />
            </View>
            <Text key={mealObject.meal.Calories.toFixed(3)} style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
                onPress={() => {
                    setModalVisible(true)
                    setSelectedMeal(mealObject)
                }}
            >
                More Info
    </Text>

        </View>

    )
}
const MealPlanCard = ({ day, meals, setModalVisible, setSelectedDayPlan }) => {
    let themeSwitch = ThemeSwitch.useContainer();

    let totalDailyCal = 0.00;
    if (meals.breakfast !== undefined) {

        totalDailyCal = Object.keys(meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(meals[meal].meal ? meals[meal].meal.Calories.toFixed(2) : 0.00) / parseFloat(meals[meal].meal ? meals[meal].meal.Serves : 0.00).toFixed(2)), 0)
    }
    return (
        <View style={themeSwitch.theme === "dark" ? styles.light_container : styles.dark_container}>
            <Text style={styles.title}>
                {day}
            </Text>
            {Object.keys(meals).sort((a, b) => {
                return mealTypePriority[a] - mealTypePriority[b];
            }).map((mealTime, index) => {
                return (
                    <View key={index}>
                        <Text style={styles.small_title}>
                            {meals[mealTime].mealTime ? meals[mealTime].mealTime : "No meal Selected"}
                        </Text>
                        <Text style={styles.smaller_title}>
                            {meals[mealTime].mealTime ? meals[mealTime].meal.Name : "No meal Selected"}
                        </Text>
                        <Text style={styles.smaller_title}>
                            {meals[mealTime].mealTime ? (meals[mealTime].meal.Calories / meals[mealTime].meal.Serves).toFixed(2) + " - Calories" : "No meal Selected"}
                        </Text>
                    </View>
                )
            })}
            <Text style={styles.title}>
                {totalDailyCal.toFixed(2) + " - Total Calories"}
            </Text>
            <Text style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
                onPress={() => {
                    setSelectedDayPlan({ day: day, meals: meals ? meals : { breakfast, lunch, dinner } })
                    setModalVisible(true)
                }}>
                Edit Plan</Text>

        </View>
    )
}

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
        width: Dimensions.get("window").width - 50,

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
        textAlign: 'center',
        marginRight: 5
    },
    smaller_right_title: {
        fontSize: 10,
        textAlign: 'right',
        marginRight: 5
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
export { SearchMealCard, MealCard, MealPlanCard, DailyMealCard as DailyMealcard };