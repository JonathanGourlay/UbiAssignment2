import React from 'react';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View, SectionList, Text, Button, TextInput } from "react-native";
import { useBackHandler } from '@react-native-community/hooks'
import { FirestoreProvider, FirestoreMutation, FirestoreDocument } from "@react-firebase/firestore";
import firebase from "firebase/app";
import { firebaseConfig } from "../Utils/Firebase";
import {
  useTheme,
} from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { SearchMealCard } from '../Components/MealCard';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { MealType } from '../Scripts/GlobalState';
import { RefreshControl } from 'react-native';

const SearchView = () => {
  let mealType = MealType.useContainer();
  let themeType = useTheme();
  const [searchedText, setSearchedText] = React.useState();
  const [state, setState] = React.useState([]);
  const [searchNum, setSearchNum] = React.useState(30);
  const [refreshing, setRefreshing] = React.useState(false);
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

  const RunSearch = (searchParam) => {
    if (searchParam !== "" && searchParam !== undefined) {
      fetch(
        "https://edamam-recipe-search.p.rapidapi.com/search?q=" + searchParam + "&to=" + searchNum,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "556a386896mshfd4d7315b36e51fp123a6djsn8e1e733f188d",
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
  const submitMeal = (mealObject, MealType) => {
    firebase.firestore().collection("/meals").add({
      ...mealObject,
      MealType
    }).then(() => {

    })
  }

  return (
    <SafeAreaView style={searchedText !== "" && { flex: 1 }}>
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
      <Text style={{ height: 40, alignSelf: 'center' }}>Number of recipies to search</Text>
      <Text style={{ height: 40, alignSelf: 'center' }}>{searchNum}</Text>
      <Slider
        style={{ width: 400, height: 40 }}
        minimumValue={0}
        maximumValue={50}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={25}
        step={5}
        onSlidingComplete={(num) => { setSearchNum(num) }}
      />
      <Text style={{ height: 40, alignSelf: 'center' }}>{mealType.searchMealType}</Text>
      <Picker
        selectedValue={mealType.searchMealType}
        mode={'dropdown'}
        style={{ height: 50, width: 400, alignContent: 'center' }}
        onValueChange={(itemValue, itemIndex) => {
          mealType.changeMeal(itemValue)
        }
        }>
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Breakfast" value="Breakfast" />
      </Picker>

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
                        Mealtypes = mealRef.current)
                    }}
                  ></SearchMealCard>
                  {/* <FirestoreMutation path={"/meals"} type="add">
                    {({ runMutation }) => (
                      <SearchMealCard
                        mealObject={mealObject}
                        key={index}
                        onPress={() => {
                          runMutation({
                            ...mealObject,
                            MealType: mealRef.current
                          }).then(res => {
                            onSearch(searchedText)
                          });
                        }}
                      ></SearchMealCard>
                    )}
                  </FirestoreMutation> */}
                </View>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView >
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
});

export default SearchView;