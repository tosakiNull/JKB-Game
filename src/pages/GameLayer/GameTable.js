import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import PlayerCard from './PlayerCard';

function GameTable(props) {
  const {playerInfo, rivalInfo, showResult} = props;

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
    const baseText = '本局';

    if (!playerInfo.type || !rivalInfo.type) {
      return '';
    }

    // 平局
    if (playerInfo.type === rivalInfo.type) {
      return `${baseText} 平局`;
    }

    const win = isPlayerWin(playerInfo.type, rivalInfo.type);
    const winText = win ? playerInfo.userName : rivalInfo.userName;

    return `${baseText} ${winText} 獲勝`;
  }

  function getTableMsg() {
    let msg = '';

    if (!rivalInfo.userName) {
      msg = '準備中';
    }

    if (playerInfo.userName && rivalInfo.userName) {
      msg = '請雙方出拳';
    }

    if (playerInfo.type && rivalInfo.type) {
      msg = '遊戲結束';
    }

    return msg;
  }

  // 未結算不可顯示對手出的拳
  const rivalType = showResult ? rivalInfo.type : '';

  return (
    <div className="gameTable">
      <Grid divided='vertically'>
        <Grid.Row columns={3}>
          <Grid.Column>
            <PlayerCard name={playerInfo.userName} type={playerInfo.type} isMe />
          </Grid.Column>
          <Grid.Column>
            VS
            <Message color="purple">{getTableMsg()}</Message>
          </Grid.Column>
          <Grid.Column>
            <PlayerCard name={rivalInfo.userName} type={rivalType} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as='h2'>{showWinText()}</Header>
          </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
  );
}

GameTable.propTypes = {
  rivalInfo: PropTypes.object,
  playerInfo: PropTypes.object,
  showResult: PropTypes.bool,
};

GameTable.defaultProps = {
  rivalInfo: {},
  playerInfo: {},
  showResult: false,
};

export default GameTable;
