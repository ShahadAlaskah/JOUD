import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
} from "react-native";

export default function StartUp({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
      <View>
        <Image source={require("../assets/joud5.png")} style={styles.imge1} />
        <Text style={styles.text1}>أبدا العب الان!</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.button1}>
          <Button
            title="لاعب واحد"
            onPress={() => {
              navigation.navigate("SinglePlayerMode");
            }}
            color="#FFFFFF"
          />
        </View>
        <View style={styles.button2}>
          <Button
            title="اكثر من لاعب"
            onPress={() => {
              navigation.navigate("MultiPlayerMode");
            }}
            color="#FFFFFF"
          />
        </View>

        <Button
          title="Board"
          onPress={() => {
            navigation.navigate("Board");
          }}
          color="#f194ff"
        />

        <Button
          title="Board2"
          onPress={() => {
            navigation.navigate("Board2");
          }}
          color="#f194ff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.3,
    position: "absolute",
    width: 224,
    height: 58,
    top: 382,
    right: 1,
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    alignContent: "center",
    backgroundColor: "#6F97B1",
  },
  button2: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.3,
    position: "absolute",
    width: 224,
    height: 58,
    top: 479,
    right: 1,
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    alignContent: "center",
    backgroundColor: "#AFD1CB",
  },
  text1: {
    position: "absolute",
    top: 314,
    textAlign: "center",
    alignSelf: "center",
    left: 119,
    fontSize: 22,
    lineHeight: 41,
    fontWeight: "bold",
    letterSpacing: -0.3,
    color: "#4C5785",
    fontStyle: "normal",
    flex: 1,
  },
  imge1: {
    width: 218,
    height: 296,
    resizeMode: "contain",
    left: -78,
    top: 100,
    transform: [{ rotate: "30deg" }],
  },
});
