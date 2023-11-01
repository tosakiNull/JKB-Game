// TODO: 遊戲主體
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function GameTable(props) {
  const { onPunch, rivalInfo, playerInfo } = props;
  const [isWaitRival, setIsWaitRival] = useState(true);

  console.log(playerInfo)

  // TODO: 如果對方type === '' => 等待對方出拳中

  // console.log(tableInfo, isWaitRival)

  function handlePunch(value) {
    // TODO: 將拳寫入firebase
    onPunch(value);
  }

  useEffect(() => {
    console.log('rivalInfo: ', rivalInfo)
    if (!rivalInfo.type && rivalInfo.type !== 0) {
      setIsWaitRival(true);
    } else {
      setIsWaitRival(false);
    }
  }, [rivalInfo]);

  // TODO: 如果兩方任一方未出拳 不能顯示畫面的出拳
  // TODO: 如果自己出拳 rival未出拳 => 等待對方出拳中

  // TODO: 需要一個reset game button

  return (
    <div className="gameTable">
      我的拳:
      對方的拳:
      本局 XXX 獲勝
      {isWaitRival && <div>等待對方出拳中...</div>}
      {!playerInfo.type && (
        <>
          <button onClick={() => { handlePunch(2) }}>✌🏻</button>
          <button onClick={() => { handlePunch(0) }}>✊🏻</button>
          <button onClick={() => { handlePunch(5) }}>🤚🏻</button>
        </>
      )}
    </div>
  );
}

GameTable.propTypes = {
  tableInfo: PropTypes.object,
  config: PropTypes.object,
  onPunch: PropTypes.func,
  rivalInfo: PropTypes.object,
  playerInfo: PropTypes.object
};

export default GameTable;
