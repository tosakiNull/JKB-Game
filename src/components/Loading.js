import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer, Header } from 'semantic-ui-react';

function Loading(props) {
  const { show, msg } = props;
  const loadingClassName = show ? '' : 'display-none';

  return (
    <Dimmer active={show} inverted className={loadingClassName}>
      <Loader inverted>
        <Header as='h3'>{msg}</Header>
      </Loader>
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
