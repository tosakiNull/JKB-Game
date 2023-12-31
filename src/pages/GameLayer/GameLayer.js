import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Button } from 'semantic-ui-react';
import Loading from '../../components/Loading';
import GameTable from './GameTable';
import GameButtonGroup from './GameButtonGroup';

function GameLayer(props) {
  const { onPunch, rivalInfo, playerInfo, onNewGame } = props;
  const [isWaitRival, setIsWaitRival] = useState(true);

  function handlePunch(value) {
    onPunch(value);
  }

  // 同房間,新開一局
  function handleNewGame() {
    onNewGame();
  }

  function showLoading() {
    let loadingText = '';

    // 自己出拳,對手未出拳
    if (isWaitRival && playerInfo.type) {
      loadingText = '等待對方出拳中';
    }

    // 對手未匹配入場
    if (!rivalInfo.userName) {
      loadingText = '等待對方入場中';
    }

    return {
      show: !!loadingText,
      msg: loadingText,
    };
  }

  useEffect(() => {
    if (!rivalInfo) {
      return;
    }

    // 是否等待對手出拳
    if (!rivalInfo.type) {
      setIsWaitRival(true);
    } else {
      setIsWaitRival(false);
    }

  }, [rivalInfo]);

  // TODO: 如果自己出拳 rival未出拳 => 等待對方出拳中
  // TODO: 等待對方入場 => 無rival
  // TODO: 再來一次, 兩方都能按,A按下(A等待對方加入...),B後按(加入同一房間)

  // TODO: 需要一個reset game button

  return (
    <Container className="h-100">
      <div className="gameLayer">
        <Segment textAlign="right">
          本局對手: {rivalInfo?.userName || '---'}
        </Segment>

        {/* 如果兩方任一方未出拳 不能顯示出拳結果畫面 */}
        <Segment>
          <GameTable
            playerInfo={playerInfo}
            rivalInfo={rivalInfo}
            showResult={!isWaitRival && !!playerInfo.type}
          />
        </Segment>

        {/* 自己已經出拳,不能再按 */}
        {(!playerInfo.type || !rivalInfo.type) && (
          <Segment>
            <Loading {...showLoading()} />
            <GameButtonGroup onPunch={handlePunch} disabled={false} />
          </Segment>
        )}

        {(playerInfo.type && rivalInfo.type) && (
          <Button onClick={handleNewGame}>再來一局</Button>
        )}

      </div>
    </Container>
  );
}

GameLayer.propTypes = {
  tableInfo: PropTypes.object,
  config: PropTypes.object,
  onPunch: PropTypes.func,
  rivalInfo: PropTypes.object,
  playerInfo: PropTypes.object,
  onNewGame: PropTypes.func,
};

GameLayer.defaultProps = {
  tableInfo: {},
  config: {},
  onPunch: () => {},
  rivalInfo: {},
  playerInfo: {},
  onNewGame: () => {},
};

export default GameLayer;
