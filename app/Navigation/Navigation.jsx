import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import SearchBarComp from "../Components/SearchBar";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    NavigationContainer,
} from "@react-navigation/native";
import { SettingsPage, MealPlan, DailyMeals, SearchRecipes, MealRotation } from "../Screens/Index";
import { ThemeSwitch } from "../Scripts/GlobalState";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { navigationRef } from "./NavigationRef";
import themeOptions from "../Objects/ThemesObjects";

const Tab = createMaterialBottomTabNavigator();

export default Navigation = () => {
    let themeSwitch = ThemeSwitch.useContainer();

    return (
        <NavigationContainer theme={themeSwitch.theme === "dark" ? themeOptions.light_theme : themeOptions.dark_theme} ref={navigationRef} >
            <StatusBar
                style={themeSwitch.theme === "dark" ? "dark" : "light"}
                hidden={false}
                backgroundColor={themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background}
                translucent={true}
            ></StatusBar>
            {/* <SearchBarComp /> */}
            <Tab.Navigator
                initialRouteName="Home"
                activeColor={themeSwitch.theme === "dark" ? themeOptions.light_theme.primary_colour : themeOptions.dark_theme.primary_colour}
                inactiveColor={themeSwitch.theme === "dark" ? themeOptions.light_theme.secondary_colour : themeOptions.dark_theme.secondary_colour}
                shifting={true}
                barStyle={{ backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background }}
            >
                <Tab.Screen
                    name="Meal Plan"
                    component={MealPlan}
                    options={{
                        tabBarLabel: "Meal Plan",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="calendar-heart" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Today's Meals"
                    component={DailyMeals}
                    options={{
                        tabBarLabel: "Daily Meals",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="food" color={color} size={26} />
                        ),
                    }}
                />
                {/* <Tab.Screen
                    name="Nutritional Dashboard"
                    component={MealPlan}
                    options={{
                        tabBarLabel: "Dashboard",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
                        ),
                    }}
                /> */}

                <Tab.Screen
                    name="Search Recipes"
                    component={SearchRecipes}
                    options={{
                        tabBarLabel: "Search",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="database-search" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Liked Meals"
                    component={MealRotation}
                    options={{
                        tabBarLabel: "Liked Meal",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="heart-circle" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsPage}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="settings"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}