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

import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Pressable,
} from "react-native";
import "firebase/firestore";
import { LoginModal } from "../Components/LoginModal";
import { IsAuthed } from "../Scripts/GlobalState";
import {
    SignOut,
} from "../Utils/Firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { CreateAccountModal } from "../Components/CreateAccountModal";

const Tab = createMaterialBottomTabNavigator();

export default Navigation = () => {
    let themeSwitch = ThemeSwitch.useContainer();
    let { tryGetToken } = IsAuthed.useContainer();
    const [loginModalVisible, setLoginModalVisible] = React.useState(false);
    const [accountModalVisible, setAccountModalVisible] = React.useState(false);

    return (
        <NavigationContainer theme={themeSwitch.theme === "dark" ? themeOptions.light_theme : themeOptions.dark_theme} ref={navigationRef} >
            <StatusBar
                style={themeSwitch.theme === "dark" ? "dark" : "light"}
                hidden={false}
                backgroundColor={themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background}
                translucent={true}
            ></StatusBar>


            <FirebaseAuthConsumer>
                {({ isSignedIn }) => {
                    return isSignedIn ? (
                        <View style={{ backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background, marginTop: 40 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background }}>
                                <Pressable
                                    onPress={() => {
                                        SignOut().then(() => {
                                            tryGetToken();
                                        });
                                    }}
                                    style={({ pressed }) => [
                                        {
                                            ...(themeSwitch.theme === "dark"
                                                ? styles.light_label
                                                : styles.dark_label),
                                            backgroundColor: pressed
                                                ? "red"
                                                : themeSwitch.theme === "dark"
                                                    ? styles.light_label.backgroundColor
                                                    : styles.dark_label.backgroundColor,
                                        },
                                        ,
                                    ]}
                                >
                                    <Text>Log out</Text>
                                </Pressable>
                            </View>
                        </View>

                    ) : (
                            <View style={{ backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background, marginTop: 40 }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background }}>
                                    <Pressable
                                        onPress={() => setAccountModalVisible(true)}
                                        style={({ pressed }) => [
                                            {
                                                ...(themeSwitch.theme === "dark"
                                                    ? styles.light_label
                                                    : styles.dark_label),
                                                backgroundColor: pressed
                                                    ? "green"
                                                    : themeSwitch.theme === "dark"
                                                        ? styles.light_label.backgroundColor
                                                        : styles.dark_label.backgroundColor,
                                                margin: 10
                                            },
                                            ,
                                        ]}
                                    >
                                        <Text>Sign up</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setLoginModalVisible(true)}
                                        style={({ pressed }) => [
                                            {
                                                ...(themeSwitch.theme === "dark"
                                                    ? styles.light_label
                                                    : styles.dark_label),
                                                backgroundColor: pressed
                                                    ? "green"
                                                    : themeSwitch.theme === "dark"
                                                        ? styles.light_label.backgroundColor
                                                        : styles.dark_label.backgroundColor,
                                            },
                                            ,
                                        ]}
                                    >
                                        <Text>Log in</Text>
                                    </Pressable>

                                    <LoginModal
                                        visible={loginModalVisible}
                                        setLoginModalVisible={setLoginModalVisible}
                                    />
                                    <CreateAccountModal
                                        visible={accountModalVisible}
                                        setAccountModalVisible={setAccountModalVisible}
                                    />
                                </View>
                            </View>

                        );


                }
                }
            </FirebaseAuthConsumer>

            <Tab.Navigator
                initialRouteName="Home"
                activeColor={themeSwitch.theme === "dark" ? themeOptions.light_theme.primary_colour : themeOptions.dark_theme.primary_colour}
                inactiveColor={themeSwitch.theme === "dark" ? themeOptions.light_theme.secondary_colour : themeOptions.dark_theme.secondary_colour}
                shifting={true}
                style={{ backgroundColor: themeSwitch.theme === "dark" ? themeOptions.light_theme.background : themeOptions.dark_theme.background }}
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
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
    },
    title: {
        fontSize: 24,
    },
    dark_label: {
        color: themeOptions.dark_theme.text,
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: themeOptions.dark_theme.primary_colour,
        borderRadius: 6,
        alignSelf: "center",
    },
    light_label: {
        color: themeOptions.light_theme.text,
        marginBottom: 5,
        marginTop: 10,
        padding: 10,
        backgroundColor: themeOptions.light_theme.primary_colour,
        borderRadius: 6,
        alignSelf: "center",
    },
});
