import React from "react";
import { Text, View, Modal, StyleSheet, Image, Animated, Linking } from "react-native";
import { ThemeSwitch } from '../Scripts/GlobalState';
import themeOptions from '../Objects/ThemesObjects';
import { ScrollView } from "react-native";
import { IngredientsModal } from "./IngredientsModal";
import { NutritionModal } from "./NutritionModal";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

export const MealModal = ({ selectedMeal, visible, setModalVisible }) => {
    // Don't render if the meal is still undefined
    if (selectedMeal === undefined) {
        return null;
    }
    let themeSwitch = ThemeSwitch.useContainer();
    const [imageLoading, setImageLoading] = React.useState();
    return (
        <Modal visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={{
                margin: 10,
                marginHorizontal: 20,
                backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background,
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                flex: 0.9,
                // marginTop: 100,

            }}>
                <ScrollView>
                    <View >
                        <View style={styles.container} >
                            <Text style={{
                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center', textAlign: 'center',
                                fontSize: 25,
                                fontWeight: 'bold',
                            }}>
                                {selectedMeal.meal.Name}
                            </Text>
                            <Text style={imageLoading === false && { display: "none" }}>Loading...</Text>
                            <Image
                                style={[styles.logo, imageLoading && { display: "none" }]}
                                source={{ uri: selectedMeal.meal.ImageString }}
                                onLoadStart={() => {
                                    setImageLoading(true)
                                }}
                                onLoadEnd={() => {
                                    setImageLoading(false)
                                }}
                            />
                            <Text style={{
                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center', textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>
                                Serves: {selectedMeal.meal.Serves}
                            </Text>
                            <Text style={{
                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center', textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>
                                Source: {selectedMeal.meal.Source}
                            </Text>
                            <Text style={{
                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center', textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>Calories - {selectedMeal.meal.Calories.toFixed(2)} </Text>
                            <View style={{ flex: 1, flexDirection: "column" }}>
                                <View style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderColor: 'grey', borderWidth: 1, marginBottom: 20 }}>
                                    <CollapsibleView title="Ingredients" arrowStyling={{ size: 32, rounded: true, thickness: 8, color: "purple" }} style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderWidth: 0 }}>
                                        {JSON.parse(selectedMeal.meal.Ingredients).map((ingSet, index) => {
                                            return (
                                                <View key={index}>
                                                    <View>
                                                        <Text style={{
                                                            color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'flex-start',
                                                            fontSize: 18,
                                                        }}
                                                            key={index}>
                                                            {ingSet.text}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Image
                                                            style={[styles.logo, imageLoading && { display: "none" }]}
                                                            source={{ uri: ingSet.image }}
                                                        />
                                                    </View>
                                                </View>
                                            )

                                        })}



                                    </CollapsibleView>

                                </View>
                                <View style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderColor: 'grey', borderWidth: 1, marginBottom: 20 }}>
                                    <ScrollView>
                                        <CollapsibleView title="Nutrients" arrowStyling={{ size: 32, rounded: true, thickness: 8, color: "purple" }} style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderWidth: 0 }}>


                                            {Object.keys(selectedMeal.meal.TotalNutrients).map((nutType, index) => {
                                                return (
                                                    <View key={index}>
                                                        <View>
                                                            <Text style={{
                                                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'flex-start',
                                                                fontSize: 18,
                                                            }}
                                                                key={index}>
                                                                {selectedMeal.meal.TotalNutrients[nutType].Label + " : " + selectedMeal.meal.TotalNutrients[nutType].Quantity.toFixed(2) + " " + selectedMeal.meal.TotalNutrients[nutType].Unit}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                        </View>
                                                    </View>
                                                )

                                            })}



                                        </CollapsibleView>
                                    </ScrollView>
                                </View>
                                <View style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderColor: 'grey', borderWidth: 1, marginBottom: 20 }}>
                                    <ScrollView>
                                        <CollapsibleView title="Diet Labels" arrowStyling={{ size: 32, rounded: true, thickness: 8, color: "purple" }} style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderWidth: 0 }}>
                                            {((selectedMeal.meal.DietLabels).replace(/\\/g, "")).replace(/[\[\]'"]+/g, "").split(",").map((dietLabel, index) => {
                                                return (
                                                    <View key={index}>
                                                        <View>
                                                            <Text style={{
                                                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'flex-start',
                                                                fontSize: 18,
                                                            }}
                                                                key={index}>
                                                                {dietLabel}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            )
                                            }



                                        </CollapsibleView>
                                    </ScrollView>
                                </View>
                                <View style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderColor: 'grey', borderWidth: 1, marginBottom: 20 }}>
                                    <ScrollView>
                                        <CollapsibleView title="Health Labels" arrowStyling={{ size: 32, rounded: true, thickness: 8, color: "purple" }} style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label, { borderRadius: 6, borderWidth: 0 }}>
                                            {((selectedMeal.meal.HealthLabels).replace(/\\/g, "")).replace(/[\[\]'"]+/g, "").split(",").map((healthLabel, index) => {
                                                return (
                                                    <View key={index}>
                                                        <View>
                                                            <Text style={{
                                                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'flex-start',
                                                                fontSize: 18,
                                                            }}
                                                                key={index}>
                                                                {healthLabel}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            )
                                            }



                                        </CollapsibleView>
                                    </ScrollView>
                                </View>



                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                    >Back to Meals</Text>
                                    <Text style={visible = selectedMeal.meal.Url ? false : true, themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
                                        onPress={() => { Linking.openURL(selectedMeal.meal.Url) }}
                                    >
                                        To Recipie
                            </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal >
    );
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
    title: {
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subtitle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center'
    },
})