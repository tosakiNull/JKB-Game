import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';
import { getPunchTypeIconName } from '../../utils/index'

// 玩家顯示卡
function PlayerCard(props) {
  const { name, type, isMe } = props;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{isMe ? '我' : '對手'}</Card.Header>
        <Card.Meta>{name}</Card.Meta>
        <Card.Description>
          <Icon name={getPunchTypeIconName(type)} size="massive" />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

PlayerCard.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string, // 拳種
  isMe: PropTypes.bool,
};

PlayerCard.defaultProps = {
  name: '',
  type: '',
  isMe: false,
};

export default PlayerCard;
