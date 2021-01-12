import React from "react";
import { Text, View, Modal, StyleSheet, Image } from "react-native";
import { ThemeSwitch } from "../Scripts/GlobalState";
import themeOptions from "../Objects/ThemesObjects";
import firebase from "firebase";
import { Picker } from "@react-native-picker/picker";
import { mealTypePriority } from "../Utils/constants";

export const EditPlanModal = ({
    selectedDayPlan,
    setSelectedDayPlan,
    visible,
    setModalVisible,
}) => {
    const [mealState, setMealsState] = React.useState([]);
    const [selectedMeals, setSelectedMeals] = React.useState();
    let themeSwitch = ThemeSwitch.useContainer();

    React.useEffect(() => {
        let mealArray = [];
        firebase
            .firestore()
            .collection("/meals/")
            .get()
            .then((res) => {
                res.forEach((meal) => {
                    mealArray.push(meal.data());
                });
                setMealsState(mealArray);
            });
    }, []);

    React.useEffect(() => {
        if (selectedDayPlan !== undefined) {
            setSelectedMeals({
                breakfast: selectedDayPlan.meals.breakfast,
                lunch: selectedDayPlan.meals.lunch,
                dinner: selectedDayPlan.meals.dinner,
            })
        }
    }, [selectedDayPlan])

    // Don't render if the meal is still undefined
    if (selectedDayPlan === undefined || selectedMeals === undefined) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View
                style={{
                    margin: 10,
                    marginHorizontal: 20,
                    backgroundColor:
                        themeSwitch.theme === "dark"
                            ? themeOptions.light_theme.background
                            : themeOptions.dark_theme.background,
                    borderRadius: 20,
                    padding: 35,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flex: 0.9,
                }}
            >
                {Object.keys(selectedDayPlan.meals).sort((a, b) => {
                    return mealTypePriority[a] - mealTypePriority[b];
                }).map((mealTypeKey, index) => {

                    return (
                        <View key={index} style={styles.container}>
                            <Text>
                                {/* {selectedMeals[mealType].mealTime} -{" "} */}
                                {selectedDayPlan.meals[mealTypeKey].meal.Name} -  {selectedDayPlan.meals[mealTypeKey].mealTime}

                            </Text>
                            <Picker
                                mode={"dialog"}
                                style={{ height: 50, width: 200, alignSelf: "center" }}
                                selectedValue={`${selectedMeals[mealTypeKey].meal.Name}${selectedMeals[mealTypeKey].meal.Url}`} // Combine name and url to create a unique string
                                onValueChange={(itemValue) => {
                                    let selectedMeal = mealState.find((mealType) => {
                                        return `${mealType.meal.Name}${mealType.meal.Url}` === itemValue
                                    })

                                    if (selectedMeal !== undefined) {
                                        selectedMeal.mealTime = selectedMeals[mealTypeKey].mealTime

                                        setSelectedDayPlan({
                                            ...selectedDayPlan, meals: {
                                                ...selectedMeals,
                                                [mealTypeKey]: selectedMeal
                                            }
                                        })
                                    }
                                }}
                            >
                                {/* <Picker.Item key={index} label={selectedDayPlan[mealType].meal.Name} value={mealType.meal} /> */}
                                {mealState.map((mealType, index) => {
                                    return (
                                        <Picker.Item
                                            key={index}
                                            label={mealType.meal.Name}
                                            value={`${mealType.meal.Name}${mealType.meal.Url}`}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                    );
                })}
            </View>
        </Modal >
    );
};
const styles = StyleSheet.create({
    dark_label: {
        color: themeOptions.dark_theme.text,
        margin: 20,
        padding: 15,
        backgroundColor: themeOptions.dark_theme.primary_colour,
        borderRadius: 6,
        alignSelf: "center",
    },
    light_label: {
        color: themeOptions.light_theme.text,
        margin: 20,
        padding: 15,
        backgroundColor: themeOptions.light_theme.primary_colour,
        borderRadius: 6,
        alignSelf: "center",
    },
    title: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    subtitle: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: "center",
    },
});
