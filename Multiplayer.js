import React, { useState ,useEffect ,useLayoutEffect} from 'react';
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
import Board from "/Users/shahadfehaidalqhatni/new/board.js";
import LossPessimist from "/Users/shahadfehaidalqhatni/new/piss.js";
// import LossTape from "/Users/shahadfehaidalqhatni/s/src/Screens/Game/Single_player/LossTape.js";
import Modal from "react-native-modal";
import { db ,authentication } from "/Users/shahadfehaidalqhatni/new/firbase.js";
import { collection, doc, setDoc ,getDocs,onSnapshot,query,querySnapshot,where,arrayUnion,arrayRemove,getDoc, addDoc } from "firebase/firestore";
import Win from "/Users/shahadfehaidalqhatni/new/win.js"; //position:"absolute",
import { useRoute } from '@react-navigation/native';

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
        source={require("/Users/shahadfehaidalqhatni/new/assets/foggy.png")}
        style={{ width: 45, height: 45, resizeMode: "contain" }}
      />
    </View>
  );
  
  export const tape = (
    <View style={{ top: 25, right: 5 }}>
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
    </View>
  );
  
  export const pessimist = (
    <View style={{ top: 25, right: 5 }}>
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/pessimist.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
    </View>
  );
  
  const close = (
    <ImageBackground
      source={require("/Users/shahadfehaidalqhatni/new/assets/Assetcc.png")}
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
      source={require("/Users/shahadfehaidalqhatni/new/assets/Assetcc.png")}
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
        source={require("/Users/shahadfehaidalqhatni/new/assets/highlight.png")}
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
      source={require("/Users/shahadfehaidalqhatni/new/assets/deanship.png")}
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
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
    </View>
  );
  
  const Tape3 = (
    <View style={styles.pointtbox}>
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
    </View>
  );
  
  const Tape1 = (
    <View style={styles.pointtbox}>
      <Image
        source={require("/Users/shahadfehaidalqhatni/new/assets/tape.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />
    </View>
  );
  
  const sta = " ";



export default function Game({ navigation }) {
    const route = useRoute();
    const [isModalVisible, setModalVisible] = useState(false); //
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
    const [point, setpoint] = useState(0);
    const [Player, setPlayer] = useState([]);
    const [choices, setChoices] = useState([  
    { label: "" },
    { label: "" },
    { label: "" },
    { label: "" },]);
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
    const [Player_room1, setPlayer_room1] = useState([]);
    const [Player_room2, setPlayer_room2] = useState([]);
    const [Player_room3, setPlayer_room3] = useState([]);
    const [Player_room4, setPlayer_room4] = useState([]);

    // const [board, setBoard] = useState([
    //   sta,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   close,
    //   den,
    // ]);
    
    let xx;
    useEffect(() => {
      xx = Board();
      setBoard(xx.Board);
      setPssIndexs(xx.PssIndexs);
      setFogIndexs(xx.FogIndexs);
      setTapeIndexs(xx.TapeIndexs);
    }, []);
    const user = authentication.currentUser;

    let Players={
      player1:{
        Email:'m@gmail.com',
        ActiveState:true,
        Position:0,
      },
      player2:{
        Email:'sh6@gmail.com',
        ActiveState:true,
        Position:0,
      }
    }

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

    const roomID = 'DHvvsKI45'

  const getQuestion = async () => {
    const QuestionCol = collection(db, "QuestionsInfo");
    const QuestionSnapshot = await getDocs(QuestionCol);
    const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
    let qac = QuestionList[Math.floor(Math.random() * QuestionList.length)];
    setQuestion(qac.Questionis);
    setQuestionType(qac.Type);
    setQuestionPoint(qac.Point);
    setChoices(qac.Choices);
    // setQuestionLevel(qac.QuestionLevel);
    setCorrectAnswer(qac.Answer);
    setVisibility(true)
    // if (questionLevel1.includes(positionOfNextRoom) && questionLevel != 1)
    //     getQuestion();
    // setQuestion("hhhhhhhhhhhhhhhhhhhhh");
    // setQuestionType("إختيار من متعدد");
    // setQuestionPoint(5);
    // setChoices(["h", "l", "k", "m"]);
    // setQuestionLevel(1);
    // setCorrectAnswer(2);
  
  };

 function Update (value, merge,DocToBeUpdated){
  const Ref = doc(db, "Game",roomID);
  
  if(DocToBeUpdated=='None'){
      setDoc(Ref,value,{merge:merge})
      .then(() => {
        alert("Document Updated")
      })
      .catch((error) => {
        alert(error.message)
      })}
      else if(DocToBeUpdated=='Room'){
            const myDoc = doc(Ref,"Votes","Rooms");
            setDoc(myDoc,value,{merge:merge})
          .then(() => {
            alert("Document Updated")
          })
          .catch((error) => {
            alert(error.message)
          })
      }

      else if(DocToBeUpdated=="Explorer"){
        const myDoc = doc(Ref,"Votes","Explorer");
        setDoc(myDoc,value,{merge:merge})
      .then(() => {
        alert("Document Updated")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  else if(DocToBeUpdated=="Answer"){
    const myDoc = doc(Ref,"Votes","Answer");
    setDoc(myDoc,value,{merge:merge})
  .then(() => {
    alert("Document Updated")
  })
  .catch((error) => {
    alert(error.message)
  })
}

}
   


useLayoutEffect(() => {
  const collectionRef = collection(db,'Game',roomID,'Votes');
  //const collectionRef = doc(db,'Game',roomID);
  const q = query(collectionRef, where('Room2', 'array-contains',user.email)
  );
  
   const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPlayer(
          querySnapshot.docs.map(doc => ({
            Room2:doc.data().Room2,
      }))
      );
   }
   );
   return () => unsubscribe
 },
 []);

 function validateRoomVote(value){

  Update({"Room1":arrayRemove(user.email)},true,'Room');
  Update({"Room2":arrayRemove(user.email)},true,'Room');
  Update({"Room3":arrayRemove(user.email)},true,'Room');
  Update({"Room4":arrayRemove(user.email)},true,'Room');
  
  if(value=="Room1")
    {
      Update({
        "Room1":arrayUnion(user.email)
      },true,'Room')
    }
  else if(value=="Room2")
    {
      Update({
        "Room2":arrayUnion(user.email)
      },true,'Room')
    }
    else if(value=="Room3")
    {
      Update({
        "Room3":arrayUnion(user.email)
      },true,'Room')
    }
    else if(value=="Room4")
    {
      Update({
        "Room4":arrayUnion(user.email)
      },true,'Room')
    }
}

async function validateAnswerVote(value){
  

  Update({"Choice1":arrayRemove(user.email)},true,'Answer');
  Update({"Choice2":arrayRemove(user.email)},true,'Answer');
  Update({"Choice3":arrayRemove(user.email)},true,'Answer');
  Update({"Choice4":arrayRemove(user.email)},true,'Answer');
  
  if(value=="Choice1")
    {
      Update({
        "Choice1":arrayUnion(user.email)
      },true,'Answer')
    }
  else if(value=="Choice2")
    {
      Update({
        "Choice2":arrayUnion(user.email)
      },true,'Answer')
    }
    else if(value=="Choice3")
    {
      Update({
        "Choice3":arrayUnion(user.email)
      },true,'Answer')
    }
    else if(value=="Choice4")
    {
      Update({
        "Choice4":arrayUnion(user.email)
      },true,'Answer')
    }

  // checkFinalAnswer().then(res=>{
  //   console.log('try tt')
  // })
    // correctaswer()
    //Alert.alert(vote[0])

// var promise = new Promise((resolve , reject) => {
//   // call resolve if the method succeeds
//   checkFinalAnswer()
//   resolve(true);
//  })
//  promise.then(bool => correctaswer())

checkFinalAnswer()
}
function checkFinalAnswer(){
  
  // const AnswersVotes = doc(db, "Game",roomID,"Votes","Answer");
  // Alert.alert("in")
  // const AnswerSnapshot = getDoc(AnswersVotes);
  
  // setVotes(
    
  //   AnswerSnapshot.doc.map(doc => ({
  //     Choice1:doc.data.Choice1,
  //     Choice2:doc.data.Choice2,
  //     Choice3:doc.data.Choice3,
  //     Choice4:doc.data.Choice4,
  // })))
  // Alert.alert(votes.Choice1.length)

  //............
  const Ref = doc(db, 'Game', roomID,'Votes','Answer');
   getDoc(Ref).then((doc)=> {
    Alert.alert("in")
     setVote(doc.get('Choice1'));
     setVote2(doc.get('Choice2'));
     setVote3(doc.get('Choice3'));
     setVote4(doc.get('Choice4')); })
    .catch((error) => {
      alert(error.message);
    });
    setVisibility(false)

const ef = doc(db, 'Game', roomID);
getDoc(ef).then((doc)=> {
    setActivePlayers(doc.get('ActivePlayer')) 
  });
  //let votesList = AnswerVotesList[Math.floor(Math.random() * AnswerVotesList.length)];
  // console.log('Q1',vote.length,'Q2',vote2.length,'Q3',vote3.length,'Q4',vote4.length) 
correctaswer();
}


function correctaswer()
{
  if(vote.length>vote2.length && vote.length>vote3.length && vote.length>vote4.length ){  
      setFinalAnswer(choices[0])
      console.log('hi choice 1')
    }
  
  else if(vote2.length>vote.length && vote2.length>vote3.length && vote2.length>vote4.length){
      setFinalAnswer(choices[1])
      console.log('hi choice 2') 
    }
  
  else if(vote3.length>vote.length && vote3.length>vote2.length && vote3.length>vote4.length){
      setFinalAnswer(choices[2]) 
      console.log('hi choice 3')
    }
  
  else if(vote4.length>vote.length && vote4.length>vote2.length && vote4.length>vote3.length){
      setFinalAnswer(choices[3])
      console.log('hi choice 4')
    }
  
   else {console.log('vote agine')}

  console.log('active player',ActivePlayers.length)
  console.log(choices)
  console.log(finalAnswer,'------',correctAnswer)
  if(finalAnswer == correctAnswer)
 { console.log('yor answer is correct')}
else {
  console.log('yor answer is not correct')}
}



  function control(Next_Room,FinalAnswer){
  
   console.log('in control method ')
    // setPositionOfNextRoom(Next_Room);
  if(Next_Room!=0)
  {
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

   Vote();

 if(Player_room1.length+Player_room2.length+Player_room3.length+Player_room1.length===Player.length)
  { 
    MaxVotesOfNextRoom();
    setRoomNum(positionOfNextRoom);
    // moveRDLU();
    Alert.alert('move to next room');
  }
  else {Alert.alert('can not move to next room')}}
//delete if 
  if (finalAnswer == -1) {
    setModalVisible(!isModalVisible);

  } else if (finalAnswer == correctAnswer) {
    setPoint(Point + questionPoint);
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

    for (let index = 0; index < board1.length; index++) {
      if (myPath.includes(index)) {
        board[index] = board1[index];
      }
    }
    //////////////////////////////////////////
    moveRDLU();
 
    arrLight = null;
    
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
   
    if (questionType === "إختيار من متعدد") {
      setTimeout(() => setModalVisible(!isModalVisible), 1000);
    } else if (questionType === "صح وخطأ") {
      setTimeout(() => setModalVisible2(!isModalVisible), 1000);
    }
    if (numberOfTape === 1) {
      endGame(2);
    } else {
      setnumberOfTape(numberOfTape - 1);
      displayQuestion(0, -1);
    }
  }
setTimeout(() => setStyleb1(styles.button), 1000);
setTimeout(() => setStyleb2(styles.button), 1000);
setTimeout(() => setStyleb3(styles.button), 1000);
setTimeout(() => setStyleb4(styles.button), 1000);
}

function Vote() {

  const Ref = doc(db, "Game", roomID,'Votes','Rooms');
  getDoc(Ref).then((doc)=> {
     setPlayer_room1(doc.get('Room1'));
     setPlayer_room2(doc.get('Room2'));
     setPlayer_room3(doc.get('Room3'));
     setPlayer_room4(doc.get('Room4')); 
  }).catch((error) => {
      alert(error.message);
    });

}

const docref=doc(db,'Game', roomID)
getDoc(docref).then((doc)=>{
setPlayer(doc.get('ActivePlayer'))
});
joudChar[roomNum] = Player.map((data) => (
      <Image
      source={require("/Users/shahadfehaidalqhatni/new/assets/Joud2.png")}
      style={{ width: 45, height: 45, resizeMode: "contain" }}
    />
  ));

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
                  source={require("/Users/shahadfehaidalqhatni/new/assets/deanship.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                      console.log('inside press')
                      control(i,0)
             
                    }
                  }}
                >
                  <ImageBackground
                    source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                  source={require("/Users/shahadfehaidalqhatni/new/assets/roomm.png")}
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
                      control(nexRoomNum, 0);
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
                      control(nexRoomNum, 1);
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
                      control(nexRoomNum, 2);
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
                      control(nexRoomNum, 3);
                    }}
                  >
                    <Text style={styles.text}>{choices[3].label}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        </View> 
      );
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

function Joud () {}

