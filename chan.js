const moveRDLU = () => {

    
    if (positionOfNextRoom == roomNum + 1) {
      //-----------------------------------------moveR
      if ((roomNum - 5) % 6 != 0) {
       
        setRoomNum(roomNum + 1);
        
      }
    } else if (positionOfNextRoom == roomNum - 1) {
      //-----------------------------------------moveL
      if (roomNum % 6 != 0) {
        
        setRoomNum(roomNum - 1);
        
      }
    } else if (positionOfNextRoom == roomNum - 6) {
      //-------------------------------------------moveUp
      if (roomNum > 5) {
       
        setRoomNum(roomNum - 6);
        
      }
    } else if (positionOfNextRoom == roomNum + 6) {
      //-----------------------------------------------moveD
      if (roomNum < 30) {
        
        setRoomNum(roomNum + 6);
      
    }
    
  };
