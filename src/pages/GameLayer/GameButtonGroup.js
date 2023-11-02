import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { getPunchTypeIconName } from '../../utils/index'

// 玩家操作按鈕
function GameButtonGroup(props) {
  const { disabled, onPunch } = props;
  const buttonList = [
    { id: '2', iconName: getPunchTypeIconName('2'), animatedText: '剪刀' },
    { id: '0', iconName: getPunchTypeIconName('0'), animatedText: '石頭' },
    { id: '5', iconName: getPunchTypeIconName('5'), animatedText: '布' },
  ];

  const buttonRows = buttonList.map((item) => (
    <Button key={item.id} animated disabled={disabled} onClick={onPunch(item.id)}>
      <Button.Content visible>
        <Icon name={item.iconName} size="big" />
      </Button.Content>
      <Button.Content hidden>
        {item.animatedText}
      </Button.Content>
    </Button>
  ));

  return (
    <div>
      {buttonRows}
    </div>
  );
}

GameButtonGroup.propTypes = {
  disabled: PropTypes.bool,
  onPunch: PropTypes.func,
};

GameButtonGroup.defaultProps = {
  disabled: false,
  onPunch: () => {},
};

export default GameButtonGroup;
