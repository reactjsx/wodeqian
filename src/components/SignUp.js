import React, { Component } from 'react';
import { Button, Form, Header, Input, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { signUp } from '../utils/helper';

class SignUp extends Component {
  state = {
    isSignedUp: false,
    user: {
      username: '',
      nickname: '',
      password: ''
    },
    errors: {}
  };
  
  handleInputChange = (event) => {
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value }
    });
  }
  
  validate = (user) => {
    const errors = {};
    if (!user.username) {
      errors.username = `Username can't be empty`;
    }
    if (!user.nickname) {
      errors.nickname = `Nickname can't be empty`;
    }
    if (!user.password) {
      errors.password = `Password can't be empty`;
    }
    return errors;
  }
  
  handleSignUpClick = () => {
    const errors = this.validate(this.state.user);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      signUp(this.state.user, res => {
        if (res.error) {
          const serverErrors = {server: res.message};
          this.setState({ errors: serverErrors });
        } else {
          localStorage.setItem('wodeqian-token', res.token);
          this.setState({ isSignedUp: true });
        }
      });
    }
  }
  
  render() {
    const errors = this.state.errors;
    const keys = Object.keys(errors);
    const errorMessages = keys.map(key => (
      <Message
        error
        header={key}
        content={errors[key]}
      />
    ));
    if (!this.state.isSignedUp) {
      return (
        <Segment raised>
          <Header>
            SignUp Form
          </Header>
          <Form error={errorMessages.length !== 0}>
          {errorMessages}
            <Form.Field>
              <Input
                placeholder='Your Want To Be Called?'
                value={this.state.user.nickname}
                name='nickname'
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder='Username'
                value={this.state.user.username}
                name='username'
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder='Password'
                value={this.state.user.password}
                name='password'
                onChange={this.handleInputChange}
                type='password'
              />
            </Form.Field>
            <Form.Field>
              <Button
                fluid
                basic
                color='green'
                onClick={this.handleSignUpClick}
              >
                SignUp
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      );
    }
    return <Redirect to='/wallets' />;
  }
}

export default SignUp;