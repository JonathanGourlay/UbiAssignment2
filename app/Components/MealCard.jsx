import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { mealTypePriority } from "../Utils/constants";
import { ThemeSwitch } from '../Scripts/GlobalState';
import themeOptions from '../Objects/ThemesObjects';
import "firebase/firestore";


const MealCard = (props) => {
    return (
        <View style={styles.container} onTouchEnd={() => {
            props.onPress();
        }}>
            <Text style={styles.title}>
                {props.mealObject.meal.Name}
            </Text>
            <Text style={styles.small_title}>
                {props.mealObject.meal.Calories.toFixed(2) + " - Calories"}
            </Text>

        </View>
    );
}

const SearchMealCard = (props) => {
    return (
        <View style={styles.container} onTouchEnd={() => {
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
    // const [modalVisible, setModalVisible] = React.useState(false)
    // const [selectedMeal, setSelectedMeal] = React.useState();
    return (
        <View >

            <View >
                <Text style={styles.large_title}>{mealObject.MealType}</Text>
                <Text style={styles.title}>
                    {mealObject.meal.Name}
                </Text>
                {Object.keys(mealObject.meal.TotalNutrients).map((nutType, index) => {
                    return (
                        <View key={index}>
                            <View>
                                <Text style={{
                                    color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
                                    ...styles.smaller_title
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
                <Text style={styles.smaller_title}>
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
const MealPlanCard = (props) => {
    var totalMealPlanCal = 0.00;
    return (
        <View style={{ flex: 0.1 }}>
            <View onTouchEnd={() => {
                props.onPress();
            }}>
                {Object.keys(props.mealObject).map((dayPlan, index) => {
                    let totalDailyCal = 0.00;
                    totalDailyCal = Object.keys(props.mealObject[dayPlan].meals).reduce((acc, meal) => acc = parseFloat(acc) + parseFloat(parseFloat(props.mealObject[dayPlan].meals[meal].meal.Calories.toFixed(2)) / parseFloat(props.mealObject[dayPlan].meals[meal].meal.Serves).toFixed(2)), 0)
                    totalMealPlanCal += totalDailyCal
                    return (
                        <View key={index} style={styles.container}>
                            <Text style={styles.title}>
                                {props.mealObject[dayPlan].day}
                            </Text>
                            {Object.keys(props.mealObject[dayPlan].meals).sort((a, b) => {
                                return mealTypePriority[a] - mealTypePriority[b];
                            }).map((mealType, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={styles.small_title}>
                                            {props.mealObject[dayPlan].meals[mealType].MealType}
                                        </Text>
                                        <Text style={styles.smaller_title}>
                                            {props.mealObject[dayPlan].meals[mealType].meal.Name}
                                        </Text>
                                        <Text style={styles.smaller_title}>
                                            {(props.mealObject[dayPlan].meals[mealType].meal.Calories / props.mealObject[dayPlan].meals[mealType].meal.Serves).toFixed(2) + " - Calories"}
                                        </Text>
                                    </View>
                                )
                            })}
                            <Text style={styles.title}>
                                {totalDailyCal.toFixed(2) + " - Total Calories"}
                            </Text>
                        </View>
                    )
                })}
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {totalMealPlanCal.toFixed(2) + " - Total Weeks Calories"}
                    </Text>
                </View>
            </View>
        </View>
    )

}
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
export { SearchMealCard, MealCard, MealPlanCard, DailyMealCard as DailyMealcard };