// TODO: 遊戲主體
import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer } from 'semantic-ui-react';

function Loading(props) {
  const { show, msg } = props;


  return (
    <Dimmer active inverted className={{ 'display-none': show }}>
      <Loader inverted>{msg}</Loader>
    </Dimmer>
  );
}

Loading.propTypes = {
  show: PropTypes.bool,
  msg: PropTypes.string,
};

Loading.defaultProps = {
  show: false,
  msg: '載入中',
};

export default Loading;
