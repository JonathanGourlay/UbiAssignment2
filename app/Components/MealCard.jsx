import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

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
                            {Object.keys(props.mealObject[dayPlan].meals).map((mealType, index) => {
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
    container: {
        backgroundColor: '#737373',
        flex: 0.3,
        marginTop: 10,
        width: Dimensions.get('window').width - 10,
        borderRadius: 5
    },
    item: {
        backgroundColor: '#737373',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 16,
        textAlign: "center",
    },
    small_container: {
        backgroundColor: '#737373',
        flex: 1,
        marginTop: 5,
        width: Dimensions.get('window').width - 10,
        padding: 15,
        borderRadius: 5
    },
    small_item: {
        backgroundColor: '#737373',
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
});
export { SearchMealCard, MealCard, MealPlanCard };