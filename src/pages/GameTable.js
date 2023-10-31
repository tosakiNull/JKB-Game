// TODO: 遊戲主體
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function GameTable(props) {
  const { onPunch, rivalInfo } = props;
  // const [isWaitRival, setIsWaitRival] = useState(true);

  // TODO: 如果對方type === '' => 等待對方出拳中

  // console.log(tableInfo, isWaitRival)

  function handlePunch(value) {
    // TODO: 將拳寫入firebase
    onPunch(value);
  }

  useEffect(() => {
    console.log('rivalInfo: ', rivalInfo)
  }, [rivalInfo]);

  return (
    <div className="gameTable">
      <div>對手出拳: </div>
      <div>等待對方出拳中...</div>
      <button onClick={() => { handlePunch(2) }}>✌🏻</button>
      <button onClick={() => { handlePunch(0) }}>✊🏻</button>
      <button onClick={() => { handlePunch(5) }}>🤚🏻</button>
    </div>
  );
}

GameTable.propTypes = {
  tableInfo: PropTypes.object,
  config: PropTypes.object,
  onPunch: PropTypes.func,
  rivalInfo: PropTypes.object
};

export default GameTable;
