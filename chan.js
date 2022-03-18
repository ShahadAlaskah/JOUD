const showPessimistOrFoggyWarnaing = () => {
  if (fogIndexs.includes(positionOfNextRoom)) {
    alert("warning!! fooooog");
  }
  if (pssIndexs.includes(positionOfNextRoom)) {
    alert("warning!! passsssssssssss");
    //endGame(1);
  }
};
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
      showPessimistOrFoggyWarnaing();
      setRoomNum(roomNum + 1);
    }
  } else if (positionOfNextRoom == roomNum - 1) {
    //moveL
    if (roomNum % 6 != 0) {
      showPessimistOrFoggyWarnaing();
      setRoomNum(roomNum - 1);
    }
  } else if (positionOfNextRoom == roomNum - 6) {
    //moveUp
    if (roomNum > 5) {
      showPessimistOrFoggyWarnaing();
      setRoomNum(roomNum - 6);
    }
  } else if (positionOfNextRoom == roomNum + 6) {
    //moveD
    if (roomNum < 30) {
      showPessimistOrFoggyWarnaing();
      setRoomNum(roomNum + 6);
    }
  }
  // if (roomNum == 35) {
  //   endGame(3);
  // }
};
