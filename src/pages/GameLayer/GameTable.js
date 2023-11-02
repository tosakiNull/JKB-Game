import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PlayerCard from './PlayerCard';

function GameTable(props) {
  const {playerInfo, rivalInfo} = props;

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
    if (!playerInfo.type || !rivalInfo.type) {
      return '';
    }

    // 平局
    if (playerInfo.type === rivalInfo.type) {
      return '平局';
    }

    const win = isPlayerWin(playerInfo.type, rivalInfo.type);
    const winText = win ? playerInfo.userName : rivalInfo.userName;

    return `${winText} 獲勝`;
  }

  return (
    <div className="gameTable">
      <Grid divided='vertically'>
        <Grid.Row columns={3}>
          <Grid.Column>
            <PlayerCard name={playerInfo.userName} type={playerInfo.type} />
            {/* <PlayerCard name={'playerInfo.userName'} type={'2'} isMe={true} /> */}
          </Grid.Column>
          <Grid.Column>
            VS
          </Grid.Column>
          <Grid.Column>
            <PlayerCard name={rivalInfo.userName} type={rivalInfo.type} />
            {/* <PlayerCard name={'rivalInfo.userName'} type={'5'} /> */}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            本局 {showWinText()}
          </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
  );
}

GameTable.propTypes = {
  rivalInfo: PropTypes.object,
  playerInfo: PropTypes.object,
};

GameTable.defaultProps = {
  rivalInfo: {},
  playerInfo: {},
};

export default GameTable;
