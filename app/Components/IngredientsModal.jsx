import React from "react";
import { Text, View, Modal, StyleSheet, Image } from "react-native";
import { ThemeSwitch } from '../Scripts/GlobalState';
import themeOptions from '../Objects/ThemesObjects';
import { ScrollView } from "react-native";

export const IngredientsModal = ({ selectedMeal, visible, setModalVisible }) => {
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
            <ScrollView>
                <View style={{
                    margin: 20,
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
                    marginTop: 100,

                }}>
                    <View style={styles.container} >
                        {/* <Text style={{
                        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        Diet Labels: {JSON.stringify(selectedMeal.meal.DietLabels)}
                    </Text> */}
                        {/* <Text style={{
                        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        Health Labels: {JSON.stringify(selectedMeal.meal.HealthLabels)}
                    </Text> */}
                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <Text style={{
                                color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center', textAlign: 'center',
                                fontSize: 22,
                                fontWeight: 'bold'
                            }}>
                                Ingredients
                        </Text>
                            {JSON.parse(selectedMeal.meal.Ingredients).map((ingSet, index) => {
                                return (
                                    <View>
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
                                                onLoadStart={() => {
                                                    setImageLoading(true)
                                                }}
                                                onLoadEnd={() => {
                                                    setImageLoading(false)
                                                }}
                                            />
                                        </View>
                                    </View>
                                )

                            })}


                            {/* <Text style={{
                        color: themeSwitch.theme === "dark" ? themeOptions.light_theme.text : themeOptions.dark_theme.text, alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        Total Nutrients: {JSON.stringify(selectedMeal.meal.TotalNutrients)}
                    </Text> */}

                            <Text style={imageLoading === false && { display: "none" }}>Loading...</Text>
                            <Text style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            >Back to Meal</Text>
                        </View>


                    </View>


                </View>
            </ScrollView>
        </Modal>

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