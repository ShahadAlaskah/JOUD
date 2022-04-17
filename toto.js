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
  updateDoc,
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
import { update } from "firebase/database";

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
//----------------------------------------------------------------------------------------------------------------
export default function Game({ navigation }) {
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(false); //
  const [isExplorerModalVisible, setExplorerModalVisible] = useState(false); //
  const [isModalVisible2, setModalVisible2] = useState(false); //
  const [isLossPessimist, setLossPessimist] = useState(false);
  const [isLossTape, setLossTape] = useState(false);
  const [isWin, setWin] = useState(false);
  const [PlayerExplorer, setPlayerExplorer] = useState("");
  let finalAnswer;
  let finalExplorer;
  const [ModalContent, setModalContent] = useState("");
  const [positionOfNextRoom, setPositionOfNextRoom] = useState();
  const [numberOfTape, setnumberOfTape] = useState();
  const [Point, setPoint] = useState(0);
  const [roomNum, setRoomNum] = useState();
  const [nexRoomNum, setNexRoomNum] = useState();

  let question; //let correctAnswer = 1;
  let correctAnswer;
  let questionType; //let correctAnswer = 1;QuestionLevel
  let questionPoint;
  //const [point, setpoint] = useState(0);
  let Player = [];
  let choices = ["", "", "", ""];
  let questionLevel;
  let arrLight = [];
  let aa = [1, -1, 6, -6];

  const [myPath, setMyPath] = useState([0]); //let myPath = [0]; ||setTheArray([...myPath, ]);
  const [board1, setBoard1] = useState([]);

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

  let host = "shosho@gmail.com";
  const roomID = "6PDrNy45f";
  const [QuestionModal, setQuestionModal] = useState();
  const [ExplorerModal, setExplorerModal] = useState();

  const [vote, setVote] = useState([]);
  const [vote2, setVote2] = useState([]);
  const [vote3, setVote3] = useState([]);
  const [vote4, setVote4] = useState([]);

  const [Player1Position, setPlayer1Position] = useState();
  const [Player2Position, setPlayer2Position] = useState();

  const [Player1ActiveState, setPlayer1ActiveState] = useState(true);
  const [Player2ActiveState, setPlayer2ActiveState] = useState(false);

  const [board, setBoard] = useState([]);
  const [Board__, setBoardــ] = useState([]);
  let xx;

  const user = authentication.currentUser;

  const [Players, setPlayers] = useState([{}, {}]);

  let ActivePlayer = [];
  const [board_db, setboard_db] = useState([]);

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setBoardــ(snapshot.data().Board)
      ),
    []
  );

  for (let index = 0; index < 36; index++) {
    if (Board__[index] == "p") {
      board1[index] = pessimist;
      pssIndexs.push(index);
    } else if (Board__[index] == "f") {
      board1[index] = fog;
      fogIndexs.push(index);
    } else if (Board__[index] == "t") {
      board1[index] = tape;
      tapeIndexs.push(index);
    }
  }
  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setQuestionModal(snapshot.data().QuestionModal)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setboard_db(snapshot.data().CurrentBoard)
      ),
    []
  );
  for (let index = 0; index < board_db.length; index++) {
    if (board_db[index] == "piss") {
      board[index] = pessimist;
    } else if (board_db[index] == "fog") {
      board[index] = fog;
    } else if (board_db[index] == "tape") {
      board[index] = tape;
    } else if (board_db[index] == "close") {
      board[index] = close;
    } else if (board_db[index] == "light") {
      board[index] = Light;
    } else if (board_db[index] == "den") {
      board[index] = den;
    } else {
      board[index] = "";
    }
  }

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setExplorerModal(snapshot.data().ExplorerModal)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setPoint(snapshot.data().Points)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setnumberOfTape(snapshot.data().NumberOftape)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setRoomNum(snapshot.data().currentPosition)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", roomID), (snapshot) =>
        setPlayers(snapshot.data().Players)
      ),
    []
  );

  if (Players != null) {
    Players.map((item) => {
      if (item.ActiveState == true) {
        ActivePlayer.push(item.Email);
      }
    });
  }

  useEffect(() => {
    if (QuestionModal == true && ExplorerModal == false) {
      //console.log("i'm here shosho ");
      getQuestion();
      ModalC("Question");
      setModalVisible(true);
    } else if (ExplorerModal == true && QuestionModal == false) {
      ModalC("Explorer");
      setModalVisible(true);
    } else if (QuestionModal == false && ExplorerModal == false) {
      setModalVisible(false);
    }
  }, [ExplorerModal, QuestionModal]);
  //---------------------------------------------------------------------joud Char
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
  let joudCharPlayer3 = [
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
  if (Players != undefined) {
    joudCharPlayer1[Players[0].Position] = (
      <Image
        source={require("./assets/player1.png")}
        style={{ width: 45, height: 45, resizeMode: "contain" }}
      />
    );

    joudCharPlayer2[Players[1].Position] = (
      <Image
        source={require("./assets/player2.png")}
        style={{ width: 45, height: 45, resizeMode: "contain" }}
      />
    );

    // joudCharPlayer3[Players[2].Position] = (
    //   <Image
    //     source={require("./assets/player2.png")}
    //     style={{ width: 45, height: 45, resizeMode: "contain" }}
    //   />
    // );
  }
  //---------------------------------------------------------------------numberOfTape
  let t; //chan
  if (numberOfTape == 3) t = Tape3;
  else if (numberOfTape == 2) t = Tape2;
  else if (numberOfTape == 1) t = Tape1;
  //---------------------------------------------------------------------Get Question
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
  //---------------------------------------------------------------------Update
  function Update(value, merge, DocToBeUpdated) {
    const Ref = doc(db, "Game", roomID);

    if (DocToBeUpdated == "None") {
      setDoc(Ref, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Room") {
      const myDoc = doc(Ref, "Votes", "Rooms");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          // alert(error.message)
        });
    } else if (DocToBeUpdated == "Explorer") {
      const myDoc = doc(Ref, "Votes", "Explorer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          //alert("Document Updated")
        })
        .catch((error) => {
          // alert(error.message)
        });
    } else if (DocToBeUpdated == "Answer") {
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
  //---------------------------------------------------------------------validate (RoomVote-AnswerVote-ExplorerVote)
  function validateRoomVote(value) {
    Update({ Room1: arrayRemove(user.email) }, true, "Room");
    Update({ Room2: arrayRemove(user.email) }, true, "Room");
    Update({ Room3: arrayRemove(user.email) }, true, "Room");
    Update({ Room4: arrayRemove(user.email) }, true, "Room");

    if (value == "Room1") {
      Update(
        {
          Room1: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value == "Room2") {
      Update(
        {
          Room2: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value == "Room3") {
      Update(
        {
          Room3: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value == "Room4") {
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

    if (value == "Choice1") {
      Update(
        {
          Choice1: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value == "Choice2") {
      Update(
        {
          Choice2: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value == "Choice3") {
      Update(
        {
          Choice3: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value == "Choice4") {
      Update(
        {
          Choice4: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    }
  }

  function validateExplorerVote(value) {
    Update({ Player1: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player2: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player3: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player4: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player5: arrayRemove(user.email) }, true, "Explorer");

    if (value == "Player1") {
      Update(
        {
          Player1: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player2") {
      Update(
        {
          Player2: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player3") {
      Update(
        {
          Player3: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player4") {
      Update(
        {
          Player4: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player5") {
      Update(
        {
          Player5: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    }
  }
  //---------------------------------------------------------------------Choess Next Room
  async function ChoessNextRoom(Next_Room) {
    console.log("in ChoessNextRoom");
    if (Next_Room != 0) {
      if (Next_Room == roomNum + 1) {
        //-----------------------------------------moveR
        if ((roomNum - 5) % 6 != 0) {
          validateRoomVote("Room2");
        }
      } else if (Next_Room == roomNum - 1) {
        //-----------------------------------------moveL
        if (roomNum % 6 != 0) {
          validateRoomVote("Room4");
        }
      } else if (Next_Room == roomNum - 6) {
        //-------------------------------------------moveUp
        if (roomNum > 5) {
          validateRoomVote("Room1");
        }
      } else if (Next_Room == roomNum + 6) {
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

      if (
        Player_room1.length +
          Player_room2.length +
          Player_room3.length +
          Player_room4.length ==
        ActivePlayer.length
      ) {
        MaxVotesOfNextRoom();

        // ModalC('Question');
        //  // setTimeout(()=> setModalVisible(true),20);
        //  if(user.email==host){

        await updateDoc(doc(db, "Game", roomID), {
          QuestionModal: true,
        });
        //  console.log("i'm  host -->", QuestionModal);
        // else{
        //  updateDoc(doc(db, "Game", roomID), {
        //   QuestionModal: true,
        // })}

        // moveRDLU();
      }
    }
  }
  //---------------------------------------------------------------------Choess Answer
  async function ChoessAnswer(FinalAnswer) {
    if (FinalAnswer == 0) {
      validateAnswerVote("Choice1");
    } else if (FinalAnswer == 1) {
      validateAnswerVote("Choice2");
    } else if (FinalAnswer == 2) {
      validateAnswerVote("Choice3");
    } else if (FinalAnswer == 3) {
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

    // console.log(ActivePlayer.length);

    if (
      Player_Answer1.length +
        Player_Answer2.length +
        Player_Answer3.length +
        Player_Answer4.length ==
      ActivePlayer.length
    ) {
      MaxVotesOfFinalAnswer(); //we need write then to preforn the methods in seq

      const docref = doc(db, "Game", roomID);
      await getDoc(docref).then((doc) => {
        finalAnswer = doc.get("FinalAnswer");
      });
      //  setFinalAnswer(2);
      //  console.log(finalAnswer, "----", correctAnswer);
      if (finalAnswer == correctAnswer) {
        //  setPoint(point+questionPoint);
        //  setTimeout(()=>  setModalVisible(false))
        // if (user.email == host) {

        if (Point != null) {
          await updateDoc(doc(db, "Game", roomID), {
            QuestionModal: false,
            Points: Point + questionPoint,
          });
        }

        for (let index = 0; index < board1.length; index++) {
          if (myPath.includes(index)) {
            board[index] = board1[index];
          }
        }
        //------------------------------ highlit adj room ------------------------------

        showPessimistOrFoggyWarnaing(positionOfNextRoom);
        if (fogIndexs.includes(roomNum)) {
          //   console.log(" go to move");
          Move("Explorer", -1);
        } else {
          Move("Players", -1);
        }

        // if (positionOfNextRoom == roomNum + 1) {
        //   //moveR
        //   if ((roomNum - 5) % 6 != 0) {
        //     setMyPath([...myPath, roomNum + 1]);
        //     for (let index = 0; index < aa.length; index++) {
        //       if (aa[index] != 1) {
        //         if (
        //           !myPath.includes(roomNum + aa[index]) &&
        //           !(roomNum + aa[index] === 35)
        //         ) {
        //           board[roomNum + aa[index]] = close;
        //         }
        //       }
        //     }
        //   }
        // } else if (positionOfNextRoom == roomNum - 1) {
        //   //moveL
        //   if (roomNum % 6 != 0) {

        //     setMyPath([...myPath, roomNum - 1]);
        //     for (let index = 0; index < aa.length; index++) {
        //       if (aa[index] != -1) {
        //         if (
        //           !myPath.includes(roomNum + aa[index]) &&
        //           !(roomNum + aa[index] === 35)
        //         ) {
        //           board[roomNum + aa[index]] = close;
        //         }
        //       }
        //     }
        //   }
        // } else if (positionOfNextRoom == roomNum - 6) {
        //   //moveUp
        //   if (roomNum > 5) {

        //     setMyPath([...myPath, roomNum - 6]);
        //     for (let index = 0; index < aa.length; index++) {
        //       if (aa[index] != -6) {
        //         if (
        //           !myPath.includes(roomNum + aa[index]) &&
        //           !(roomNum + aa[index] === 35)
        //         ) {
        //           board[roomNum + aa[index]] = close;
        //         }
        //       }
        //     }
        //   }
        // } else if (positionOfNextRoom == roomNum + 6) {
        //   //moveD
        //   if (roomNum < 30) {
        //     setMyPath([...myPath, roomNum + 6]);
        //     for (let index = 0; index < aa.length; index++) {
        //       if (aa[index] != 6) {
        //         if (
        //           !myPath.includes(roomNum + aa[index]) &&
        //           !(roomNum + aa[index] === 35)
        //         ) {
        //           board[roomNum + aa[index]] = close;
        //         }
        //       }
        //     }
        //   }
        // }
      } else if (finalAnswer != correctAnswer) {
        if (correctAnswer == 0) setStyleb1(styles.buttonc);
        if (correctAnswer == 1) setStyleb2(styles.buttonc);
        if (correctAnswer == 2) setStyleb3(styles.buttonc);
        if (correctAnswer == 3) setStyleb4(styles.buttonc);

        //setStyleb1(styles.button)setTimeout(() => setModalVisible(!isModalVisible), 4000);
        //setModalVisible(false);

        //  if(user.email==host){

        await updateDoc(doc(db, "Game", roomID), {
          QuestionModal: false,
        });

        // }else {
        //   updateDoc(doc(db, "Game", roomID), {
        //     QuestionModal: false,
        //   })
        // //   const questionModal = doc(db, 'Game', roomID)
        // //   getDoc(questionModal).then((doc) => {
        // //     setQuestionModal(doc.get('QuestionModal'));
        // // })
        //   Alert.alert('hello from wrong answear else read --> '+QuestionModal)
        // }

        if (numberOfTape == 1) {
          // endGame(2);
        } else {
          if (numberOfTape != null) {
            await updateDoc(doc(db, "Game", roomID), {
              NumberOftape: numberOfTape - 1,
            });
          }
        }
      }
    }
  }
  console.log("ActivePlayer" + ActivePlayer);
  //---------------------------------------------------------------------ModalC
  function ModalC(Type) {
    if (Type == "Explorer") {
      setModalContent(
        <View>
          <Text style={styles.textShowQ}>صوت للمستكشفة</Text>
          <View style={styles.showQbox}>
            {ActivePlayer.map((item) => (
              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb1}
                  onPress={() => {
                    Move("Vote Explorer", item);
                  }}
                >
                  <Text style={styles.text}>{item}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      );
    } else if (Type == "Question") {
      setModalContent(
        <View>
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
                  ChoessAnswer(0);
                }}
              >
                <Text style={styles.text}>{choices[0]}</Text>
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
                  ChoessAnswer(1);
                }}
              >
                <Text style={styles.text}>{choices[1]}</Text>
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
                  ChoessAnswer(2);
                }}
              >
                <Text style={styles.text}>{choices[2]}</Text>
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
                  ChoessAnswer(3);
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
    }
  };
  // const showPessimistWarnaing = (inc) => {
  //   if (pssIndexs.includes(inc)) {
  //     showMessage({
  //       message: "warning!!",
  //       type: "danger",
  //     });
  //     // endGame(1);
  //     // console.log("pissims room ", inc);
  //   }
  // };
  const showPessimistOrFoggyWarnaing = (inc) => {
    //  showPessimistWarnaing(inc);
    showFogWarnaing(inc);
  };
  //---------------------------------------------------------------------Max Votes Of (NextRoom-FinalAnswer-FinalExplorer)
  async function MaxVotesOfNextRoom() {
    let Max = Math.max(
      Player_room2.length,
      Player_room3.length,
      Player_room1.length,
      Player_room4.length
    );

    if (Max == Player_room1.length) {
      // console.log("room ---- ", roomNum, " ----");
      //  await updateDoc(doc(db, "Game", roomID), {
      //     currentPosition: roomNum - 6,
      // })}
      setPositionOfNextRoom(roomNum - 6);
    } else if (Max == Player_room2.length) {
      // console.log("room ---- ", roomNum, " ----");
      //  await updateDoc(doc(db, "Game", roomID), {
      //   currentPosition: roomNum + 1,
      // })}
      setPositionOfNextRoom(roomNum + 1);
    } else if (Max == Player_room3.length) {
      //   console.log("room ---- ", roomNum, " ----");
      //  await updateDoc(doc(db, "Game", roomID), {
      //   currentPosition: roomNum + 6,
      // })}
      setPositionOfNextRoom(roomNum + 6);
    } else if (Max == Player_room4.length) {
      //  console.log("room ---- ", roomNum, " ----");
      //  await updateDoc(doc(db, "Game", roomID), {
      //   currentPosition: roomNum -1,
      // })}
      setPositionOfNextRoom(roomNum - 1);
    }
  }

  async function MaxVotesOfFinalAnswer() {
    let Max = Math.max(
      Player_Answer1.length,
      Player_Answer2.length,
      Player_Answer3.length,
      Player_Answer4.length
    );
    if (Max == Player_Answer1.length) {
      // setFinalAnswer(0)

      await updateDoc(doc(db, "Game", roomID), {
        FinalAnswer: 0,
      });
    } else if (Max == Player_Answer2.length) {
      //setFinalAnswer(1)

      await updateDoc(doc(db, "Game", roomID), {
        FinalAnswer: 1,
      });
    } else if (Max == Player_Answer3.length) {
      //  setFinalAnswer(2)
      await updateDoc(doc(db, "Game", roomID), {
        FinalAnswer: 2,
      });
    } else if (Max == Player_Answer4.length) {
      //  setFinalAnswer(3)
      await updateDoc(doc(db, "Game", roomID), {
        FinalAnswer: 3,
      });
    }
  }

  async function MaxVotesOfFinalExplorer() {
    let Max = Math.max(
      Player_Explorer1.length,
      Player_Explorer2.length,
      Player_Explorer3.length,
      Player_Explorer4.length,
      Player_Explorer5.length
    );

    if (Max == Player_Explorer1.length) {
      await updateDoc(doc(db, "Game", roomID), {
        FinalExplorer: Players[0].Email,
      });
      // setFinalExplorer(Players.player1.Email)
    } else if (Max == Player_Explorer2.length) {
      await updateDoc(doc(db, "Game", roomID), {
        FinalExplorer: Players[1].Email,
      });
      // setFinalExplorer(Players.player2.Email)
    } else if (Max == Player_Explorer3.length) {
      await updateDoc(doc(db, "Game", roomID), {
        FinalExplorer: Players[2].Email,
      });
      // setFinalExplorer(Players.player2.Email)
    }
    // else if(Max==Player_Explorer3.length)
    // {setFinalExplorer(2)}
    // else if(Max==Player_Explorer4.length)
    // {setFinalExplorer(3)}
    // else if(Max==Player_Explorer5.length)
    // {setFinalExplorer(4)}
  }
  //---------------------------------------------------------------------Move
  async function Move(type, vote) {
    if (type == "Explorer") {
      //  setTimeout(()=>setModalVisible(true),1000);
      // if(user.email==host){
      //setExplorerModal(true)}
      ModalC("Explorer");
      await updateDoc(doc(db, "Game", roomID), {
        ExplorerModal: true,
      });
    } else if (type == "Players") {
      let cc = board_db;

      for (let i = 0; i < aa.length; i++) {
        if (
          myPath.includes(positionOfNextRoom + aa[i]) == false &&
          positionOfNextRoom + aa[i] !== 35
        ) {
          if (aa[i] == 1) {
            if ((positionOfNextRoom - (6 - 1)) % 6 != 0) {
              arrLight[i] = positionOfNextRoom + aa[i];
              cc[arrLight[i]] = "light";
            }
          }
          if (aa[i] == 6) {
            if (positionOfNextRoom < 6 * (6 - 1)) {
              arrLight[i] = positionOfNextRoom + aa[i];
              cc[arrLight[i]] = "light";
            }
          }
          if (aa[i] == -1) {
            if (positionOfNextRoom % 6 != 0) {
              arrLight[i] = positionOfNextRoom + aa[i];
              cc[arrLight[i]] = "light";
            }
          }
          if (aa[i] == -6) {
            if (positionOfNextRoom > 6 - 1) {
              arrLight[i] = positionOfNextRoom + aa[i];
              cc[arrLight[i]] = "light";
            }
          }
        }
      }
      // for (let index = 0; index < board.length; index++) {

      // }
      updateDoc(doc(db, "Game", roomID), {
        CurrentBoard: cc,
      });

      // setPlayer1Position(positionOfNextRoom);
      // setPlayer2Position(positionOfNextRoom);
      // setRoomNum(positionOfNextRoom);s
      //for (let index = 0; index < Players.length; index++) {//123 ,12,13,23,1,2,3
      if (ActivePlayer.length == 3) {
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[1].Email) &&
          ActivePlayer.includes(Players[2].Email)
        ) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });

          // else if(Players[index].Email==Players[2].Email){
          //   await updateDoc(doc(db, "Game", roomID), {
          //     Players: [
          //       {
          //         'Email': Players[0].Email,
          //         'Position':Players[0].Position,
          //         'ActiveState': Players[0].ActiveState
          //       },
          //        {
          //         'Email': Players[1].Email,
          //         'Position': Players[1].Position,
          //         'ActiveState':  Players[1].ActiveState,
          //       },
          //       {
          //         'Email': Players[2].Email,
          //         'Position':positionOfNextRoom ,
          //         'ActiveState':  Players[2].ActiveState,
          //       }
          //     ]
          //   })
          // }
        }
      } else if (ActivePlayer.length == 2) {
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[1].Email)
        ) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (
          ActivePlayer.includes(Players[1].Email) &&
          ActivePlayer.includes(Players[2].Email)
        ) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[2].Email)
        ) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
      } else if (ActivePlayer.length == 1) {
        if (ActivePlayer.includes(Players[0].Email)) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (ActivePlayer.includes(Players[1].Email)) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (ActivePlayer.includes(Players[2].Email)) {
          await updateDoc(doc(db, "Game", roomID), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
      }
      if (positionOfNextRoom == roomNum + 1) {
        //moveR
        if ((roomNum - 5) % 6 != 0) {
          setMyPath([...myPath, roomNum + 1]);
          for (let index = 0; index < aa.length; index++) {
            if (aa[index] != 1) {
              if (
                !myPath.includes(roomNum + aa[index]) &&
                !(roomNum + aa[index] === 35)
              ) {
                board[roomNum + aa[index]] = close;
              }
            }
          }
        }
      } else if (positionOfNextRoom == roomNum - 1) {
        //moveL
        if (roomNum % 6 != 0) {
          setMyPath([...myPath, roomNum - 1]);
          for (let index = 0; index < aa.length; index++) {
            if (aa[index] != -1) {
              if (
                !myPath.includes(roomNum + aa[index]) &&
                !(roomNum + aa[index] === 35)
              ) {
                board[roomNum + aa[index]] = close;
              }
            }
          }
        }
      } else if (positionOfNextRoom == roomNum - 6) {
        //moveUp
        if (roomNum > 5) {
          setMyPath([...myPath, roomNum - 6]);
          for (let index = 0; index < aa.length; index++) {
            if (aa[index] != -6) {
              if (
                !myPath.includes(roomNum + aa[index]) &&
                !(roomNum + aa[index] === 35)
              ) {
                board[roomNum + aa[index]] = close;
              }
            }
          }
        }
      } else if (positionOfNextRoom == roomNum + 6) {
        //moveD
        if (roomNum < 30) {
          setMyPath([...myPath, roomNum + 6]);
          for (let index = 0; index < aa.length; index++) {
            if (aa[index] != 6) {
              if (
                !myPath.includes(roomNum + aa[index]) &&
                !(roomNum + aa[index] === 35)
              ) {
                board[roomNum + aa[index]] = close;
              }
            }
          }
        }
      }
      cc = board_db;
      if (board1[positionOfNextRoom] == pessimist) {
        cc[positionOfNextRoom] = "piss";
      } else if (board1[positionOfNextRoom] == tape) {
        cc[positionOfNextRoom] = "tape";
      } else if (board1[positionOfNextRoom] == fog) {
        cc[positionOfNextRoom] = "fog";
      } else {
        cc[positionOfNextRoom] = "";
      }

      updateDoc(doc(db, "Game", roomID), {
        CurrentBoard: cc,
      });
      // den  light close  tape fog piss
      // board[positionOfNextRoom] = board1[positionOfNextRoom];
    } else if (type == "Vote Explorer") {
      if (vote == Players[0].Email) {
        validateExplorerVote("Player1");
      } else if (vote == Players[1].Email) {
        validateExplorerVote("Player2");
      } else if (vote == Players[2].Email) {
        validateExplorerVote("Player3");
      } else if (vote == 3) {
        validateExplorerVote("Player4");
      } else if (vote == 4) {
        validateExplorerVote("Player5");
      }

      const Ref = doc(db, "Game", roomID, "Votes", "Explorer");
      await getDoc(Ref)
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

      if (
        Player_Explorer1.length +
          Player_Explorer2.length +
          Player_Explorer3.length +
          Player_Explorer4.length +
          Player_Explorer5.length ===
        ActivePlayer.length
      ) {
        {
          await updateDoc(doc(db, "Game", roomID), {
            ExplorerModal: false,
          });

          MaxVotesOfFinalExplorer();

          const docref = doc(db, "Game", roomID);
          getDoc(docref).then((doc) => {
            finalExplorer = doc.get("FinalExplorer");
          });

          // Update({ "Player1": arrayRemove() }, true, 'Explorer');
          // Update({ "Player2": arrayRemove() }, true, 'Explorer');
          // Update({ "Player3": arrayRemove() }, true, 'Explorer');
          // Update({ "Player4": arrayRemove() }, true, 'Explorer');
          // Update({ "Player5": arrayRemove() }, true, 'Explorer');

          // console.log("final expolrer ", finalExplorer);

          //-----------------------------------------------Update explorer position

          for (let index = 0; index < ActivePlayer.length; index++) {
            if (finalExplorer === Players[0].Email) {
              await updateDoc(doc(db, "Game", roomID), {
                Players: [
                  {
                    Email: Players[0].Email,
                    Position: positionOfNextRoom,
                    ActiveState: Players[0].ActiveState,
                  },
                  {
                    Email: Players[1].Email,
                    Position: Players[1].Position,
                    ActiveState: Players[1].ActiveState,
                  },
                  {
                    Email: Players[2].Email,
                    Position: Players[2].Position,
                    ActiveState: Players[2].ActiveState,
                  },
                ],
              });
            } else if (finalExplorer === Players[1].Email) {
              await updateDoc(doc(db, "Game", roomID), {
                Players: [
                  {
                    Email: Players[0].Email,
                    Position: Players[0].Position,
                    ActiveState: Players[0].ActiveState,
                  },
                  {
                    Email: Players[1].Email,
                    Position: positionOfNextRoom,
                    ActiveState: Players[1].ActiveState,
                  },
                  {
                    Email: Players[2].Email,
                    Position: Players[2].Position,
                    ActiveState: Players[2].ActiveState,
                  },
                ],
              });
            } else if (finalExplorer === Players[2].Email) {
              await updateDoc(doc(db, "Game", roomID), {
                Players: [
                  {
                    Email: Players[0].Email,
                    Position: Players[0].Position,
                    ActiveState: Players[0].ActiveState,
                  },
                  {
                    Email: Players[1].Email,
                    Position: Players[1].Position,
                    ActiveState: Players[1].ActiveState,
                  },
                  {
                    Email: Players[2].Email,
                    Position: positionOfNextRoom,
                    ActiveState: Players[2].ActiveState,
                  },
                ],
              });
            }
          }

          setMyPath([...myPath, positionOfNextRoom]);
          board[positionOfNextRoom] = board1[positionOfNextRoom];
          //-----------------------------------------------
          //   console.log("passmis", pssIndexs);

          if (pssIndexs.includes(positionOfNextRoom)) {
            //-----------------------------------------------Update explorer state
            freeze();
          } else {
            //-----------------------------------------------Update activie players position
            for (let i = 0; i < aa.length; i++) {
              if (
                myPath.includes(positionOfNextRoom + aa[i]) == false &&
                positionOfNextRoom + aa[i] !== 35
              ) {
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
            if (ActivePlayer.length == 3) {
              await updateDoc(doc(db, "Game", roomID), {
                Players: [
                  {
                    Email: Players[0].Email,
                    Position: positionOfNextRoom,
                    ActiveState: Players[0].ActiveState,
                  },
                  {
                    Email: Players[1].Email,
                    Position: positionOfNextRoom,
                    ActiveState: Players[1].ActiveState,
                  },
                  {
                    Email: Players[2].Email,
                    Position: positionOfNextRoom,
                    ActiveState: Players[2].ActiveState,
                  },
                ],
                currentPosition: positionOfNextRoom,
              });
            } else if (ActivePlayer.length == 2) {
              if (
                ActivePlayer.includes(Players[0].Email) &&
                ActivePlayer.includes(Players[1].Email) &&
                ActivePlayer.includes(Players[2].Email) == false
              ) {
                await updateDoc(doc(db, "Game", roomID), {
                  Players: [
                    {
                      Email: Players[0].Email,
                      Position: positionOfNextRoom,
                      ActiveState: Players[0].ActiveState,
                    },
                    {
                      Email: Players[1].Email,
                      Position: positionOfNextRoom,
                      ActiveState: Players[1].ActiveState,
                    },
                    {
                      Email: Players[2].Email,
                      Position: Players[2].Position,
                      ActiveState: Players[2].ActiveState,
                    },
                  ],
                  currentPosition: positionOfNextRoom,
                });
              }
              if (
                ActivePlayer.includes(Players[1].Email) &&
                ActivePlayer.includes(Players[2].Email) &&
                ActivePlayer.includes(Players[0].Email) == false
              ) {
                await updateDoc(doc(db, "Game", roomID), {
                  Players: [
                    {
                      Email: Players[0].Email,
                      Position: Players[0].Position,
                      ActiveState: Players[0].ActiveState,
                    },
                    {
                      Email: Players[1].Email,
                      Position: positionOfNextRoom,
                      ActiveState: Players[1].ActiveState,
                    },
                    {
                      Email: Players[2].Email,
                      Position: positionOfNextRoom,
                      ActiveState: Players[2].ActiveState,
                    },
                  ],
                  currentPosition: positionOfNextRoom,
                });
              }
              if (
                ActivePlayer.includes(Players[0].Email) &&
                ActivePlayer.includes(Players[2].Email) &&
                ActivePlayer.includes(Players[1].Email) == false
              ) {
                await updateDoc(doc(db, "Game", roomID), {
                  Players: [
                    {
                      Email: Players[0].Email,
                      Position: positionOfNextRoom,
                      ActiveState: Players[0].ActiveState,
                    },
                    {
                      Email: Players[1].Email,
                      Position: Players[1].Position,
                      ActiveState: Players[1].ActiveState,
                    },
                    {
                      Email: Players[2].Email,
                      Position: positionOfNextRoom,
                      ActiveState: Players[2].ActiveState,
                    },
                  ],
                  currentPosition: positionOfNextRoom,
                });
              }
            }
            if (positionOfNextRoom == roomNum + 1) {
              //moveR
              if ((roomNum - 5) % 6 != 0) {
                for (let index = 0; index < aa.length; index++) {
                  if (aa[index] != 1) {
                    if (
                      !myPath.includes(roomNum + aa[index]) &&
                      !(roomNum + aa[index] === 35)
                    ) {
                      board[roomNum + aa[index]] = close;
                    }
                  }
                }
              }
            } else if (positionOfNextRoom == roomNum - 1) {
              //moveL
              if (roomNum % 6 != 0) {
                for (let index = 0; index < aa.length; index++) {
                  if (aa[index] != -1) {
                    if (
                      !myPath.includes(roomNum + aa[index]) &&
                      !(roomNum + aa[index] === 35)
                    ) {
                      board[roomNum + aa[index]] = close;
                    }
                  }
                }
              }
            } else if (positionOfNextRoom == roomNum - 6) {
              //moveUp
              if (roomNum > 5) {
                for (let index = 0; index < aa.length; index++) {
                  if (aa[index] != -6) {
                    if (
                      !myPath.includes(roomNum + aa[index]) &&
                      !(roomNum + aa[index] === 35)
                    ) {
                      board[roomNum + aa[index]] = close;
                    }
                  }
                }
              }
            } else if (positionOfNextRoom == roomNum + 6) {
              //moveD
              if (roomNum < 30) {
                for (let index = 0; index < aa.length; index++) {
                  if (aa[index] != 6) {
                    if (
                      !myPath.includes(roomNum + aa[index]) &&
                      !(roomNum + aa[index] === 35)
                    ) {
                      board[roomNum + aa[index]] = close;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  //---------------------------------------------------------------------End Game
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
  //---------------------------------------------------------------------Freeze
  const freeze = async () => {
    // console.log('explorer from freeze -->',PlayerExplorer)
    // console.log('player1 -->',Players.player1.Email)
    // console.log('player2 -->',Players.player2.Email)

    for (let index = 0; index < ActivePlayer.length; index++) {
      if (finalExplorer === Players[0].Email) {
        await updateDoc(doc(db, "Game", roomID), {
          Players: [
            {
              Email: Players[0].Email,
              Position: positionOfNextRoom,
              ActiveState: false,
            },
            {
              Email: Players[1].Email,
              Position: Players[1].Position,
              ActiveState: Players[1].ActiveState,
            },
            {
              Email: Players[2].Email,
              Position: Players[2].Position,
              ActiveState: Players[2].ActiveState,
            },
          ],
        });
      } else if (finalExplorer === Players[1].Email) {
        await updateDoc(doc(db, "Game", roomID), {
          Players: [
            {
              Email: Players[0].Email,
              Position: Players[0].Position,
              ActiveState: Players[0].ActiveState,
            },
            {
              Email: Players[1].Email,
              Position: positionOfNextRoom,
              ActiveState: false,
            },
            {
              Email: Players[2].Email,
              Position: Players[2].Position,
              ActiveState: Players[2].ActiveState,
            },
          ],
        });
      } else if (finalExplorer === Players[2].Email) {
        await updateDoc(doc(db, "Game", roomID), {
          Players: [
            {
              Email: Players[0].Email,
              Position: Players[0].Position,
              ActiveState: Players[0].ActiveState,
            },
            {
              Email: Players[1].Email,
              Position: Players[1].Position,
              ActiveState: Players[1].ActiveState,
            },
            {
              Email: Players[2].Email,
              Position: positionOfNextRoom,
              ActiveState: false,
            },
          ],
        });
      }
    }
  };
  //---------------------------------------------------------------------Return
  return (
    <MenuProvider>
      <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
        <View>
          <View style={styles.tapee}>{t}</View>
          <View style={styles.tt} opacity={0.6}>
            <Pressable
              onPress={() => {
                if (numberOfTape != 3 && Point >= 3) {
                  if (numberOfTape != null && Point != null) {
                    updateDoc(doc(db, "Game", roomID), {
                      NumberOftape: numberOfTape + 1,
                      Points: Point - 3,
                    });
                  }
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
                  ChoessNextRoom(35);
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
                    <Text>{joudCharPlayer3[35]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                    ChoessNextRoom(i);
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
                      <Text>{joudCharPlayer3[i]}</Text>
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
                  ChoessNextRoom(0);
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
                    <Text>{joudCharPlayer3[0]}</Text>
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

          {/* 
 <Modal
 isVisible={isModalVisible==2}
 animationInTiming={60}
 animationOutTiming={900}
 >
 <View style={styles.showQ}>
 <Text style={styles.textShowQ}>صوت للمستكشفة</Text>
 <View style={styles.showQbox}>
 <View style={styles.containerShowQ}>
 <Pressable
 style={styleb1}
 onPress={() => {
 Move("Vote Explorer",0)
 }}
 >
 <Text style={styles.text}>{Player[0]}</Text>
 </Pressable>
 </View>
 <View style={styles.containerShowQ}>
 <Pressable
 style={styleb2}
 onPress={() => {
 Move("Vote Explorer",1)
 }}
 >
 <Text style={styles.text}>{Player[1]}</Text>
 </Pressable>
 </View>
 </View>
 </View>
 </Modal>
 */}
        </View>
        <FlashMessage />
      </View>
    </MenuProvider>
  );
  //---------------------------------------------------------------------
}
