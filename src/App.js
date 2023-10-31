import React, { useState, useEffect } from 'react';
import { dataBase } from './plugins/firebase';
import { ref, onValue, set } from 'firebase/database'; // TODO: 這裡要包起來
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
    roomID: 'Room-1'
  });
  const [tableInfo, setTableInfo] = useState({});
  const [rivalInfo, setRivalInfo] = useState({});

  function writeUserData(userId, name, email) {
    // 這裡如果要新增,到時要用push
    // 不然會一直寫同一個欄位
    // const newPostKey = push().key;

    set(ref(dataBase, 'test/Room-1/userList/' + name), {
      userName: name,
      // userID: newPostKey,
      email: email,
    });
    // setConfig({ ...config, userID: newPostKey });

    // set(ref(dataBase, 'test/Room-1/userList'), []);

    // TODO: 要再多推一個目前場內玩家['user1_name', 'user2_name']
  }

  function createUser(name) {
    setConfig({
      ...config,
      userName: name
    })
    // TODO: 這裡建userID
    // TODO: 如果userList已經有兩筆,RoomID要換新的

    writeUserData(1, name, 'test@mail.com');
  }

  function handlePunch(value) {
    set(ref(dataBase, 'test/Room-1/userList/' + config.userName + '/type'), value);
  }

  useEffect(() => {
    onValue(msgDB, (snapshot) => {
      setTableInfo(snapshot.val())
    });
  }, []);

  useEffect(() => {
    console.log('tableInfo change', tableInfo)
    // TODO: 這裡處理userList清單
    if (tableInfo?.userList && tableInfo.userList.length >= 2) {
      // 有同桌玩家
      // TODO: 這裡沒進,要看一下
      const rivalInfo = tableInfo.userList.find((infoItem) => infoItem.userName !== config.userName)
      setRivalInfo(rivalInfo);
      console.log('useEffect hasRival', rivalInfo);
    }
  }, [tableInfo]);

  return (
    <div className="App">
      {config.userName ?
        <GameTable tableInfo={tableInfo} config={config} rivalInfo={rivalInfo} onPunch={handlePunch} />
       : <Login createUser={createUser} />
      }

    </div>
  );
}

export default App;
