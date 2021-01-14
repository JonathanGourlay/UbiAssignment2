import React from "react";
import { Text, View, Modal, StyleSheet, TextInput } from "react-native";
import { ThemeSwitch } from "../Scripts/GlobalState";
import themeOptions from "../Objects/ThemesObjects";
import {
    CreateUserAccount,
    GetUserIdToken
} from "../Utils/Firebase";

export const CreateAccountModal = ({ visible, setAccountModalVisible }) => {
    let themeSwitch = ThemeSwitch.useContainer();
    const [accountDetails, setAccountDetails] = React.useState({
        email: "",
        password: "",
    });
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setAccountModalVisible(false);
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
                <Text style={{ height: 20, alignSelf: "center" }}>Create Account Details</Text>
                <View
                    style={{ flexDirection: "column", alignSelf: "center", padding: 20 }}
                >
                    <TextInput
                        style={{
                            height: 40,
                            width: 200,
                            padding: 10,
                            borderColor: "gray",
                            borderWidth: 1,
                            alignSelf: "center",
                            alignItems: "center",
                        }}
                        onChangeText={(text) =>
                            setAccountDetails({ ...accountDetails, email: text })
                        }
                        placeholder={"Email"}
                    />
                    <TextInput
                        keyboardType='default'
                        secureTextEntry={true}
                        style={{
                            height: 40,
                            width: 200,
                            padding: 10,
                            borderColor: "gray",
                            borderWidth: 1,
                            alignSelf: "center",
                        }}
                        onChangeText={(text) =>
                            setAccountDetails({ ...accountDetails, password: text })
                        }
                        placeholder={"Password"}

                    />
                </View>
                <Text
                    style={styles.dark_label}
                    onPress={
                        () =>
                            CreateUserAccount(
                                accountDetails.email,
                                accountDetails.password
                            ).then(() => {
                                setLoginModalVisible(false);
                            }).then(() => { GetUserIdToken() })
                    }
                >
                    Login
        </Text>
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
        width: 120,
        height: 120,
        alignSelf: "center",
    },
});
