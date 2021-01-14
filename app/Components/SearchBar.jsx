import React from 'react';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View, Text, TextInput } from "react-native";
import { useBackHandler } from '@react-native-community/hooks'
import firebase from "firebase/app";
import {
  useTheme,
} from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { SearchMealCard } from '../Components/MealCard';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { MealType } from '../Scripts/GlobalState';
import themeOptions from "../Objects/ThemesObjects";
import { ThemeSwitch } from '../Scripts/GlobalState';

const SearchView = () => {
  let themeSwitch = ThemeSwitch.useContainer()
  let mealType = MealType.useContainer();
  let themeType = useTheme();
  const [searchedText, setSearchedText] = React.useState();
  const [calRange, setCalRage] = React.useState({ min: 0, max: 900 })
  const [maxIng, setMaxIng] = React.useState(20)
  const [state, setState] = React.useState([]);
  const [searchNum, setSearchNum] = React.useState(30);
  const mealRef = React.useRef(mealType.searchMealType)

  useBackHandler(() => {
    if (searchedText !== "") {
      setSearchedText("");
      return true;
    }
    return false;
  })

  React.useEffect(() => {
    mealRef.current = mealType.searchMealType
  }, [mealType.searchMealType], searchedText)

  // this function implements the recipe api and sets the results to state
  const RunSearch = (searchParam) => {
    if (searchParam !== "" && searchParam !== undefined) {
      console.log("https://edamam-recipe-search.p.rapidapi.com/search?q=" + searchParam + "&to=" + searchNum + "&calories=" + calRange.min + "-" + calRange.max + "&ingr=" + maxIng)
      fetch(
        "https://edamam-recipe-search.p.rapidapi.com/search?q=" + searchParam + "&to=" + searchNum + "&calories=" + calRange.min + "-" + calRange.max + "&ingr=" + maxIng,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "fcab2884efmshcb398188cc20127p177c84jsn077d9db8e6c4",
            "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
          },
        })
        .then((response) => response.json())
        .then((json) => { setState(json.hits); })
        .catch((error) => console.error(error))
    }
  }

  const onSearch = (text) => {
    setSearchedText(text);
  }
  const onSubmit = (text) => {
    RunSearch(text);
  }

  // this function semd the meal to firebase
  const submitMeal = (mealObject, mealTime) => {
    firebase.firestore().collection("/meals").add({
      ...mealObject,
      mealTime
    }).then(() => {

    })
  }

  return (
    <View style={searchedText !== "" && { flex: 1 }} >
      <SearchBar
        containerStyle={{
          backgroundColor: themeType.colors.background,
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          width: Dimensions.get('window').width
        }}
        placeholder="Type Here..."
        onChangeText={onSearch}
        onSubmitEditing={() => { onSubmit(searchedText) }}
        value={searchedText}
        lightTheme={themeType.dark}
        round
      />
      <Text style={{
        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
        ...styles.smaller_title, textAlign: 'center', height: 20, alignSelf: 'center'
      }}>Number of recipes to search{" - " + searchNum}</Text>
      <Slider
        style={{ width: 400, height: 40 }}
        minimumValue={5}
        maximumValue={50}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={25}
        step={5}
        onSlidingComplete={(num) => { setSearchNum(num) }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

        <View style={{ flexDirection: 'column' }}>

          <Text style={{
            color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
            ...styles.smaller_title, textAlign: 'center', height: 20, alignSelf: 'center'
          }}>Range of calories to filter by</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

            <TextInput
              keyboardType='number-pad'
              style={{ height: 40, width: 50, padding: 10, borderColor: 'gray', borderWidth: 1, alignSelf: 'center', color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text }}
              onChangeText={text => setCalRage({ min: text, max: calRange.max })}
              placeholderTextColor='red'
              selectionColor='red'
              placeholder={"Min"}
            />
            <TextInput
              keyboardType='number-pad'
              style={{ height: 40, width: 50, padding: 10, borderColor: 'gray', borderWidth: 1, alignSelf: 'center', color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text }}
              onChangeText={text => setCalRage({ min: calRange.min, max: text })}
              placeholder={"Max"}
              placeholderTextColor='red'
              selectionColor='red'
            />
          </View>
        </View>
        <View style={{
          color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
          ...styles.smaller_title, textAlign: 'center', alignSelf: 'center'
        }}>
          <Text style={{ height: 20, alignSelf: 'center' }}>Max ingredients</Text>
          <TextInput
            keyboardType='number-pad'
            style={{ height: 40, width: 50, padding: 10, borderColor: 'gray', borderWidth: 1, alignSelf: 'center', color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text }}
            onChangeText={text => setMaxIng(text)}
            placeholderTextColor='red'
            selectionColor='red'
            placeholder={"#Ings"}
          />
        </View>
      </View>
      <View style={{ borderRadius: 20 }}>
        <Text style={{
          color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text,
          textAlign: 'center', height: 20, marginTop: 10
        }}>Meal Type</Text>
        <Picker
          selectedValue={mealType.searchMealType}
          mode={'dialog'}
          style={{ height: 50, width: Dimensions.get('screen').width - 30, alignSelf: 'flex-start', color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text }}
          onValueChange={(itemValue) => {
            mealType.changeMeal(itemValue)
          }
          }>
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Breakfast" value="Breakfast" />
        </Picker>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          style={styles.container}
          horizontal={false}
          data={state}
          renderItem={({ item, index }) => {
            const mealObject = {
              meal: {
                Name: item.recipe.label,
                ImageString: item.recipe.image,
                Source: item.recipe.source,
                IngredientLines: JSON.stringify(item.recipe.ingredientLines),
                Ingredients: JSON.stringify(item.recipe.ingredients),
                HealthLabels: JSON.stringify(item.recipe.healthLabels),
                DietLabels: JSON.stringify(item.recipe.dietLabels),
                Url: item.recipe.url,
                Calories: item.recipe.calories,
                TotalTime: item.recipe.totalTime,
                Serves: item.recipe.yield,
                TotalNutrients: {
                  TotalEnergy: {
                    Label: item.recipe.totalNutrients.ENERC_KCAL.label,
                    Quantity: item.recipe.totalNutrients.ENERC_KCAL.quantity,
                    Unit: item.recipe.totalNutrients.ENERC_KCAL.unit,
                  },
                  TotalFat: {
                    Label: item.recipe.totalNutrients.FAT.label,
                    Quantity: item.recipe.totalNutrients.FAT.quantity,
                    Unit: item.recipe.totalNutrients.FAT.unit,
                  },
                  TotalSugar: {
                    Label: item.recipe.totalNutrients.SUGAR.label,
                    Quantity: item.recipe.totalNutrients.SUGAR.quantity,
                    Unit: item.recipe.totalNutrients.SUGAR.unit,
                  },
                  TotalCarbs: {
                    Label: item.recipe.totalNutrients.CHOCDF.label,
                    Quantity: item.recipe.totalNutrients.CHOCDF.quantity,
                    Unit: item.recipe.totalNutrients.CHOCDF.unit,
                  },
                  TotalFiber: {
                    Label: item.recipe.totalNutrients.FIBTG.label,
                    Quantity: item.recipe.totalNutrients.FIBTG.quantity,
                    Unit: item.recipe.totalNutrients.FIBTG.unit,
                  },
                  TotalProtein: {
                    Label: item.recipe.totalNutrients.PROCNT.label,
                    Quantity: item.recipe.totalNutrients.PROCNT.quantity,
                    Unit: item.recipe.totalNutrients.PROCNT.unit,
                  },
                  TotalCholesterol: {
                    Label: item.recipe.totalNutrients.CHOLE.label,
                    Quantity: item.recipe.totalNutrients.CHOLE.quantity,
                    Unit: item.recipe.totalNutrients.CHOLE.unit,
                  },
                  TotalWater: {
                    Label: item.recipe.totalNutrients.WATER.label,
                    Quantity: item.recipe.totalNutrients.WATER.quantity,
                    Unit: item.recipe.totalNutrients.WATER.unit,
                  },
                }
              },

            }
            return (
              <View key={index}>
                <View>
                  <SearchMealCard
                    mealObject={mealObject}
                    key={index}
                    onPress={() => {
                      submitMeal(mealObject,
                        mealTime = mealRef.current)
                    }}
                  ></SearchMealCard>
                </View>
              </View>
            )
          }}
        />
      </View>
    </View >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarLight: {
    backgroundColor: 'red'
  },
  searchBarDark: {
    backgroundColor: 'green'
  },
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
});

export default SearchView;