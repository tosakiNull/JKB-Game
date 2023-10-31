// TODO: 登入取UserID
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

function Login(props) {
  const { createUser } = props;
  const [userName, setUserName] = useState('');

  function onUserNameChange(ev, { value }) {
    setUserName(value);
  }

  function onSubmit() {
    createUser(userName);
  }

  return (
    <div className="login">
        <p className="title">猜拳遊戲</p>
        <Form>
          <Form.Field>
            <label>名稱</label>
            <Form.Input
              type="text"
              placeholder="請輸入名稱"
              name="userName"
              value={userName}
              onChange={onUserNameChange}
            />
          </Form.Field>
          <Button type='button' onClick={onSubmit}>登入</Button>
        </Form>
    </div>
  );
}

Login.propTypes = {
  createUser: PropTypes.func
};

export default Login;
