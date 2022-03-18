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
import { get } from "react-native/Libraries/Utilities/PixelRatio";

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
    top:50,
    width:20,
    height:20,
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
  const [Player, setPlayer] = useState([]);
  const [Player_room1, setPlayer_room1] = useState([]);
  const [Player_room2, setPlayer_room2] = useState([]);
  const [Player_room3, setPlayer_room3] = useState([]);
  const [Player_room4, setPlayer_room4] = useState([])
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
  const roomID = "iOI8lf7hW";

  const GamesRef = doc(db, "Game", roomID);


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

  function control(Next_Room){
  
   
    // setPositionOfNextRoom(Next_Room);
  
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
 if(Player_room2.length+Player_room3.length+Player_room1.length+Player_room4.length===Player.length)
  { 
    if(Player_room3.length>=Player_room2.length)
    {console.log(' hello shahad  <_>',Player_room3.length,Player_room2.length)
      setPositionOfNextRoom(roomNum + 6)}

   else {setPositionOfNextRoom(roomNum + 1)}
   
  console.log('Hi hh','hhdgu',positionOfNextRoom) 
  }
  else {Alert.alert('can not move to next room')}
}

  



function MaxVotesOfNextRoom()
{ let Max=Math.max(Player_room2.length,Player_room3.length,Player_room1.length,Player_room4.length);
  if(Max==Player_room1.length)
  {setPositionOfNextRoom(roomNum - 6)}
  else if(Max==Player_room2.length)
  {setPositionOfNextRoom(roomNum + 1)}
  else if(Max==Player_room3.length)
  {setPositionOfNextRoom(roomNum + 6)}
  else if(Max==Player_room4.length)
  {setPositionOfNextRoom(roomNum - 1)}
}



 //function

const Ref = doc(db, "Game", roomID,'Votes','Rooms');

  getDoc(Ref).then((doc)=> {
     setPlayer_room1(doc.get('Room1'));
     setPlayer_room2(doc.get('Room2'));
     setPlayer_room3(doc.get('Room3'));
     setPlayer_room4(doc.get('Room4')); })
    .catch((error) => {
      alert(error.message);
    });

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

function move(){

  if(Player_room2.length+Player_room3.length+Player_room1.length+Player_room4.length===Player.length)
  { 
    if(Player_room3.length>=Player_room2.length)
    {console.log(' hello shahad  <_>',Player_room3.length,Player_room2.length)
      setPositionOfNextRoom(roomNum + 6)}
  
   else {setPositionOfNextRoom(roomNum + 1)}
   
  console.log('Hi hh','hhdgu',positionOfNextRoom) 
  }
  else {Alert.alert('can not move to next room')}
}

useEffect(() => {
const docref=doc(db,'Game', roomID)

getDoc(docref).then((doc)=>{
setPlayer(doc.get('Player'))
});
}, []);
// Player.map((i)=>
// console.log(i));

// {Player_room2.map((i)=>
// console.log(i))}
// {Player_room3.map((i)=>
//   console.log(i))}


console.log(Player_room2.length+Player_room3.length+Player_room1.length+Player_room4.length+' hhhhhhhh '+positionOfNextRoom)






  joudChar[roomNum] = Player.map((data) => (
    <Image
    source={require("./assets/joud5.png")}
    style={{ width: 45, height: 45, resizeMode: "contain" }}
  />
));


  return (
    <View style={styles2.container}>

      <Button style={styles.buttonc} onPress={()=>{ move()  }} title="gh" > </Button>

      {/* {Player.map((data) => (
        <View key={data.id}>
          <Text style={styles2.mytext}> أهلاً بك {data.Room2} </Text>
        </View>
      ))} */}
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
                 // control(i);
                  move()
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
