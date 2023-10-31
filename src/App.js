import React from 'react';
import { dataBase } from './plugins/firebase';
import { ref, onValue, set } from "firebase/database"; // TODO: 這裡要包起來
import './App.css';

function App() {
  const msg = ref(dataBase, 'test');
  onValue(msg, (snapshot) => {
    console.log(snapshot.val())
  });

  function writeUserData(userId, name, email) {
    set(ref(dataBase, 'test/' + userId), {
      username: name,
      email: email,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => writeUserData('T123456', 'test', 'test@mail.com')} >Click</button>
      </header>
    </div>
  );
}

export default App;
