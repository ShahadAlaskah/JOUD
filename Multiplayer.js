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
    //setRoomNum(positionOfNextRoom);
    // moveRDLU();
    Alert.alert('move to next room');
  }
  else {Alert.alert('can not move to next room')}}
//delete if 
  if (finalAnswer == -1) {
    setModalVisible(!isModalVisible);

  } else if (finalAnswer == correctAnswer) {
    setPoint(Point + questionPoint);
    // for (let i = 0; i < aa.length; i++) {
    //   if (
    //     myPath.includes(positionOfNextRoom + aa[i]) == false &&
    //     positionOfNextRoom + aa[i] !== 35
    //   ) {
    //     if (aa[i] == 1) {
    //       if ((positionOfNextRoom - (6 - 1)) % 6 != 0) {
    //         arrLight[i] = positionOfNextRoom + aa[i];
    //         board[arrLight[i]] = Light;
    //       }
    //     }
    //     if (aa[i] == 6) {
    //       if (positionOfNextRoom < 6 * (6 - 1)) {
    //         arrLight[i] = positionOfNextRoom + aa[i];
    //         board[arrLight[i]] = Light;
    //       }
    //     }
    //     if (aa[i] == -1) {
    //       if (positionOfNextRoom % 6 != 0) {
    //         arrLight[i] = positionOfNextRoom + aa[i];
    //         board[arrLight[i]] = Light;
    //       }
    //     }
    //     if (aa[i] == -6) {
    //       if (positionOfNextRoom > 6 - 1) {
    //         arrLight[i] = positionOfNextRoom + aa[i];
    //         board[arrLight[i]] = Light;
    //       }
    //     }
    //   }
    // }

    for (let index = 0; index < board1.length; index++) {
      if (myPath.includes(index)) {
        board[index] = board1[index];
      }
    }
    //////////////////////////////////////////
    setRoomNum(positionOfNextRoom);
 
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
      //displayQuestion(0, -1);
    }
  }
setTimeout(() => setStyleb1(styles.button), 1000);
setTimeout(() => setStyleb2(styles.button), 1000);
setTimeout(() => setStyleb3(styles.button), 1000);
setTimeout(() => setStyleb4(styles.button), 1000);
}
