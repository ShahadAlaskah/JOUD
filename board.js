import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { fog, tape, pessimist, den } from "../screens/SinglePlayerMode";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import StartUp from "./StartUp";

export default function Board() {
  let n = 6;
  let DeanshipPosition = n * n - 1; // 35
  let Position = 0;
  let safe = <Text> </Text>;
  let sta = <Text> start </Text>;
  let end = <Text> end </Text>;
  let RoomType = [safe, pessimist];
  let Room;
  let SavePath = [Position];
  let NumberOfPessimist = 9;
  let NumberOfTape = 3;
  let fourQuarters = {
    Q1: [2, 7, 8, 12, 13, 14],
    Q2: [3, 4, 5, 9, 10, 11, 15, 16, 17],
    Q3: [18, 19, 20, 24, 25, 26, 30, 31, 32],
    Q4: [21, 22, 23, 27, 28, 29, 33, 34],
  };
  let pssIndexs = [];
  let fogIndexs = [];
  let tapeIndexs = [];
  let board = [];
  //---------------------------------------------------------
  const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  const RandomSavePath = () => {
    let RandomIncrement = [1, 6]; //[1,6,-6,-1];
    let Increment;

    while (SavePath[SavePath.length - 1] != DeanshipPosition) {
      Increment = getRandomElement(RandomIncrement);

      if (Increment === 1 && (Position - (n - 1)) % n != 0) {
        // Right +1
        Position = Position + Increment;
        if (SavePath.includes(Position)) {
          continue;
        }
        SavePath.push(Position);
      } else if (Increment === 6 && Position < n * (n - 1)) {
        // Up +6
        Position = Position + Increment;
        if (SavePath.includes(Position)) {
          continue;
        }
        SavePath.push(Position);
      }
      // else if ((Increment === -1) && ((Position)%n != 0)) { // Left -1
      //      Position = Position + Increment;
      //      if(SavePath.includes(Position)){continue;}
      //      SavePath.push(Position);
      // }
      // else if ((Increment === -6) && (Position > n-1)) { // Down -6
      //      Position = Position + Increment;
      //      if(SavePath.includes(Position)){continue;}
      //      SavePath.push(Position);
      // }
    }
    return SavePath;
  };
  //--------------------------------------------------------------
  let savePath = RandomSavePath();
  //--------------------------------------------------------------
  const InitializeBoard = () => {
    let r = 1;

    while (r < DeanshipPosition) {
      Room = getRandomElement(RoomType);
      if (board[r] == null) {
        if (Room === pessimist && (savePath.includes(r) || r == 1 || r == 6)) {
          continue;
        } //|| (r == 1) || (r == 6)
        else if (Room === pessimist && NumberOfPessimist != 0) {
          pssIndexs.push(r);
          board[r] = Room;
          if ((r - (n - 1)) % n != 0) {
            board[r + 1] = fog;
            fogIndexs.push(r + 1);
          }

          if (r < n * (n - 1)) {
            board[r + 6] = fog;
            fogIndexs.push(r + 6);
          }

          if (r % n != 0) {
            board[r - 1] = fog;
            fogIndexs.push(r - 1);
          }

          if (r > n - 1) {
            board[r - 6] = fog;
            fogIndexs.push(r - 6);
          }
          NumberOfPessimist--;
        }
        //  else if ((Room === tape) && (NumberOfTape != 0) ) {
        //     board[r] = Room;
        //     NumberOfTape--;

        //    }
        else if (Room === safe) {
          Board[r] = Room;
        }
      }
      r++;
    }
    const notFoggyOrPss = (roomIndex) =>
      !(fogIndexs.includes(roomIndex) || pssIndexs.includes(roomIndex));
    
    tapeIndexs = [
      getRandomElement(fourQuarters.Q2.filter(notFoggyOrPss)),
      getRandomElement(fourQuarters.Q3.filter(notFoggyOrPss)),
      getRandomElement(fourQuarters.Q4.filter(notFoggyOrPss)),
      getRandomElement(fourQuarters.Q1.filter(notFoggyOrPss)),
    ]
      .filter((e) => e != undefined)
      .slice(0, 3);

    for (let i = 0; i < tapeIndexs.length; i++) {
      board[tapeIndexs[i]] = tape;
    }
    
    board[0] = " ";
    board[DeanshipPosition] = " ";
    return board;
  };
  
  return {
    Board: InitializeBoard(),
    PssIndexs: pssIndexs,
    FogIndexs: fogIndexs,
    TapeIndexs: tapeIndexs,
  };
  //   <>
  //   <View style={styles.padd}>
  //   <Text>{savePath.map(s => <Text>[{s}]</Text>)}</Text>
  //   </View>

  //   <View style={styles.box}>
  //     {[0,1,2,3,4,5].map((i)=>(<View style={styles.container}>
  //     {[0,1,2,3,4,5].map((j)=>(<View style={styles.board} ><Text>{board[i * 6 + j]}</Text></View>))}
  //   </View>))}
  //   </View>
  // </>
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  boxButton: {
    flexDirection: "row",
  },
  padd: {
    padding: 100,
  },
});
