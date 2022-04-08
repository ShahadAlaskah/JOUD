import React, { useState, useEffect, useLayoutEffect } from "react";
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
import Board from "./board.js";
import LossPessimist from "./piss.js";
// import LossTape from "/Users/shahadfehaidalqhatni/s/src/Screens/Game/Single_player/LossTape.js";
import Modal from "react-native-modal";
import { db, authentication } from "./firbase.js";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  querySnapshot,
  where,
  arrayUnion,
  arrayRemove,
  getDoc,
  addDoc,
} from "firebase/firestore";
import Win from "./win.js"; //position:"absolute",
import { useRoute } from "@react-navigation/native";
import { async } from "@firebase/util";

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
      source={require("./assets/foggy.png")}
      style={{ width: 45, height: 45, resizeMode: "contain" }}
    />
  </View>
);

export const tape = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

export const pessimist = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("./assets/pessimist.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const close = (
  <ImageBackground
    source={require("./assets/Assetcc.png")}
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
    source={require("./assets/Assetcc.png")}
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
      source={require("./assets/highlight.png")}
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
    source={require("./assets/deanship.png")}
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
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const Tape3 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const Tape1 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const sta = " ";

export default function Game({ navigation }) {
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(true); //
  const [isExplorerModalVisible, setExplorerModalVisible] = useState(false); //
  const [isModalVisible2, setModalVisible2] = useState(false); //
  const [isLossPessimist, setLossPessimist] = useState(false);
  const [isLossTape, setLossTape] = useState(false);
  const [isWin, setWin] = useState(false);
  const [PlayerExplorer, setPlayerExplorer] = useState("");
  //const [isTapeModalVisible, setTapeModalVisible] = useState(false);
  //const [moveState, setmoveState] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(0);
  const [finalExplorer, setFinalExplorer] = useState("");
  const [ModalContent, setModalContent] = useState("");
  const [positionOfNextRoom, setPositionOfNextRoom] = useState(0);
  const [numberOfTape, setnumberOfTape] = useState(3);
  const [Point, setPoint] = useState(0);
  const [roomNum, setRoomNum] = useState(0);
  const [nexRoomNum, setNexRoomNum] = useState(-1);

  let question; //let correctAnswer = 1;
  let correctAnswer;
  let questionType; //let correctAnswer = 1;QuestionLevel
  let questionPoint;
  //const [point, setpoint] = useState(0);
  let Player = [];
  let choices = ["", "", "", ""];
  let questionLevel;

  const [myPath, setMyPath] = useState([0]); //let myPath = [0]; ||setTheArray([...myPath, ]);
  const [board, setBoard] = useState([]);

  const [pssIndexs, setPssIndexs] = useState([]);
  const [fogIndexs, setFogIndexs] = useState([]);
  const [tapeIndexs, setTapeIndexs] = useState([]);

  const [styleb1, setStyleb1] = useState(styles.button);
  const [styleb2, setStyleb2] = useState(styles.button);
  const [styleb3, setStyleb3] = useState(styles.button);
  const [styleb4, setStyleb4] = useState(styles.button);

  let Player_room1 = [];
  let Player_room2 = [];
  let Player_room3 = [];
  let Player_room4 = [];

  let Player_Answer1 = [];
  let Player_Answer2 = [];
  let Player_Answer3 = [];
  let Player_Answer4 = [];

  let Player_Explorer1 = [];
  let Player_Explorer2 = [];
  let Player_Explorer3 = [];
  let Player_Explorer4 = [];
  let Player_Explorer5 = [];

  const [vote, setVote] = useState([]);
  const [vote2, setVote2] = useState([]);
  const [vote3, setVote3] = useState([]);
  const [vote4, setVote4] = useState([]);

  const [Player1Position, setPlayer1Position] = useState(0);
  const [Player2Position, setPlayer2Position] = useState(0);

  const [Player1ActiveState, setPlayer1ActiveState] = useState(true);
  const [Player2ActiveState, setPlayer2ActiveState] = useState(false);

  // const [board, setBoard] = useState([
  // sta,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // close,
  // den,
  // ]);
  let joudCharPlayer1 = [
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
  let joudCharPlayer2 = [
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
  let xx;
  useEffect(() => {
    xx = Board();
    setBoard(xx.Board);
    setPssIndexs(xx.PssIndexs);
    setFogIndexs(xx.FogIndexs);
    setTapeIndexs(xx.TapeIndexs);
  }, []);
  const user = authentication.currentUser;

  let Players = {
    player1: {
      Email: "lana@gmail.com",
      ActiveState: Player1ActiveState,
      Position: Player1Position,
    },
    player2: {
      Email: "shosho@gmail.com",
      ActiveState: Player2ActiveState,
      Position: Player2Position,
    },
  };

  //--------------------------------------------------------joud Char
  joudCharPlayer1[Players.player1.Position] = (
    <Image
      source={require("./assets/player1.png")}
      style={{ width: 25, height: 25, resizeMode: "contain" }}
    />
  );

  joudCharPlayer2[Players.player2.Position] = (
    <Image
      source={require("./assets/player2.png")}
      style={{ width: 25, height: 25, resizeMode: "contain" }}
    />
  );
  //--------------------------------------------------------
  let t; //chan
  if (numberOfTape === 3) t = Tape3;
  else if (numberOfTape === 2) t = Tape2;
  else if (numberOfTape === 1) t = Tape1;

  const roomID = "DHvvsKI45";
  //--------------------------------------------------------get Question
  const getQuestion = async () => {
    // const QuestionCol = collection(db, "QuestionsInfo");
    // const QuestionSnapshot = await getDocs(QuestionCol);
    // const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
    // let qac = QuestionList[Math.floor(Math.random() * QuestionList.length)];
    // setQuestion(qac.Questionis);
    // setQuestionType(qac.Type);
    // setQuestionPoint(qac.Point);
    // setChoices(qac.Choices);
    // setQuestionLevel(qac.QuestionLevel);
    // setCorrectAnswer(qac.Answer);
    // setModalVisible(true)
    // if (questionLevel1.includes(positionOfNextRoom) && questionLevel != 1)
    // getQuestion();
    question = "hhhhhhhhhhhhhhhhhhhhh";
    questionType = "إختيار من متعدد";
    questionPoint = 5;
    choices = ["h", "l", "k", "m"];
    questionLevel = 1;
    correctAnswer = 2;
  };
  //--------------------------------------------------------update

  function Update(value, merge, DocToBeUpdated) {
    const Ref = doc(db, "Game", roomID);

    if (DocToBeUpdated === "None") {
      setDoc(Ref, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated === "Room") {
      const myDoc = doc(Ref, "Votes", "Rooms");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          // alert(error.message)
        });
    } else if (DocToBeUpdated === "Explorer") {
      const myDoc = doc(Ref, "Votes", "Explorer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          //alert("Document Updated")
        })
        .catch((error) => {
          // alert(error.message)
        });
    } else if (DocToBeUpdated === "Answer") {
      const myDoc = doc(Ref, "Votes", "Answer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  useLayoutEffect(() => {
    const collectionRef = collection(db, "Game", roomID, "Votes");
    //const collectionRef = doc(db,'Game',roomID);
    const q = query(
      collectionRef,
      where("Room2", "array-contains", user.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      Player = querySnapshot.docs.map((doc) => ({
        Room2: doc.data().Room2,
      }));
    });
    return () => unsubscribe;
  }, []);
  //--------------------------------------------------------vote
  function validateRoomVote(value) {
    Update({ Room1: arrayRemove(user.email) }, true, "Room");
    Update({ Room2: arrayRemove(user.email) }, true, "Room");
    Update({ Room3: arrayRemove(user.email) }, true, "Room");
    Update({ Room4: arrayRemove(user.email) }, true, "Room");

    if (value === "Room1") {
      Update(
        {
          Room1: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value === "Room2") {
      Update(
        {
          Room2: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value === "Room3") {
      Update(
        {
          Room3: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value === "Room4") {
      Update(
        {
          Room4: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    }
  }

  async function validateAnswerVote(value) {
    Update({ Choice1: arrayRemove(user.email) }, true, "Answer");
    Update({ Choice2: arrayRemove(user.email) }, true, "Answer");
    Update({ Choice3: arrayRemove(user.email) }, true, "Answer");
    Update({ Choice4: arrayRemove(user.email) }, true, "Answer");

    if (value === "Choice1") {
      Update(
        {
          Choice1: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value === "Choice2") {
      Update(
        {
          Choice2: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value === "Choice3") {
      Update(
        {
          Choice3: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value === "Choice4") {
      Update(
        {
          Choice4: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    }

    // checkFinalAnswer().then(res=>{
    // console.log('try tt')
    // })
    // correctaswer()
    //Alert.alert(vote[0])

    // var promise = new Promise((resolve , reject) => {
    // // call resolve if the method succeeds
    // checkFinalAnswer()
    // resolve(true);
    // })
    // promise.then(bool => correctaswer())

    // checkFinalAnswer()
  }

  function validateExplorerVote(value) {
    Update({ Player1: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player2: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player3: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player4: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player5: arrayRemove(user.email) }, true, "Explorer");
    if (value === "Player1") {
      Update(
        {
          Player1: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value === "Player2") {
      Update(
        {
          Player2: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value === "Player3") {
      Update(
        {
          Player3: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value === "Player4") {
      Update(
        {
          Player4: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value === "Player5") {
      Update(
        {
          Player5: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    }
  }

  async function VoteRoom() {
    const Ref = doc(db, "Game", roomID, "Votes", "Rooms");
    await getDoc(Ref)
      .then((doc) => {
        Player_room1 = doc.get("Room1");
        Player_room2 = doc.get("Room2");
        Player_room3 = doc.get("Room3");
        Player_room4 = doc.get("Room4");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  async function VoteAnswer() {
    const Reff = doc(db, "Game", roomID, "Votes", "Answer");
    await getDoc(Reff)
      .then((doc) => {
        Player_Answer1 = doc.get("Choice1");
        Player_Answer2 = doc.get("Choice2");
        Player_Answer3 = doc.get("Choice3");
        Player_Answer4 = doc.get("Choice4");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  async function VoteExplorer() {
    const Ref = doc(db, "Game", roomID, "Votes", "Explorer");
    getDoc(Ref)
      .then((doc) => {
        Player_Explorer1 = doc.get("Player1");
        Player_Explorer2 = doc.get("Player2");
        Player_Explorer3 = doc.get("Player3");
        Player_Explorer4 = doc.get("Player4");
        Player_Explorer5 = doc.get("Player5");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  //--------------------------------------------------------
  useEffect(() => {
    ModalC("Question");
  }, []);

  //--------------------------------------------------------control

  async function control(Next_Room, FinalAnswer) {
    console.log("myPath" + myPath);
    console.log("tapeIndexs" + tapeIndexs);
    console.log("pssIndexs" + pssIndexs);
    console.log("fogIndexs" + fogIndexs);
    console.log("Ponits" + Point);
    console.log("in control method ");

    const docref = doc(db, "Game", roomID);
    await getDoc(docref).then((doc) => {
      Player = doc.get("ActivePlayer");
    });

    // setPositionOfNextRoom(Next_Room);
    getQuestion();

    // VoteRoom();
    if (Next_Room != 0) {
      if (Next_Room === roomNum + 1) {
        //-----------------------------------------moveR
        if ((roomNum - 5) % 6 != 0) {
          validateRoomVote("Room2");
        }
      } else if (Next_Room === roomNum - 1) {
        //-----------------------------------------moveL
        if (roomNum % 6 != 0) {
          validateRoomVote("Room4");
        }
      } else if (Next_Room === roomNum - 6) {
        //-------------------------------------------moveUp
        if (roomNum > 5) {
          validateRoomVote("Room1");
        }
      } else if (Next_Room === roomNum + 6) {
        //-----------------------------------------------moveD
        if (roomNum < 30) {
          validateRoomVote("Room3");
        }
      }

      const Ref = doc(db, "Game", roomID, "Votes", "Rooms");
      await getDoc(Ref)
        .then((doc) => {
          Player_room1 = doc.get("Room1");
          Player_room2 = doc.get("Room2");
          Player_room3 = doc.get("Room3");
          Player_room4 = doc.get("Room4");
        })
        .catch((error) => {
          alert(error.message);
        });

      console.log(
        "inside control true ",
        "1-",
        Player_room1.length,
        "2-",
        Player_room2.length,
        "3-",
        Player_room3.length,
        "4-",
        Player_room4.length,
        "total length",
        Player.length
      );

      if (
        Player_room1.length +
          Player_room2.length +
          Player_room3.length +
          Player_room4.length ===
        Player.length
      ) {
        console.log(
          "inside control true ",
          "1-",
          Player_room1.length,
          "2-",
          Player_room2.length,
          "3-",
          Player_room3.length,
          "4-",
          Player_room4.length,
          "total length",
          Player.length
        );

        MaxVotesOfNextRoom();
        ModalC("Question");
        setTimeout(() => setModalVisible(true), 20);

        // moveRDLU();
      } else {
        console.log(
          "inside control false ",
          "1-",
          Player_room1.length,
          "2-",
          Player_room2.length,
          "3-",
          Player_room3.length,
          "4-",
          Player_room4.length,
          "total length",
          Player.length
        );
      }
    }
    //delete if

    if (FinalAnswer != -1) {
      if (FinalAnswer === 0) {
        validateAnswerVote("Choice1");
      } else if (FinalAnswer === 1) {
        validateAnswerVote("Choice2");
      } else if (FinalAnswer === 2) {
        validateAnswerVote("Choice3");
      } else if (FinalAnswer === 3) {
        validateAnswerVote("Choice4");
      }

      const Reff = doc(db, "Game", roomID, "Votes", "Answer");
      await getDoc(Reff)
        .then((doc) => {
          Player_Answer1 = doc.get("Choice1");
          Player_Answer2 = doc.get("Choice2");
          Player_Answer3 = doc.get("Choice3");
          Player_Answer4 = doc.get("Choice4");
        })
        .catch((error) => {
          alert(error.message);
        });

      VoteAnswer();
      console.log(
        "player answer1 ",
        Player_Answer1.length,
        "player answer2 ",
        Player_Answer2.length,
        "player answer3 ",
        Player_Answer3.length,
        "player answer4 ",
        Player_Answer4.length
      );
      if (
        Player_Answer1.length +
          Player_Answer2.length +
          Player_Answer3.length +
          Player_Answer4.length ===
        Player.length
      ) {
        MaxVotesOfFinalAnswer(); //we need write then to preforn the methods in seq
        //  setFinalAnswer(2);
        if (finalAnswer === correctAnswer) {
          setPoint(Point + questionPoint);
          setTimeout(() => setModalVisible(false));
          showPessimistOrFoggyWarnaing(positionOfNextRoom);
          if (fogIndexs.includes(roomNum)) {
            console.log(" go to move");
            Move("Explorer", -1);
          } else {
            Move("Players", -1);
          }
        } else if (finalAnswer != correctAnswer) {
          if (correctAnswer === 0) setStyleb1(styles.buttonc);
          if (correctAnswer === 1) setStyleb2(styles.buttonc);
          if (correctAnswer === 2) setStyleb3(styles.buttonc);
          if (correctAnswer === 3) setStyleb4(styles.buttonc);
          //setStyleb1(styles.button)setTimeout(() => setModalVisible(!isModalVisible), 4000);
          setModalVisible(false);
          if (numberOfTape === 1) {
            // endGame(2);
            console.log("End game");
          } else {
            setnumberOfTape(numberOfTape - 1);
            //setModalVisible(!isModalVisible);
            // displayQuestion(0, -1);
          }
        }
      }
    }

    setTimeout(() => setStyleb1(styles.button), 1000);
    setTimeout(() => setStyleb2(styles.button), 1000);
    setTimeout(() => setStyleb3(styles.button), 1000);
    setTimeout(() => setStyleb4(styles.button), 1000);
  }
  //--------------------------------------------------------model c
  function ModalC(Type) {
    if (Type === "Explorer") {
      setModalContent(
        <View>
          <Text style={styles.textShowQ}>صوت للمستكشفة</Text>
          <View style={styles.showQbox}>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb1}
                onPress={() => {
                  Move("Vote Explorer", 0);
                }}
              >
                <Text style={styles.text}>{Player[0]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb2}
                onPress={() => {
                  Move("Vote Explorer", 1);
                }}
              >
                <Text style={styles.text}>{Player[1]}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    } else if (Type === "Question") {
      setModalContent(
        <View>
          <Text style={styles.textShowQ}>{question}</Text>
          <View style={styles.showQbox}>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb1}
                onPress={() => {
                  if (correctAnswer === 0) {
                    setStyleb1(styles.buttonc);
                  } else {
                    setStyleb1(styles.buttonr);
                  }
                  control(nexRoomNum, 0);
                }}
              >
                <Text style={styles.text}>{choices[0]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb2}
                onPress={() => {
                  if (correctAnswer === 1) {
                    setStyleb2(styles.buttonc);
                  } else {
                    setStyleb2(styles.buttonr);
                  }
                  control(nexRoomNum, 1);
                }}
              >
                <Text style={styles.text}>{choices[1]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb3}
                onPress={() => {
                  if (correctAnswer === 2) {
                    setStyleb3(styles.buttonc);
                  } else {
                    setStyleb3(styles.buttonr);
                  }
                  control(nexRoomNum, 2);
                }}
              >
                <Text style={styles.text}>{choices[2]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb4}
                onPress={() => {
                  if (correctAnswer === 3) {
                    setStyleb4(styles.buttonc);
                  } else {
                    setStyleb4(styles.buttonr);
                  }
                  control(nexRoomNum, 3);
                }}
              >
                <Text style={styles.text}>{choices[3]}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    }
  }

  //-----------------------------------------------------بلوك خاص بالاتنبيهات
  const showFogWarnaing = (inc) => {
    if (fogIndexs.includes(inc)) {
      showMessage({
        message: "warning!!",
        type: "warning",
      });
      console.log(" foggy room ", inc);
    }
  };
  const showPessimistWarnaing = (inc) => {
    if (pssIndexs.includes(inc)) {
      showMessage({
        message: "warning!!",
        type: "danger",
      });
      // endGame(1);
      console.log("pissims room ", inc);
    }
  };
  const showPessimistOrFoggyWarnaing = (inc) => {
    showPessimistWarnaing(inc);
    showFogWarnaing(inc);
  };
  //---------------------------------------------------------------------------max
  function MaxVotesOfNextRoom() {
    let Max = Math.max(
      Player_room2.length,
      Player_room3.length,
      Player_room1.length,
      Player_room4.length
    );

    if (Max === Player_room1.length) {
      setPositionOfNextRoom(roomNum - 6);
    } else if (Max === Player_room2.length) {
      setPositionOfNextRoom(roomNum + 1);
    } else if (Max === Player_room3.length) {
      setPositionOfNextRoom(roomNum + 6);
    } else if (Max === Player_room4.length) {
      setPositionOfNextRoom(roomNum - 1);
    }
  }

  function MaxVotesOfFinalAnswer() {
    let Max = Math.max(
      Player_Answer1.length,
      Player_Answer2.length,
      Player_Answer3.length,
      Player_Answer4.length
    );
    if (Max === Player_Answer1.length) {
      setFinalAnswer(0);
    } else if (Max === Player_Answer2.length) {
      setFinalAnswer(1);
    } else if (Max === Player_Answer3.length) {
      setFinalAnswer(2);
    } else if (Max === Player_Answer4.length) {
      setFinalAnswer(3);
    }
  }
  function MaxVotesOfFinalExplorer() {
    let Max = Math.max(
      Player_Explorer1.length,
      Player_Explorer2.length,
      Player_Explorer3.length,
      Player_Explorer4.length,
      Player_Explorer5.length
    );
    if (Max === Player_Explorer1.length) {
      setFinalExplorer(Players.player1.Email);
    } else if (Max === Player_Explorer2.length) {
      setFinalExplorer(Players.player2.Email);
    }

    // else if(Max==Player_Explorer3.length)
    // {setFinalExplorer(2)}
    // else if(Max==Player_Explorer4.length)
    // {setFinalExplorer(3)}
    // else if(Max==Player_Explorer5.length)
    // {setFinalExplorer(4)}
  }
  //-----------------------------------------------------------------------------move fun
  function Move(type, vote) {
    if (type === "Explorer") {
      setTimeout(() => setModalVisible(true), 1000);
      ModalC("Explorer");
    } else if (type === "Players") {
      setPlayer1Position(positionOfNextRoom);
      setPlayer2Position(positionOfNextRoom);
      setRoomNum(positionOfNextRoom);
    } else if (type === "Vote Explorer") {
      const Ref = doc(db, "Game", roomID, "Votes", "Explorer");
      getDoc(Ref)
        .then((doc) => {
          Player_Explorer1 = doc.get("Player1");
          Player_Explorer2 = doc.get("Player2");
          Player_Explorer3 = doc.get("Player3");
          Player_Explorer4 = doc.get("Player4");
          Player_Explorer5 = doc.get("Player5");
        })
        .catch((error) => {
          alert(error.message);
        });
      if (vote === 0) {
        validateExplorerVote("Player1");
      } else if (vote === 1) {
        validateExplorerVote("Player2");
      } else if (vote === 2) {
        validateExplorerVote("Player3");
      } else if (vote === 3) {
        validateExplorerVote("Player4");
      } else if (vote === 4) {
        validateExplorerVote("Player5");
      }
      if (
        Player_Explorer1.length +
          Player_Explorer2.length +
          Player_Explorer3.length +
          Player_Explorer4.length +
          Player_Explorer5.length ===
        Player.length
      ) {
        {
          setModalVisible(false);
          MaxVotesOfFinalExplorer();
          if (finalExplorer === Players.player1.Email) {
            setPlayer1Position(positionOfNextRoom);
            setPlayerExplorer(1);
          } else if (finalExplorer === Players.player2.Email) {
            setPlayer2Position(positionOfNextRoom);
            setPlayerExplorer(2);
          }
          //-----------------------------------------------
          if (pssIndexs.includes(positionOfNextRoom)) {
            freeze(PlayerExplorer);
          } else {
            //  Move(Players,-1);
            //  setPlayer1Position(positionOfNextRoom);
            setTimeout(() => setPlayer2Position(positionOfNextRoom), 1000);
            setRoomNum(positionOfNextRoom);
          }
        }
      }
    }
  }
  //-----------------------------------------------------------------------------end game , freeze
  const endGame = (type) => {
    //type{[1]LossPessimist or [2]LossTape or [3]Tape=0}

    if (type == 1) {
      //  navigation.navigate("LossPessimist");
    } else if (type == 2) {
      // navigation.navigate("LossTape");
    } else if (type == 3) {
      // navigation.navigate("Win");
    }
  };
  const freeze = (PlayerExplorer) => {
    if (PlayerExplorer === 1) {
      setPlayer1ActiveState(false);
    } else if (PlayerExplorer === 2) {
      setPlayer2ActiveState(false);
    }
  };
  //-----------------------------------------------------------------------------
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
                source={require("./assets/Assetp.png")}
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

        <View style={styles.pointt}>
          <Text style={styles.text}>{Point} نقاط</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.container}>
            <Pressable
              key={35}
              onPress={() => {
                {
                  control(35, -1);
                }
              }}
            >
              <ImageBackground
                source={require("./assets/deanship.png")}
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
                    <Text>{joudCharPlayer1[35]}</Text>
                    <Text>{joudCharPlayer2[35]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    control(i, -1);
                    // control(i,-1);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                    console.log("inside press");
                    control(i, 0);
                  }
                }}
              >
                <ImageBackground
                  source={require("./assets/roomm.png")}
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
                      <Text>{joudCharPlayer1[i]}</Text>
                      <Text>{joudCharPlayer2[i]}</Text>
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
                  control(0, -1);
                }
              }}
            >
              <ImageBackground
                source={require("./assets/roomm.png")}
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
                    <Text>{joudCharPlayer1[0]}</Text>
                    <Text>{joudCharPlayer2[0]}</Text>
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
            animationOutTiming={6000}
          >
            <View style={styles.showQ}>
              <Text>{ModalContent}</Text>
            </View>
          </Modal>
        </View>
        <FlashMessage />
      </View>
    </MenuProvider>
  );
}
