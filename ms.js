import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AppRegistry,
  Alert,
  Pressable,
  Button,
  ImageBackground,
  Image,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { db } from "./Firebase/firebase";
import { authentication } from "./Firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  querySnapshot,
  where,
  arrayUnion,
  getDoc,
  addDoc,
} from "firebase/firestore";
import shortid from "shortid";
import Board from "./board";
// import GameSession from './gametest';
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
      source={require("./assets/fog.png")}
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
    source={require("./assets/Assetden.png")}
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
  <View style={styles.containerShowQ}>
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
  <View style={styles.containerShowQ}>
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
  <View style={styles.containerShowQ}>
    <Image
      source={require("./assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const sta = " ";
export default function Game({ route, navigation, Component }) {
  
  const [isModalVisible, setModalVisible] = useState(false); //
  const [isModalVisible2, setModalVisible2] = useState(false); //
  const [isLossPessimist, setLossPessimist] = useState(false);
  const [isLossTape, setLossTape] = useState(false);
  const [isWin, setWin] = useState(false);
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
  const [board, setBoard] = useState([]);
  const [pssIndexs, setPssIndexs] = useState([]);
  const [fogIndexs, setFogIndexs] = useState([]);
  const [tapeIndexs, setTapeIndexs] = useState([]);
  const [styleb1, setStyleb1] = useState(styles.button);
  const [styleb2, setStyleb2] = useState(styles.button);
  const [styleb3, setStyleb3] = useState(styles.button);
  const [styleb4, setStyleb4] = useState(styles.button);
  const [board1, setBoard1] = useState([
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
    setBoard(xx.Board);
    setPssIndexs(xx.PssIndexs);
    setFogIndexs(xx.FogIndexs);
    setTapeIndexs(xx.TapeIndexs);
  }, []);
  // ------------------------update
  const [Gamesession, setGamesession] = useState([]);

  function Update(value, merge, DocToBeUpdated) {
    const Ref = doc(db, "Game", roomID);

    if (DocToBeUpdated == "None") {
      setDoc(Ref, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Room") {
      const myDoc = doc(Ref, "Votes", "Rooms");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Explorer") {
      const myDoc = doc(Ref, "Votes", "Explorer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Answer") {
      const myDoc = doc(Ref, "Votes", "Answer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  //-----------------------------end update

  const user = authentication.currentUser;
  // const { roomID } = route.params;
  const roomID = "nZNuWob2U";

  const GamesRef = doc(db, "Game", roomID);
  // function room_ID (){
  //   let room_id = shortid.generate();
  // return room_id;
  // }
  // let roomid =room_ID();

  //---------W

  //const VoteRef = collection(GamesRef,"Votes")
  // setDoc(GamesRef, {
  //     ActivePlayer: ['','','','',''], currentPosition:"00", GameStatus: "waiting",
  //     NOD: 3, VoteAnswer: [0,0,0,0],
  //     VoteExplorer: [0,0,0,0,0] , VoteRoom: [0,0,0,0],
  //   Player:['','','','',''],scores:0 , RoomID:roomid,SessionType:''}
  //   );
  //   setDoc(doc(GamesRef,"Votes","Rooms"),{
  //       Room1: [],
  //       Room2: [],
  //       Room3: [],
  //       Room4: [],

  //   })
  //   setDoc(doc(GamesRef,"Votes","Explorer"),{
  //     Player1: [],
  //     Player2: [],
  //     Player3: [],
  //     Player4: [],
  //     Player5: [],

  // })
  // setDoc(doc(GamesRef,"Votes","Answer"),{
  //     Choice1: [],
  //     Choice2: [],
  //     Choice3: [],
  //     Choice4: [],
  //     Choice5: [],

  // })

  //-----------R

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

  function validateAnswerVote(value) {
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

  //Votes
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

  const [Player, setPlayer] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, "Game", roomID, "Votes");
    //const collectionRef = doc(db,'Game',roomID);
    const q = query(
      collectionRef,
      where("Room2", "array-contains", user.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPlayer(
        querySnapshot.docs.map((doc) => ({
          Room2: doc.data().Room2,
        }))
      );
    });
    return () => unsubscribe;
  }, []);

  // useLayoutEffect(() => {
  //  const collectionRef = collection(db,'Game');
  //  const q = query(collectionRef, where('RoomID', '==',roomID));
  //  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //      setPlayer(
  //          querySnapshot.docs.map(doc => ({
  //            currentPosition:doc.data().currentPosition,
  //      }))
  //      );
  //   });
  //   return () => unsubscribe
  // },
  // []);

  //      const [Player, setPlayer] = useState([]);
  //    useLayoutEffect(() => {
  //     const collectionRef = collection(db,'Game');
  //     const q = query(collectionRef, where('RoomID', '==',roomID));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {

  //         setPlayer(
  //             querySnapshot.docs.map(doc => ({

  //               scores:doc.data().scores,

  //         }))
  //         );
  //      });
  //      return () => unsubscribe
  // },
  // []);

  // const validateVote = () => {

  // const docRef = doc(db,'Game',roomID,'Votes','Rooms');
  // const docSnap =  getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  // if (data.Room2){

  // }
  // }

  function Update(value, merge, DocToBeUpdated) {
    const Ref = doc(db, "Game", roomID);

    if (DocToBeUpdated == "None") {
      setDoc(Ref, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Room") {
      const myDoc = doc(Ref, "Votes", "Rooms");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Explorer") {
      const myDoc = doc(Ref, "Votes", "Explorer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Answer") {
      const myDoc = doc(Ref, "Votes", "Answer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          alert("Document Updated");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  // useEffect(
  //   () =>
  //     onSnapshot(doc(db,'Game',roomID,'Votes','Rooms'), where('Room2', 'array-contains','h'),(snapshot) =>
  //       setGamesession(snapshot.docs.map((doc) => ({ ...doc.data()})))
  //     ),

  //   []
  // );

  let count = 0;

  var currentPosition = [0, 0];
  var currentPlayer = 1;
  var gameState = [
    ["C", "F", "P", "F", "S", "S"],
    ["F", "S", "F", "F", "S", "S"],
    ["P", "F", "F", "P", "F", "S"],
    ["F", "S", "F", "F", "S", "S"],
    ["S", "F", "P", "F", "S", "S"],
    ["S", "S", "F", "S", "S", "D"],
  ];

  const initializaGame = () => {
    gameState = [
      ["C", "F", "P", "F", "S", "S"],
      ["F", "S", "F", "F", "S", "S"],
      ["P", "F", "F", "P", "F", "S"],
      ["F", "S", "F", "F", "S", "S"],
      ["S", "F", "P", "F", "S", "S"],
      ["S", "S", "F", "S", "S", "D"],
    ];
    currentPosition = [0, 0];
    currentPlayer = 1;
  };
  const createBoard = () => {
    var Rows = [1, -1];
    var Cols = [6, -6];
    var currentRow = 0;
    var currentCols = 0;
    var gameBoard = [
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    while ((currentRow != 5) & (currentCols != 5)) {
      var randomRow = Rows[Math.floor(Math.random() * Rows.length)];
      var randomCols = Cols[Math.floor(Math.random() * Cols.length)];
      currentRow += randomRow;
      currentCols += randomRow;
      gameBoard[currentRow][currentCols] = 1;
    }
  };

  const getWinner = (row, col) => {
    if (gameState[row][col] == "F") {
      Alert.alert("Be careful!! \n A pessimist is nearby! ");
    } else if (gameState[row][col] == "P") {
      Alert.alert("Oops!\n You Entered a pessimist Room :(");
      initializaGame();
    }
  };

  const onTilePress = (row, col) => {
    //   const docRef =  setDoc(doc(db, 'Game','kkkkk'), {
    //     Player: [],
    //    RoomID: '',
    //  ActivePlayer:[],
    //   GameStatus:'waiting',
    //      NOD:4,
    //   currentPosition:'01',
    //   });
    // const ref = doc(db, 'Game').withConverter(GameSession.gameSessionConverter);
    //  setDoc(ref, new GameSession("1234",'fa', [],'waiting',4,'01'));

    if (
      ((currentPosition[0] == row) &
        ((currentPosition[1] + 1 == col) | (currentPosition[1] - 1 == col))) |
      (((currentPosition[0] + 1 == row) | (currentPosition[0] - 1 == row)) &
        (currentPosition[1] == col))
    ) {
      if ((currentPosition[0] - 1 == row) & (currentPosition[1] == col)) {
        Update(
          {
            Room1: arrayUnion(user.email),
          },
          true,
          "Room"
        );
      }
      if ((currentPosition[0] == row) & (currentPosition[1] + 1 == col)) {
        Update(
          {
            Room2: arrayUnion(user.email),
          },
          true,
          "Room"
        );
      }
      if ((currentPosition[0] + 1 == row) & (currentPosition[1] == col)) {
        Update(
          {
            Room3: arrayUnion(user.email),
          },
          true,
          "Room"
        );
      }
      if ((currentPosition[0] == row) & (currentPosition[1] - 1 == col)) {
        Update(
          {
            Room4: arrayUnion(user.email),
          },
          true,
          "Room"
        );
      }

      if (gameState[row][col] == "P") {
        Alert.alert("Oops!\n You Entered a pessimist Room :(");
        initializaGame();
      } else if (gameState[row][col] == "D") {
        Alert.alert("You Won !!");
        initializaGame();
      } else if (gameState[row][col] == "F") {
        Alert.alert("Be careful!! \n A pessimist is nearby! ");
      }

      var arr = gameState.slice();
      var CP = [row, col];
      arr[currentPosition[0]][currentPosition[1]];
      arr[row][col] = "C";
      gameState = arr;
      currentPosition = CP;
      Update(
        {
          currentPosition: currentPosition[0] + "" + currentPosition[1],
        },
        true,
        "None"
      );
      Update(
        {
          currentPosition:
            currentPosition[0].toString + currentPosition[1].toString,
        },
        true,
        "No"
      );
      renderIcon(row, col);
    }

    const VoteForRoom = (row, col) => {};
  };
  const renderIcon = (row, col) => {
    var value = gameState[row][col];
    switch (value) {
      case "F":
        return <Icon name="triangle" style={styles.tileF} />;
      case "S":
        return <Icon name="circle-outline" style={styles.tileO} />;
      case "P":
        return <Icon name="close" style={styles.tileX} />;
      case "C":
        return <Icon name="anchor" style={styles.tileC} />;
      default:
        return <View />;
    }
  };
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
  joudChar[roomNum] = Player.map((data) => (
    <Image
    source={require("./assets/joud5.png")}
    style={{ width: 45, height: 45, resizeMode: "contain" }}
  />
));
  // Player.map((data) => (
  //     <Image
  //     source={require("./assets/joud5.png")}
  //     style={{ width: 45, height: 45, resizeMode: "contain" }}
  //   />
  // ))

  //return class extends React.Component {

  // render() {

  //              <Text style={styles.mytext}>  أهلاً بك {data.scores} </Text>

  return (
    <View style={styles2.container}>
      {Player.map((data) => (
        <View key={data.id}>
          <Text style={styles2.mytext}> أهلاً بك {data.Room2} </Text>
        </View>
      ))}
      <View style={styles.box}>
        <View style={styles.container}>
          <Pressable
            key={35}
            onPress={() => {
              {
                // displayQuestion(35, -1);
              }
            }}
          >
            <ImageBackground
              source={require("./assets/Assetden.png")}
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                  // displayQuestion(i, -1);
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
                // displayQuestion(0, -1);
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
                  <Text>{joudChar[0]}</Text>
                </View>
                <Text>{board[0]}</Text>
              </ImageBackground>
            </ImageBackground>
          </Pressable>
        </View>
      </View>
      {/* <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(0,0)
      }  style={styles.tile}>
          
          {renderIcon(0,0)//Update({"Player":arrayUnion(user.email)},true,'No') مكانها كان بدال اون تايل بريس
          }
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(0,1)} style={styles.tile} >
        {renderIcon(0,1)}
        
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(0,2)} style={styles.tile}>
        {renderIcon(0,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,3)} style={styles.tile}>
          {renderIcon(0,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,4)} style={styles.tile}>
        {renderIcon(0,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,5)} style={styles.tile}>
        {renderIcon(0,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(1,0)} style={styles.tile}>
      {renderIcon(1,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(1,1)} style={styles.tile} >
        {renderIcon(1,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(1,2)} style={styles.tile}>
        {renderIcon(1,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,3)} style={styles.tile}>
        {renderIcon(1,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,4)} style={styles.tile}>
        {renderIcon(1,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,5)} style={styles.tile}>
        {renderIcon(1,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(2,0)} style={styles.tile}>
          {renderIcon(2,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(2,1)} style={styles.tile} >
        {renderIcon(2,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(2,2)} style={styles.tile}>
        {renderIcon(2,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,3)} style={styles.tile}>
        {renderIcon(2,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,4)} style={styles.tile}>
        {renderIcon(2,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,5)} style={styles.tile}>
        {renderIcon(2,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(3,0)} style={styles.tile}>
          {renderIcon(3,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(3,1)} style={styles.tile} >
        {renderIcon(3,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(3,2)} style={styles.tile}>
        {renderIcon(3,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,3)} style={styles.tile}>
        {renderIcon(3,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,4)} style={styles.tile}>
        {renderIcon(3,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,5)} style={styles.tile}>
        {renderIcon(3,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(4,0)} style={styles.tile}>
          {renderIcon(4,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(4,1)} style={styles.tile} >
        {renderIcon(4,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(4,2)} style={styles.tile}>
        {renderIcon(4,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,3)} style={styles.tile}>
        {renderIcon(4,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,4)} style={styles.tile}>
        {renderIcon(4,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,5)} style={styles.tile}>
        {renderIcon(4,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(5,0)} style={styles.tile}>
          {renderIcon(5,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(5,1)} style={styles.tile} >
        {renderIcon(5,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(5,2)} style={styles.tile}>
        {renderIcon(5,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,3)} style={styles.tile}>
        {renderIcon(5,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,4)} style={styles.tile}>
        {renderIcon(5,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,5)} style={styles.tile}>
        {renderIcon(5,5)}
          </TouchableOpacity>
      </View> */}
    </View>
  );
  //}
  //}
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    bottom: 60,
  },
  tile: {
    borderWidth: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tileX: {
    color: "red",
    fontSize: 30,
  },
  tileO: {
    color: "green",
    fontSize: 30,
  },
  tileF: {
    color: "grey",
    fontSize: 30,
  },
  tileC: {
    color: "blue",
    fontSize: 30,
  },
});

