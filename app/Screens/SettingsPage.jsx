import React, { useState } from "react";
import { Text, View, TouchableHighlight, StyleSheet, Modal, Dimensions } from "react-native";
import SwitchComp from "../Components/Switch";
import { ThemeSwitch, ColourSwitch } from '../Scripts/GlobalState';
import themeOptions from '../Objects/ThemesObjects';
import colourOptions from '../Objects/ColourObjects';


export const SettingsPage = () => {
  let themeSwitch = ThemeSwitch.useContainer();
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

      <View
        style={
          { flexDirection: 'column', }
        }
      >
        <View
          style={
            { alignItems: 'center', flexDirection: 'row-reverse', justifyContent: 'space-between', }
          }
        >
          <Text style={themeSwitch.theme === "dark" ? styles.light_label : styles.dark_label}>Change Theme</Text>
          <SwitchComp onChange={() => {
            themeSwitch.switchTheme();
          }}
          ></SwitchComp>
        </View>
      </View>
    </View >
  );

}

const styles = StyleSheet.create({
  dark_label: {
    color: themeOptions.dark_theme.text,
    margin: 20,
    padding: 15,
    backgroundColor: themeOptions.dark_theme.background,
    borderRadius: 6,
    width: Dimensions.get('screen').width / 3,
  },
  light_label: {
    color: themeOptions.light_theme.text,
    margin: 20,
    padding: 15,
    backgroundColor: themeOptions.light_theme.background,
    borderRadius: 6,
    width: Dimensions.get('screen').width / 3,
  },

})