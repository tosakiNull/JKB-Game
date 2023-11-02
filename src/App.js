import React, { useState, useEffect } from 'react';
import { dataBase } from './plugins/firebase';
import { ref, onValue, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import Login from './pages/Login';
import GameLayer from './pages/GameLayer/GameLayer';
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

  function enterGame(name) {
    const gameID = getGameID();

    // 玩家
    const data = { userName: name };

    set(ref(dataBase, `test/Room-1/${gameID}/userList/${name}/`), data);
    setPlayerInfo(data);

    setConfig({
      ...config,
      userName: name,
      gameID: gameID
    });
  }

  function getGameID() {
    const roomInfo = (tableInfo && tableInfo[config.roomID]) || {};

    // const newPostKey = push(child(ref(dataBase), 'test/Room-1')).key;
    // let gameID = newPostKey; // 建局

    let gameID = `Game_${uuidv4()}`; // 建局

    // 當前RoomID的場次內不滿2人則加入房間
    if (roomInfo) {
      const gameList = Object.keys(roomInfo);

      const canAddGame = gameList.find((item) => {
        // 取場次內不滿2人
        if (Object.keys(roomInfo[item].userList).length < 2) {
          return item;
        }
      });

      if (canAddGame) {
        gameID = canAddGame;
      }
    }

    return gameID;
  }

  function handlePunch(value) {
    set(ref(dataBase, `test/Room-1/${config.gameID}/userList/` + config.userName + '/type'), value);
    setPlayerInfo({
      ...playerInfo,
      type: value
    })
  }

  // function handleClear() {
  //   set(ref(dataBase, `test/Room-1/`), {});
  // }

  function handleNewGame() {
    enterGame(config.userName);
  }

  useEffect(() => {
    onValue(msgDB, (snapshot) => {
      if (snapshot.exists()) {
        setTableInfo(snapshot.val())
      }
    });
  }, []);

  useEffect(() => {
    if (!tableInfo) {
      return;
    }

    const roomInfo = tableInfo[config.roomID];
    const gameID = config.gameID;

    if (roomInfo && roomInfo[gameID]) {
      const getNowGame = roomInfo[gameID]

      if (getNowGame?.userList && Object.keys(getNowGame.userList).length >= 0) {
        // 有同桌玩家(假設這裡只進兩人)
        const userList = getNowGame.userList;
        const userKeyList = Object.keys(userList);
        const nowRivalInfo = userKeyList.find((infoItem) => userList[infoItem].userName !== config.userName);

        setRivalInfo(userList[nowRivalInfo]);
      }
    }
  }, [tableInfo]);

  return (
    <div className="App">
      {config.userName ?
        <GameLayer
          tableInfo={tableInfo}
          config={config}
          rivalInfo={rivalInfo}
          playerInfo={playerInfo}
          onPunch={handlePunch}
          onNewGame={handleNewGame}
        />
       : <Login createUser={enterGame} />
      }
      {/* 清空firebase按鈕-開發測試用後門 */}
      {/* {playerInfo.userName === "T3-I'm%develop" && <button onClick={handleClear}>clear</button>} */}
    </div>
  );
}

export default App;
