import React, { useState } from "react";
import { createContainer } from "unstated-next";
import { GetUserIdToken } from "../Utils/Firebase";

function useThemeSwitch() {
  let [theme, setTheme] = React.useState("dark");
  const switchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  return { theme, switchTheme };
}

function useMealType() {
  const [searchMealType, setSearchMealType] = React.useState("Dinner");

  const changeMeal = (newMeal) => {
    setSearchMealType(newMeal);
  };

  return { searchMealType, setSearchMealType, changeMeal };
}

function useSearchObject() {
  const [searchObject, setSearchObject] = React.useState();
  const changeSearch = (newSearch) => {
    setSearchMealType(newSearch);
  };

  return { searchObject, setSearchObject, changeSearch };
}

function useFirestoreArray() {
  let [mealArray, setMealArray] = React.useState();
  return { mealArray, setMealArray };
}
function useColourSwitch() {
  const [pickedColour, setColour] = useState({
    high: "rgb(255, 25, 25)",
    medium: "rgb(255, 147, 25)",
    low: "rgb(113, 255, 25)",
  });

  // Set the colour depedning on the congestion type
  const switchColour = (chosenColour, congestionType) => {
    if (congestionType === "High") {
      setColour({ ...pickedColour, high: chosenColour });
    }
    if (congestionType === "Med") {
      setColour({ ...pickedColour, medium: chosenColour });
    }
    if (congestionType === "Low") {
      setColour({ ...pickedColour, low: chosenColour });
    }
  };

  return { pickedColour, switchColour };
}
function AuthedState() {
  const [token, setToken] = React.useState();

  const tryGetToken = () => {
    GetUserIdToken()
      .then((res) => setToken(res))
      .catch((err) => {
        console.log({ err });
      });
  };

  React.useEffect(() => {
    tryGetToken();
  }); // run each time, as passed no deps

  return {
    token,
    setToken,
    tryGetToken,
  };
}

const ThemeSwitch = createContainer(useThemeSwitch);
const ColourSwitch = createContainer(useColourSwitch);
const MealArray = createContainer(useFirestoreArray);
const MealType = createContainer(useMealType);
const SearchObject = createContainer(useSearchObject);
const IsAuthed = createContainer(AuthedState);

export {
  ThemeSwitch,
  ColourSwitch,
  MealArray,
  MealType,
  SearchObject,
  IsAuthed,
};
