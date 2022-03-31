import React, { Component, useState, useEffect } from "react";
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
import { authentication, db } from "../firebase/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Win({ navigation }) {
  const [Name, setName] = useState("");
  const [totalGame, setTotalGame] = useState(0);
  //const [totalLosses, setTotalLosses] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [point, setPoint] = useState(0);

  const user = authentication.currentUser;
  var uid = user.uid;
  const docref = doc(db, "player", uid);

  useEffect(() => {
    getDoc(docref).then((doc) => {
      setPoint(doc.get("point"));
      setTotalGame(doc.get("TotalGame"));
      setTotalWins(doc.get("TotalWins"));
    });
    updateDoc(doc(db, "player", uid), {
      TotalGame: totalGame + 1,
      TotalWins: totalWins + 1,
      //Point: point + currentPoint,
    });
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          borderColor: "black",
          borderWidth: 3,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          borderRadius: 20,
          // position: "absolute",
          // width: 350,
          // height: 350,
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
