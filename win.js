import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import StartUp from "../screens/StartUp";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function Win({ navigation }) {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          borderColor: "powderblue",
          borderWidth: 3,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          borderRadius: 20,
          position: "absolute",
          width: 350,
          height: 350,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Image
            source={require("../assets/JoudWin3.jpg")}
            style={{
              top: 45,
              width: 254,
              height: 251,
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              backgroundColor: "#D9E8F1",
              borderRadius: 20,
              opacity: 0.6,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              position: "absolute",
              width: 74,
              height: 31,
              bottom: 230,
              flexDirection: "row",
            }}
          >
            <Icon name="star" size={15} />
            <Text style={{ opacity: 1 }}> 234</Text>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    position: "absolute",
    height: 69,
    width: 242,
    position: "absolute",
    top: 40,
    textAlign: "right",
    left: -2,
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#4C5784",
    fontStyle: "normal",
    flex: 1,
  },
});
