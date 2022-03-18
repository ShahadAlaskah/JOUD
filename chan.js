const moveRDLU = () => {
    // if (
    //   tapeIndexs.includes(positionOfNextRoom) &&
    //   numberOfTape != 3 &&
    //   myPath.includes(positionOfNextRoom) == false
    // ) {
    //   setnumberOfTape(numberOfTape + 1);
    // } else if (tapeIndexs.includes(positionOfNextRoom) && numberOfTape == 3) {
    //   setPoint(Point + 3);
    // }
    if (positionOfNextRoom == roomNum + 1) {
      //moveR
      if ((roomNum - 5) % 6 != 0) {
        //showPessimistOrFoggyWarnaing(1);
        setRoomNum(roomNum + 1);
        //setMyPath([...myPath, roomNum + 1]);
        // for (let index = 0; index < aa.length; index++) {
        //   if (aa[index] != 1) {
        //     if (!myPath.includes(roomNum + aa[index])) {
        //       board[roomNum + aa[index]] = close;
        //     }
        //   }
        // }
      }
    } else if (positionOfNextRoom == roomNum - 1) {
      //moveL
      if (roomNum % 6 != 0) {
        //showPessimistOrFoggyWarnaing(-1);
        setRoomNum(roomNum - 1);
        // setMyPath([...myPath, roomNum - 1]);
        // for (let index = 0; index < aa.length; index++) {
        //   if (aa[index] != -1) {
        //     if (!myPath.includes(roomNum + aa[index])) {
        //       board[roomNum + aa[index]] = close;
        //     }
        //   }
        // }
      }
    } else if (positionOfNextRoom == roomNum - 6) {
      //moveUp
      if (roomNum > 5) {
        //showPessimistOrFoggyWarnaing(-6);
        setRoomNum(roomNum - 6);
        // setMyPath([...myPath, roomNum - 6]);
        // for (let index = 0; index < aa.length; index++) {
        //   if (aa[index] != -6) {
        //     if (!myPath.includes(roomNum + aa[index])) {
        //       board[roomNum + aa[index]] = close;
        //     }
        //   }
        // }
      }
    } else if (positionOfNextRoom == roomNum + 6) {
      //moveD
      if (roomNum < 30) {
        //showPessimistOrFoggyWarnaing(6);
        setRoomNum(roomNum + 6);
        // setMyPath([...myPath, roomNum + 6]);
        // for (let index = 0; index < aa.length; index++) {
        //   if (aa[index] != 6) {
        //     if (!myPath.includes(roomNum + aa[index])) {
        //       board[roomNum + aa[index]] = close;
        //     }
        //   }
        // }
      }
    }
    //myPath.push(positionOfNextRoom);
    // board[positionOfNextRoom] = board1[positionOfNextRoom];
    // if (roomNum == 35) {
    //   endGame(3);
    // }
  };
