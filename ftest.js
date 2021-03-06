import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as React from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";

const Ftest = ({ navigation }) => {
  const [Answer, setAnswer] = React.useState("");
  const [Category, setCategory] = React.useState("");
  const [Question, setQuestion] = React.useState("");
  const [Choices, setChoices] = React.useState([""]);

  const Submitvent = async () => {
    await setDoc(doc(db, "Qustion", "random2"), {
      Answer: Answer,
      Category: Category,
      Question: Question,
      Choices: Choices,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={(Answer) => setAnswer(Answer)}
            value={Answer}
          />
          <TextInput
            style={styles.input}
            onChangeText={(Category) => setCategory(Category)}
            value={Category}
          />
          <TextInput
            style={styles.input}
            onChangeText={(Question) => setQuestion(Question)}
            value={Question}
          />
          <TextInput
            style={styles.input}
            onChangeText={(Choices0) => Choices.push(Choices0)}
            value={Choices}
          />
          <TextInput
            style={styles.input}
            onChangeText={(Choices1) => Choices.push(Choices1)}
            value={Choices}
          />
          <TextInput
            style={styles.input}
            onChangeText={(Choices2) => Choices.push(Choices2)}
            value={Choices}
          />
          <TextInput
            style={styles.input}
            onChangeText={(Choices3) => Choices.push(Choices3)}
            value={Choices}
          />
          <View style={styles.button1}>
            <Button
              onPress={() => {
                Submitvent();
              }}
              title="setData"
              color={"red"}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Ftest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  button1: {
    //flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.3,
    width: 224,
    height: 58,
    borderRadius: 100,
    alignSelf: "center",
    //position: "absolute",
    alignContent: "center",
    backgroundColor: "#6F97B1",
    padding: 10,
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
  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
