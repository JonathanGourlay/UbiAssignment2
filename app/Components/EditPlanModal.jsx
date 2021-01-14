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

  // run only on first render
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

  //run when selected day play changes
  React.useEffect(() => {
    if (selectedDayPlan !== undefined) {
      setSelectedMeals({
        breakfast: selectedDayPlan.meals.breakfast,
        lunch: selectedDayPlan.meals.lunch,
        dinner: selectedDayPlan.meals.dinner,
      });
    }
  }, [selectedDayPlan]);

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
        setSelectedMeals(selectedMeals)
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
          minHeight: 200,
        }}
      >
        {Object.keys(selectedDayPlan.meals)
          .sort((a, b) => {
            return mealTypePriority[a] - mealTypePriority[b];
          })
          .map((mealTypeKey, index) => {
            // if (selectedDayPlan.meals[mealTypeKey].meal !== undefined) {
            return (
              <View key={index} style={styles.container}>
                <Text
                  style={{
                    color:
                      themeSwitch.theme === "dark"
                        ? themeOptions.light_theme.text
                        : themeOptions.dark_theme.text,
                    alignSelf: "center",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >

                  {!selectedMeals[mealTypeKey].mealTime ? "No Meal Selected" : selectedDayPlan.meals[mealTypeKey].mealTime}
                </Text>
                <Picker
                  mode={"dialog"}
                  style={{
                    height: 50, width: 200, alignSelf: "center", color:
                      themeSwitch.theme === "dark"
                        ? themeOptions.light_theme.text
                        : themeOptions.dark_theme.text,
                    alignSelf: "center",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                  selectedValue={!selectedMeals[mealTypeKey].meal ? "Oatmeal Cookieshttps://www.realsimple.com/food-recipes/browse-all-recipes/oatmeal-cookies" : `${selectedMeals[mealTypeKey].meal.Name}${selectedMeals[mealTypeKey].meal.Url}`} // Combine name and url to create a unique string
                  onValueChange={(itemValue) => {
                    let selectedMeal = mealState.find((mealType) => {
                      return (
                        `${mealType.meal.Name}${mealType.meal.Url}` ===
                        itemValue
                      );
                    });


                    if (selectedMeal !== undefined) {
                      selectedMeal.mealTime =
                        mealTypeKey.replace(mealTypeKey.charAt(0), mealTypeKey.charAt(0).toUpperCase());

                      setSelectedDayPlan({
                        ...selectedDayPlan,
                        meals: {
                          ...selectedMeals,
                          [mealTypeKey]: selectedMeal,
                        },
                      });

                    }
                  }}
                >
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
                <Image
                  key={!selectedMeals[mealTypeKey].meal ? "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2010%2F01%2F20%2Foatmeal-cookies_300.jpg" : selectedMeals[mealTypeKey].meal.ImageString}
                  style={[styles.logo]}
                  source={{
                    uri: !selectedMeals[mealTypeKey].meal ? "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2010%2F01%2F20%2Foatmeal-cookies_300.jpg" : selectedMeals[mealTypeKey].meal.ImageString,
                  }}
                />
              </View>
            );

          })}
        <Text
          style={
            themeSwitch.theme === "dark"
              ? styles.light_label
              : styles.dark_label
          }
          onPress={() => {
            setModalVisible(false)
          }}
        >Back</Text>
      </View>
    </Modal>
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
    position: "relative",
    marginTop: 0,
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 6,
  },
});
