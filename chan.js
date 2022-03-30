import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  ImageBackground,
  Image,
  Alert,
  Pressable,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Board from "../screens/board";
import LossPessimist from "../screens/lossPessimist";
import LossTape from "../screens/lossTape";
import Modal from "react-native-modal";
import { db } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import Win from "./win"; //position:"absolute",
//----------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  box: {
    flex: 4,
    marginTop: 150,
  },
  container: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flexDirection: "row",
    padding: 0,
    marginTop: 0,
  },
  board: {
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonbox: {
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#5c879c",
    flex: 1,
  },
  buttonc: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    flex: 1,
  },
  buttonr: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    flex: 1,
  },
  buttonrestart: {
    width: 102,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  boxButton: {
    flexDirection: "row",
  },
  padd: {
    padding: 10,
  },
  padd0: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  showQbox: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
  },
  showQ: {
    backgroundColor: "powderblue",
    borderColor: "black",
    borderWidth: 3,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    width: 352,
    height: 340,
    flexDirection: "column",
    //margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  containerShowQ: {
    //flexDirection: "row",
    //alignItems: "center",
    padding: 10,
    //flex:1,
    flex: 1,
    width: 300,
    //height: 340,
  },
  tapee: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
    width: 102,
    height: 40,
    left: 273,
    top: 2,
    position: "absolute",
    flex: 1,
  },
  pointt: {
    marginTop: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
    width: 102,
    height: 40,
    left: 273,
    top: 68,
    padding: 10,
    //position: "absolute",
    flex: 1,
  },
  pointtbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  info: {
    flex: 1,
    position: "absolute",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
    left: 13,
    top: 30,
    padding: 5,
  },
  textInfo: {
    fontSize: 30,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textShowQ: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
    padding: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  tt: {
    marginTop: 30,
    position: "absolute",
    width: 34,
    height: 33,
    left: 341,
    top: 33,
  },
});

export const fog = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("../assets/fog.png")}
      style={{ width: 45, height: 45, resizeMode: "contain" }}
    />
  </View>
);

export const tape = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

export const pessimist = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("../assets/pessimist.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const close = (
  <ImageBackground
    source={require("../assets/Assetcc.png")}
    resizeMode="stretch"
    style={{
      width: 63,
      height: 65,
      resizeMode: "contain",
      alignItems: "center",
      justifyContent: "center",
    }}
  ></ImageBackground>
);

const Light = (
  <ImageBackground
    source={require("../assets/Assetcc.png")}
    resizeMode="stretch"
    style={{
      width: 63,
      height: 65,
      resizeMode: "contain",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ImageBackground
      source={require("../assets/highlight.png")}
      resizeMode="stretch"
      style={{
        width: 63,
        height: 65,
        resizeMode: "contain",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></ImageBackground>
  </ImageBackground>
);

export const den = (
  <ImageBackground
    source={require("../assets/Assetden.png")}
    resizeMode="stretch"
    style={{
      width: 63,
      height: 65,
      resizeMode: "contain",
      alignItems: "center",
      justifyContent: "center",
    }}
  ></ImageBackground>
);

const Tape2 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const Tape3 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const Tape1 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const sta = " ";
//const nor = <Text> </Text>;
//----------------------------------------------------------------------------------------------

export default function SinglePlayerMode({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(true); //
  const [isModalVisible2, setModalVisible2] = useState(false); //
  const [isLossPessimist, setLossPessimist] = useState(false);
  const [isLossTape, setLossTape] = useState(false);
  const [isWin, setWin] = useState(false);
  //const [isTapeModalVisible, setTapeModalVisible] = useState(false);
  //const [moveState, setmoveState] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(0);
  const [positionOfNextRoom, setPositionOfNextRoom] = useState(0);
  const [numberOfTape, setnumberOfTape] = useState(3);
  const [Point, setPoint] = useState(0);
  const [roomNum, setRoomNum] = useState(0);
  const [nexRoomNum, setNexRoomNum] = useState(-1);
  const [question, setQuestion] = useState(); //let correctAnswer = 1;
  const [correctAnswer, setCorrectAnswer] = useState();
  const [questionType, setQuestionType] = useState(); //let correctAnswer = 1;QuestionLevel
  const [questionPoint, setQuestionPoint] = useState();
  const [choices, setChoices] = useState([
    { label: "" },
    { label: "" },
    { label: "" },
    { label: "" },
  ]);
  const [questionLevel, setQuestionLevel] = useState();
  const [myPath, setMyPath] = useState([0]); //let myPath = [0]; ||setTheArray([...myPath, ]);
  const [board1, setBoard1] = useState([]);
  const [pssIndexs, setPssIndexs] = useState([]);
  const [fogIndexs, setFogIndexs] = useState([]);
  const [tapeIndexs, setTapeIndexs] = useState([]);
  const [styleb1, setStyleb1] = useState(styles.button);
  const [styleb2, setStyleb2] = useState(styles.button);
  const [styleb3, setStyleb3] = useState(styles.button);
  const [styleb4, setStyleb4] = useState(styles.button);
  const [board, setBoard] = useState([
    sta,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    den,
  ]);
  let xx;
  useEffect(() => {
    xx = Board();
    setBoard1(xx.Board);
    setPssIndexs(xx.PssIndexs);
    setFogIndexs(xx.FogIndexs);
    setTapeIndexs(xx.TapeIndexs);
  }, []);

  // let board1 = [
  //   sta,
  //   fog,
  //   pessimist,
  //   fog,
  //   fog,
  //   pessimist,
  //   nor,
  //   tape,
  //   fog,
  //   nor,
  //   tape,
  //   fog,
  //   fog,
  //   fog,
  //   pessimist,
  //   fog,
  //   fog,
  //   pessimist,
  //   pessimist,
  //   fog,
  //   fog,
  //   pessimist,
  //   fog,
  //   fog,
  //   fog,
  //   pessimist,
  //   fog,
  //   fog,
  //   fog,
  //   tape,
  //   fog,
  //   pessimist,
  //   fog,
  //   fog,
  //   pessimist,
  //   den,
  // ];

  let joudChar = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ];
  let rrr = {
    roomNumber: [
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29],
      [30, 31, 32, 33, 34, 35],
    ],
    // fog: [1, 3, 4, 8, 11, 12, 13, 15, 16, 19, 20, 23, 24, 26, 28, 30, 32, 33],
    // pss: [2, 5, 14, 17, 18, 21, 25, 31, 34],
    // tape: [7, 10, 29],
  };
  let arrOpen = [];
  let arrLight = [];
  let arrClose = [];
  let aa = [1, -1, 6, -6];
  const questionLevel1 = [0, 1, 2, 3, 6, 7, 8, 12, 13, 16];
  const questionLevel2 = [
    4, 5, 9, 10, 11, 14, 15, 19, 20, 21, 24, 25, 26, 30, 31,
  ];
  const questionLevel3 = [17, 22, 23, 32, 33, 34, 35];

  //console.log('ghjkl;'+tapeIndexs);

  joudChar[roomNum] = (
    <Image
      source={require("../assets/joud5.png")}
      style={{ width: 45, height: 45, resizeMode: "contain" }}
    />
  ); // اللاعبه//chan

  let t; //chan
  if (numberOfTape == 3) t = Tape3;
  else if (numberOfTape == 2) t = Tape2;
  else if (numberOfTape == 1) t = Tape1;

  //-----------------------------------------------------بلوك خاص بالاتنبيهات
  const showFogWarnaing = (inc) => {
    if (fogIndexs.includes(roomNum + inc)) {
      showMessage({
        message: "warning!!",
        type: "warning",
      });
    }
  };
  const showPessimistWarnaing = (inc) => {
    if (pssIndexs.includes(roomNum + inc)) {
      showMessage({
        message: "warning!!",
        type: "danger",
      });
      endGame(1);
    }
  };
  const showPessimistOrFoggyWarnaing = (inc) => {
    showPessimistWarnaing(inc);
    showFogWarnaing(inc);
  };
  //--------------------------------------------------------------DataBase
  // const questionList = [
  //   {
  //     q: "أي مما يلي يُعد من العوامل المساعدة في الحصول على الاعتمادات للجامعة؟ ",
  //     t: "إختيار من متعدد",
  //     p: 5,
  //     c: [
  //       "جميع ما سبق ",
  //       "برامج تعليمية مواكبة لسوق العمل ",
  //       "كفاءة أعضاء هيئة التدريس ",
  //       "جودة المخرجات التعليمية ",
  //     ],
  //     l: 2,
  //     ca: 3,
  //   },
  // ];
  const getQuestion = async () => {
    const QuestionCol = collection(db, "QuestionsInfo");
    const QuestionSnapshot = await getDocs(QuestionCol);
    const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
    let qac = QuestionList[Math.floor(Math.random() * QuestionList.length)];
    setQuestion(qac.Questionis);
    setQuestionType(qac.Type);
    setQuestionPoint(qac.Point);
    setChoices(qac.Choices);
    setQuestionLevel(qac.QuestionLevel);
    setCorrectAnswer(qac.Answer);
    // if (questionLevel1.includes(positionOfNextRoom) && questionLevel != 1)
    //     getQuestion();
    // setQuestion("hhhhhhhhhhhhhhhhhhhhh");
    // setQuestionType("إختيار من متعدد");
    // setQuestionPoint(5);
    // setChoices(["h", "l", "k", "m"]);
    // setQuestionLevel(1);
    // setCorrectAnswer(2);
  };

  useEffect(() => {
    getQuestion(
      
    );

    // if (questionType === "إختيار من متعدد") {
    //   setTimeout(() => {
    //     setModalVisible(true);
    //   }, 500);
    // } else if (questionType === "صح وخطأ") {
    //   setTimeout(() => {
    //     setModalVisible2(true);
    //   }, 500);
    // }
  }, []);

  //------------------------------------------------------------------
  const displayQuestion = (nex, finalAnswer) => {
    console.log("myPath" + myPath);
    console.log("tapeIndexs" + tapeIndexs);
    console.log("pssIndexs" + pssIndexs);
    console.log("fogIndexs" + fogIndexs);

    getQuestion();

    if (nex != 0) {
      setNexRoomNum(nex);
      setPositionOfNextRoom(nex);
    }
    //setModalVisible(!isModalVisible); //عرض السوال
    let l = roomNum + 1;
    let r = roomNum - 1;
    let u = roomNum + 6;
    let d = roomNum - 6;
    if (
      l == nexRoomNum ||
      r == nexRoomNum ||
      u == nexRoomNum ||
      d == nexRoomNum ||
      0 == nexRoomNum
    ) {
      //console.log("fofaaaaa" + nexRoomNum);
      //myPath.push(positionOfNextRoom);
      //console.log("innn"); 23 29

      if (finalAnswer == -1) {
        setModalVisible(!isModalVisible);
        //   if (questionType === "إختيار من متعدد") {
        //     setTimeout(() => setModalVisible(!isModalVisible), 40000);
        // }else if (questionType === "صح وخطأ") {
        //   setTimeout(() => setModalVisible2(!isModalVisible), 40000);
        // }
      } else if (finalAnswer == correctAnswer) {
        setPoint(Point + questionPoint);
        for (let i = 0; i < aa.length; i++) {
          if (
            myPath.includes(positionOfNextRoom + aa[i]) == false ||
            positionOfNextRoom + aa[i] != 35
          ) {
            //console.log("habbbbbbbb" + (positionOfNextRoom + aa[i]));
            if (aa[i] == 1) {
              if ((positionOfNextRoom - (6 - 1)) % 6 != 0) {
                arrLight[i] = positionOfNextRoom + aa[i];
                board[arrLight[i]] = Light;
              }
            }
            if (aa[i] == 6) {
              if (positionOfNextRoom < 6 * (6 - 1)) {
                arrLight[i] = positionOfNextRoom + aa[i];
                board[arrLight[i]] = Light;
              }
            }
            if (aa[i] == -1) {
              if (positionOfNextRoom % 6 != 0) {
                arrLight[i] = positionOfNextRoom + aa[i];
                board[arrLight[i]] = Light;
              }
            }
            if (aa[i] == -6) {
              if (positionOfNextRoom > 6 - 1) {
                arrLight[i] = positionOfNextRoom + aa[i];
                board[arrLight[i]] = Light;
              }
            }
          }
        }

        for (let index = 0; index < board1.length; index++) {
          // if(arrLight.includes(index) == true){
          //   board[index]=Light;
          // }
          // // if(arrClose.includes(index)){
          // //   board[index]=close;
          // // }
          if (myPath.includes(index)) {
            board[index] = board1[index];
          }
        }
        //////////////////////////////////////////
        moveRDLU();
        //   for (let i = 0; i < arrLight.length; i++) {
        //     // if(myPath.includes(roomNum + aa[i]) == -1){
        //         board[arrLight[i]]=board1[arrLight[i]];
        //     // }
        //  };
        arrLight = null;
        //console.log('lyly'+arrLight[0]);
        if (questionType === "إختيار من متعدد") {
          setTimeout(() => setModalVisible(!isModalVisible), 1000);
        } else if (questionType === "صح وخطأ") {
          setTimeout(() => setModalVisible2(!isModalVisible), 1000);
        }
      } else if (finalAnswer != correctAnswer) {
        if (correctAnswer == 0) setStyleb1(styles.buttonc);
        if (correctAnswer == 1) setStyleb2(styles.buttonc);
        if (correctAnswer == 2) setStyleb3(styles.buttonc);
        if (correctAnswer == 3) setStyleb4(styles.buttonc);
        //setStyleb1(styles.button)setTimeout(() => setModalVisible(!isModalVisible), 4000);
        if (questionType === "إختيار من متعدد") {
          setTimeout(() => setModalVisible(!isModalVisible), 1000);
        } else if (questionType === "صح وخطأ") {
          setTimeout(() => setModalVisible2(!isModalVisible), 1000);
        }
        if (numberOfTape == 1) {
          endGame(2);
        } else {
          setnumberOfTape(numberOfTape - 1);
          //setModalVisible(!isModalVisible);
          displayQuestion(0, -1);
        }
      }
    }
    setTimeout(() => setStyleb1(styles.button), 1000);
    setTimeout(() => setStyleb2(styles.button), 1000);
    setTimeout(() => setStyleb3(styles.button), 1000);
    setTimeout(() => setStyleb4(styles.button), 1000);
  };

  const moveRDLU = () => {
    if (
      tapeIndexs.includes(positionOfNextRoom) &&
      numberOfTape != 3 &&
      myPath.includes(positionOfNextRoom) == false
    ) {
      setnumberOfTape(numberOfTape + 1);
    } else if (tapeIndexs.includes(positionOfNextRoom) && numberOfTape == 3) {
      setPoint(Point + 3);
    }
    if (positionOfNextRoom == roomNum + 1) {
      //moveR
      if ((roomNum - 5) % 6 != 0) {
        showPessimistOrFoggyWarnaing(1);
        setRoomNum(roomNum + 1);
        setMyPath([...myPath, roomNum + 1]);
        for (let index = 0; index < aa.length; index++) {
          if (aa[index] != 1) {
            if (!myPath.includes(roomNum + aa[index])) {
              board[roomNum + aa[index]] = close;
            }
          }
        }
      }
    } else if (positionOfNextRoom == roomNum - 1) {
      //moveL
      if (roomNum % 6 != 0) {
        showPessimistOrFoggyWarnaing(-1);
        setRoomNum(roomNum - 1);
        setMyPath([...myPath, roomNum - 1]);
        for (let index = 0; index < aa.length; index++) {
          if (aa[index] != -1) {
            if (!myPath.includes(roomNum + aa[index])) {
              board[roomNum + aa[index]] = close;
            }
          }
        }
      }
    } else if (positionOfNextRoom == roomNum - 6) {
      //moveUp
      if (roomNum > 5) {
        showPessimistOrFoggyWarnaing(-6);
        setRoomNum(roomNum - 6);
        setMyPath([...myPath, roomNum - 6]);
        for (let index = 0; index < aa.length; index++) {
          if (aa[index] != -6) {
            if (!myPath.includes(roomNum + aa[index])) {
              board[roomNum + aa[index]] = close;
            }
          }
        }
      }
    } else if (positionOfNextRoom == roomNum + 6) {
      //moveD
      if (roomNum < 30) {
        showPessimistOrFoggyWarnaing(6);
        setRoomNum(roomNum + 6);
        setMyPath([...myPath, roomNum + 6]);
        for (let index = 0; index < aa.length; index++) {
          if (aa[index] != 6) {
            if (!myPath.includes(roomNum + aa[index])) {
              board[roomNum + aa[index]] = close;
            }
          }
        }
      }
    }
    //myPath.push(positionOfNextRoom);
    board[positionOfNextRoom] = board1[positionOfNextRoom];
    if (roomNum == 35) {
      endGame(3);
    }
  };

  const reStart = () => {
    setnumberOfTape(3);
    setPoint(0);
    setRoomNum(0);
    setFinalAnswer(0);
    if (questionType === "إختيار من متعدد") {
      setModalVisible(true);
    } else if (questionType === "صح وخطأ") {
      setModalVisible2(true);
    }
    //myPath = null;
    setPositionOfNextRoom(0);
    setNexRoomNum(0);
    for (let index = 1; index < board.length - 1; index++) {
      board[index] = close;
    }
  };
  const endGame = (type) => {
    //type{[1]LossPessimist or [2]LossTape or [3]Tape=0}

    //navigation.navigate("LossPessimist");
    if (type == 1) {
      navigation.navigate("LossPessimist");
      //setLossPessimist(!isLossPessimist);
    } else if (type == 2) {
      navigation.navigate("LossTape");
      //setLossTape(!isLossTape);
    } else if (type == 3) {
      navigation.navigate("Win");
      //setWin(!isWin);
    }
  };
  const showConfirmDialog = () => {
    return Alert.alert("هل انت متأكد من انهاء اللعبة؟", [
      {
        text: "نعم",
        onPress: () => {
          navigation.navigate("StartUp");
        },
      },
      {
        text: "لا",
      },
    ]);
  };
  return (
    <MenuProvider>
      <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
        <View>
          <View style={styles.tapee}>{t}</View>
          <View style={styles.tt} opacity={0.6}>
            <Pressable
              onPress={() => {
                if (numberOfTape != 3 && Point >= 3) {
                  setnumberOfTape(numberOfTape + 1);
                  setPoint(Point - 3);
                }
              }}
            >
              <Image
                source={require("../assets/Assetp.png")}
                style={{ width: 34, height: 33, resizeMode: "contain" }}
              />
            </Pressable>
          </View>
        </View>
        <Menu style={{ flex: 1, position: "absolute", top: 2 }}>
          <MenuTrigger>
            <View style={styles.info}>
              <Icon name="menu" size={25} color={"#FFF7F0"} />
            </View>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert(`info`)} text="Info" />
            <MenuOption
              onSelect={() => showConfirmDialog()}
              text="انهاء اللعبه"
            />
          </MenuOptions>
        </Menu>
        {/* <Pressable
          style={styles.info}
          onPress={() => {
            Alert.alert("مرحبا بك بجود 3>");
          }}
        >
          <Image
            source={require("../assets/Asset1.png")}
            style={{ width: 48, height: 50, resizeMode: "contain" }}
          />
        </Pressable> */}

        <View style={styles.pointt}>
          <Text style={styles.text}>{Point} نقاط</Text>
        </View>

        {/* <View style={styles.buttonrestart}>
          <Button onPress={reStart} title="ReStart" color="red" />
        </View> */}

        <View style={styles.box}>
          <View style={styles.container}>
            <Pressable
              key={35}
              onPress={() => {
                {
                  displayQuestion(35, -1);
                }
              }}
            >
              <ImageBackground
                source={require("../assets/Assetden.png")}
                resizeMode="stretch"
                style={{
                  width: 63,
                  height: 65,
                  resizeMode: "contain",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageBackground
                  style={{ width: 63, height: 65, flexDirection: "row" }}
                >
                  <View style={{ flex: "1.5", top: 5 }}>
                    <Text>{joudChar[35]}</Text>
                  </View>
                  <Text>{board[35]}</Text>
                </ImageBackground>
              </ImageBackground>
            </Pressable>
          </View>

          <View style={styles.container}>
            {[29, 34].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[33, 28, 23].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>
          <View style={styles.container}>
            {[32, 27, 22, 17].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[31, 26, 21, 16, 11].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[30, 25, 20, 15, 10, 5].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[24, 19, 14, 9, 4].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[18, 13, 8, 3].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[12, 7, 2].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[6, 1].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    displayQuestion(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            <Pressable
              key={0}
              onPress={() => {
                {
                  displayQuestion(0, -1);
                }
              }}
            >
              <ImageBackground
                source={require("../assets/roomm.png")}
                resizeMode="stretch"
                style={{
                  width: 63,
                  height: 65,
                  resizeMode: "contain",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageBackground
                  style={{ width: 63, height: 65, flexDirection: "row" }}
                >
                  <View style={{ flex: "1.5", top: 5 }}>
                    <Text>{joudChar[0]}</Text>
                  </View>
                  <Text>{board[0]}</Text>
                </ImageBackground>
              </ImageBackground>
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Modal
            isVisible={isModalVisible}
            animationInTiming={60}
            animationOutTiming={900}
          >
            <View style={styles.showQ}>
              <Text style={styles.textShowQ}>{question}</Text>
              <View style={styles.showQbox}>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb1}
                    onPress={() => {
                      if (correctAnswer == 0) {
                        setStyleb1(styles.buttonc);
                      } else {
                        setStyleb1(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 0);
                    }}
                  >
                    <Text style={styles.text}>{choices[0].label}</Text>
                  </Pressable>
                </View>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb2}
                    onPress={() => {
                      if (correctAnswer == 1) {
                        setStyleb2(styles.buttonc);
                      } else {
                        setStyleb2(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 1);
                    }}
                  >
                    <Text style={styles.text}>{choices[1].label}</Text>
                  </Pressable>
                </View>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb3}
                    onPress={() => {
                      if (correctAnswer == 2) {
                        setStyleb3(styles.buttonc);
                      } else {
                        setStyleb3(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 2);
                    }}
                  >
                    <Text style={styles.text}>{choices[2].label}</Text>
                  </Pressable>
                </View>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb4}
                    onPress={() => {
                      if (correctAnswer == 3) {
                        setStyleb4(styles.buttonc);
                      } else {
                        setStyleb4(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 3);
                    }}
                  >
                    <Text style={styles.text}>{choices[3].label}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={isModalVisible2}
            animationInTiming={60}
            animationOutTiming={900}
          >
            <View style={styles.showQ}>
              <Text>{question}</Text>

              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb1}
                  onPress={() => {
                    setStyleb1(styles.buttonc);
                    displayQuestion(nexRoomNum, 1);
                    {
                      /* {choices[0]}*/
                    }
                  }}
                >
                  <Text style={styles.text}>صح</Text>
                  {/* {choices[0]}*/}
                </Pressable>
                <View style={styles.padd}></View>
                <Pressable
                  style={styleb2}
                  onPress={() => {
                    setStyleb2(styles.buttonr);
                    displayQuestion(nexRoomNum, 2);
                    {
                      /* {choices[1]}*/
                    }
                  }}
                >
                  <Text style={styles.text}>خطأ</Text>
                  {/* {choices[1]}*/}
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal isVisible={isLossPessimist}>
            <LossTape />
          </Modal>
          <Modal isVisible={isLossTape}>
            <LossPessimist />
          </Modal>
          <Modal isVisible={isWin}>
            <Win />
          </Modal>

          {/* <View style={styles.board}>
            <Text>{roomNum}</Text>
          </View> */}
        </View>
        <FlashMessage />
      </View>
    </MenuProvider>
  );
}
// export default function SinglePlayerMode({ navigation }) {
//   return <SPM />;
// }
