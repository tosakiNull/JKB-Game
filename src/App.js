import React, { useState, useEffect } from 'react';
import { dataBase } from './plugins/firebase';
import { ref, onValue, set } from 'firebase/database'; // TODO: 這裡要包起來
import { v4 as uuidv4 } from 'uuid'; // TODO: 同樣包起來
import Login from './pages/Login';
// import GameHall from './pages/GameHall';
import GameTable from './pages/GameTable';
import './App.css';

function App() {
  const msgDB = ref(dataBase, 'test');
  const [config, setConfig] = useState({
    userName: '',
    userID: '',
    rivalName: '',
    roomID: 'Room-1',
    gameID: ''
  });
  const [tableInfo, setTableInfo] = useState(null);
  const [rivalInfo, setRivalInfo] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});

  function writeUserData(userId, name, email) {
    // 這裡如果要新增,到時要用push
    // 不然會一直寫同一個欄位
    // const newPostKey = push().key;
    const data = {
      userName: name,
      email: email,
    }

    set(ref(dataBase, `test/Room-1/Game_${config.gameID}/userList/` + name), data);

    setPlayerInfo(data);
    // setConfig({ ...config, userID: newPostKey });

    // set(ref(dataBase, 'test/Room-1/userList'), []);

    // TODO: 要再多推一個目前場內玩家['user1_name', 'user2_name']
  }

  function enterGame(name) {
    setConfig({
      ...config,
      userName: name
    })
    // TODO: 這裡建userID
    // TODO: 如果userList已經有兩筆,RoomID要換新的

    writeUserData(1, name, 'test@mail.com');
  }

  function handlePunch(value) {
    set(ref(dataBase, `test/Room-1/Game_${config.gameID}/userList/` + config.userName + '/type'), value);
    setPlayerInfo({
      ...playerInfo,
      type: value
    })
  }

  function handleClear() {
    // set(ref(dataBase, `test/Room-1/Game_${config.gameID}/userList/`), {});
    set(ref(dataBase, `test/Room-1/`), {});
  }

  function handleNewGame() {
    // TODO: 用firebase生新key
    console.log('new_gameID');
    const newKey = uuidv4();
    set(ref(dataBase, `test/Room-1/Game_${newKey}/userList/`), {});

    setConfig({ ...config, gameID: newKey });

    return newKey;
  }

  // function getNowOpenGameID() {
  //   // TODO: 找當前 roomID 最後一筆, 看是否只有一個人的遊戲ID

  // }

  // async function getAllRoomData() {
  //   await get(`test/Room-1`).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }

  useEffect(() => {
    console.log('mounted')
    
    return onValue(msgDB, (snapshot) => {
      if (snapshot.exists()) {
        setTableInfo(snapshot.val())
        console.log('snapshot', snapshot.val())
      }
    });
    
    // getAllRoomData();

    // handleNewGame();
  }, []);

  useEffect(() => {
    if (!tableInfo) {
      return;
    }

    const roomInfo = tableInfo[config.roomID];
    let gameID = config.gameID;

    // TODO: 沒有gameID
    console.log('roomID', tableInfo[config.roomID]);
    // 初始第一場
    if (!roomInfo) {
      gameID = handleNewGame(); // 建局
      // 進入該遊戲局
    }

    // 新開頁面要直接加入有房間的
    if (!config.gameID && roomInfo) {
      // TODO: 這裡要重寫, 會加到舊房間

      console.log('roomID', tableInfo[config.roomID]);
      const gameList = Object.keys(tableInfo[config.roomID]);
      const lastGame = tableInfo[config.roomID][gameList[gameList.length - 1]];
      console.log('lastGame', lastGame, gameList[gameList.length - 1]);

      console.log('lastGame userList:', lastGame.userList)
      // TODO: 如果最後一局不滿2人加入,否則開新房
      if (lastGame.userList && Object.keys(lastGame.userList).length < 2) {
        gameID = gameList[gameList.length - 1];
        console.log('old_gameID')
      } else {
        gameID = `Game_${uuidv4()}`;
        set(ref(dataBase, `test/Room-1/${gameID}/userList/`), {});
        console.log('new_gameID');
      }

      setConfig({ ...config, gameID });
    }

    
    // const getNowGame = [`Game_${config.gameID}`]
    console.log('gameID: ', gameID)
    if (roomInfo && roomInfo[gameID]) {
      const getNowGame = roomInfo[gameID]

      if (getNowGame?.userList && Object.keys(getNowGame.userList).length >= 0) {
        // 有同桌玩家(假設這裡只進兩人)
        const userList = getNowGame.userList;
        const userKeyList = Object.keys(userList);
        const nowRivalInfo = userKeyList.find((infoItem) => userList[infoItem].userName !== config.userName);
  
        console.log('useEffect', userList[nowRivalInfo], nowRivalInfo)
  
        setRivalInfo(userList[nowRivalInfo]);
      }
    }
    console.log(tableInfo)
  }, [tableInfo]);

  return (
    <div className="App">
      {config.userName ?
        <GameTable 
          tableInfo={tableInfo} 
          config={config} 
          rivalInfo={rivalInfo}
          playerInfo={playerInfo}
          onPunch={handlePunch}
          onNewGame={handleNewGame}
        />
       : <Login createUser={enterGame} />
      }
      <button onClick={handleClear}>clear</button>
    </div>
  );
}

export default App;
