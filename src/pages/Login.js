import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header } from 'semantic-ui-react';

function Login(props) {
  const { createUser } = props;
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(null);

  function onUserNameChange(ev, { value }) {
    setUserName(value);
  }

  function onSubmit() {
    if (!userName) {
      setUserNameError({
        content: '請輸入名稱',
        pointing: 'below',
      });
    } else {
      setUserNameError(null);
    }

    createUser(userName);
  }

  useEffect(() => {
    if (userNameError && userName) {
      setUserNameError(null);
    }
  }, [userName])

  return (
    <div className="login">
      <div className="login-content">
        <Header as="h1">猜拳遊戲</Header>
        <Form>
          <Form.Field>
            <label>名稱</label>
            <Form.Input
              type="text"
              placeholder="請輸入名稱"
              name="userName"
              value={userName}
              error={userNameError}
              onChange={onUserNameChange}
            />
          </Form.Field>
          <Button type="button" color="blue" fluid onClick={onSubmit}>
            加入遊戲
          </Button>
        </Form>
      </div>
    </div>
  );
}

Login.propTypes = {
  createUser: PropTypes.func
};

export default Login;
