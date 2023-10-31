// TODO: 遊戲主體
import React from 'react';
function GameTable() {
    return (
      <div className="gameTable">
        <div>對手出拳: </div>
        <div>等待對方出拳中...</div>
        <button>剪刀</button>
        <button>石頭</button>
        <button>布</button>
      </div>
    );
}

export default GameTable;
