// TODO: 遊戲主體
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Container } from 'semantic-ui-react';
import Loading from '../components/Loading';

function GameTable(props) {
  const { onPunch, rivalInfo, playerInfo, onNewGame } = props;
  const [isWaitRival, setIsWaitRival] = useState(true);
  const [loadingConfig, setLoadingConfig] = useState({ show: false, msg: '' })

  console.log(playerInfo)

  function handlePunch(value) {
    onPunch(value);
  }

  function getPunchTypeEmoji(type) {
    switch(type) {
      case '2':
        return 'hand peace outline';
      case '0':
        return 'hand rock outline';
      case '5':
        return 'hand paper outline';
      default:
        return '';
    }
  }

  function isPlayerWin(playerType, rivalType) {
    if (playerType === '2') {
      // win
      if (rivalType === '5') {
        return true;
      }

      // lose
      if (rivalType === '0') {
        return false;
      }
    }

    if (playerType === '0') {
      // win
      if (rivalType === '2') {
        return true;
      }

      // lose
      if (rivalType === '5') {
        return false;
      }
    }

    if (playerType === '5') {
      // win
      if (rivalType === '0') {
        return true;
      }

      // lose
      if (rivalType === '2') {
        return false;
      }
    }

    return false;
  }

  function showWinText() {
    // 平局
    if (playerInfo.type === rivalInfo.type) {
      return '平局';
    }

    const win = isPlayerWin(playerInfo.type, rivalInfo.type);
    const winText = win ? playerInfo.userName : rivalInfo.userName;
    return `${winText} 獲勝`;
  }

  // 同房間,新開一局
  function handleNewGame() {
    // TODO: 這裡要去firebase開新局號,在新局號下計type
    // TODO: 簡易版就是刷新type,多一個欄位isPrepare,確認雙方都按下則新開一局 => 不用, 用局號認裡面是否有兩人
    onNewGame();
  }

  useEffect(() => {
    console.log('rivalInfo: ', rivalInfo)
    if (!rivalInfo) {
      return;
    }

    // 是否等待對手出拳
    if (!rivalInfo.type) {
      setIsWaitRival(true);
    } else {
      setIsWaitRival(false);
      setLoadingConfig({ show: true, msg: '等待對方出拳中' })
    }

  }, [rivalInfo]);

  // TODO: 如果兩方任一方未出拳 不能顯示畫面的出拳
  // TODO: 如果自己出拳 rival未出拳 => 等待對方出拳中
  // TODO: 等待對方入場 => 無rival
  // TODO: 再來一次, 兩方都能按,A按下(A等待對方加入...),B後按(加入同一房間)

  // TODO: 需要一個reset game button

  return (
    <Container className="h-100">
      <div className="gameTable">
        {(!isWaitRival && playerInfo.type) && (
          <>
            <div>
              我的拳:  <Icon name={getPunchTypeEmoji(playerInfo.type)} />
              對方的拳: <Icon name={getPunchTypeEmoji(rivalInfo.type)} />
            </div>
            <div>
              本局 {showWinText()}
            </div>
          </>
        )}
        {!rivalInfo && <div>等待對方入場中...</div>}
        {(isWaitRival && playerInfo.type) && <div>等待對方出拳中...</div>}
        {!playerInfo.type && (
          <>
            <button onClick={() => { handlePunch('2') }}>
              <Icon name={getPunchTypeEmoji('2')} />
            </button>
            <button onClick={() => { handlePunch('0') }}>
              <Icon name={getPunchTypeEmoji('0')} />
            </button>
            <button onClick={() => { handlePunch('5') }}>
              <Icon name={getPunchTypeEmoji('5')} />
            </button>
          </>
        )}

        <button onClick={handleNewGame}>再來一次</button>
        <Loading {...loadingConfig} />
      </div>
    </Container>
  );
}

GameTable.propTypes = {
  tableInfo: PropTypes.object,
  config: PropTypes.object,
  onPunch: PropTypes.func,
  rivalInfo: PropTypes.object,
  playerInfo: PropTypes.object,
  onNewGame: PropTypes.func,
};

export default GameTable;
