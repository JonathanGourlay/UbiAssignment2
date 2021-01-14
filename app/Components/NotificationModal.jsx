import React from "react";
import { Text, View, Modal, StyleSheet, Image } from "react-native";
import { ThemeSwitch } from "../Scripts/GlobalState";
import themeOptions from "../Objects/ThemesObjects";
import { ScrollView } from "react-native";

export const NotificationModal = ({
  visible,
  setModalVisible,
  notification,
  setNotification
}) => {
  let themeSwitch = ThemeSwitch.useContainer();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
        setNotification("")
      }}
    >
      <ScrollView>
        <View
          style={{
            margin: 20,
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
            marginTop: 100,
          }}
        >
          <Text
            style={{
              color: themeSwitch.theme === "dark"
                ? themeOptions.light_theme.text
                : themeOptions.dark_theme.text,
              fontSize: 20
            }}
          >
            {notification}
          </Text>

          <View style={styles.container}>
            <Text
              style={
                themeSwitch.theme === "dark"
                  ? styles.light_label
                  : styles.dark_label
              }
              onPress={() => {
                setModalVisible(false);
                setNotification("")
              }}
            >
              Back to Meal
            </Text>
          </View>
        </View>
      </ScrollView>
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
