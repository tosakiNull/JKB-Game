import React, { useState, useEffect } from 'react';
import { dataBase } from './plugins/firebase';
// import { ref, onValue, set, push, child } from 'firebase/database'; // TODO: 這裡要包起來
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

  function enterGame(name) {
    const gameID = getGameID();
    console.log('enter gameID', gameID);

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

    const roomInfo = tableInfo[config.roomID] || {};
    // let gameID = config.gameID;

    // TODO: 沒有gameID
    console.log('roomID', tableInfo[config.roomID]);

    // const newPostKey = push(child(ref(dataBase), 'test/Room-1')).key;

    let gameID = `Game_${uuidv4()}`; // 建局
    // let gameID = newPostKey; // 建局
    console.log('初始 new gameID: ', gameID);

    // 當前RoomID的場次內不滿2人
    if (roomInfo) {
      const gameList = Object.keys(roomInfo);
      const lastGame = roomInfo[gameList[gameList.length - 1]];

      // TODO: 要取場次不滿2人的
      const canAddGame = gameList.find((item) => roomInfo[item].userList.length < 2);

      console.log('lastGame: ', canAddGame)

      if (Object.keys(lastGame.userList).length < 2) {
        gameID = gameList[gameList.length - 1];

        console.log('old gameID', gameID)
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

  function handleClear() {
    // set(ref(dataBase, `test/Room-1/Game_${config.gameID}/userList/`), {});
    set(ref(dataBase, `test/Room-1/`), {});
  }

  function handleNewGame() {
    enterGame(config.userName);
  }

  useEffect(() => {
    console.log('mounted')

    return onValue(msgDB, (snapshot) => {
      if (snapshot.exists()) {
        setTableInfo(snapshot.val())
        console.log('snapshot', snapshot.val())
      }
    });
  }, []);

  useEffect(() => {
    if (!tableInfo) {
      return;
    }

    const roomInfo = tableInfo[config.roomID];
    let gameID = config.gameID;

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
