import React, { Component } from 'react';
import { Button, Form, Header, Input, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { signIn, isSignedIn } from '../utils/helper';

class SignIn extends Component {
  state = {
    isSignedIn: false,
    needSignUp: false,
    user: {
      username: '',
      password: ''
    },
    errors: {}
  };
  
  componentWillMount() {
    if (!localStorage.getItem('wodeqian-token')) {
      this.setState({ isSignedIn: false });    }
  }
  
  componentDidMount() {
    isSignedIn().then(res => {
      if (!res.error) {
        this.setState({ isSignedIn: true });
      }
    });
  }
  
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
    if (!user.password) {
      errors.password = `Password can't be empty`;
    }
    return errors;
  }
  
  handleSignInClick = () => {
    const errors = this.validate(this.state.user);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      signIn(this.state.user, res => {
        if (res.error) {
          const serverErrors = {server: res.message};
          this.setState({ errors: serverErrors });
        } else {
          localStorage.setItem('wodeqian-token', res.token);
          this.setState({ isSignedIn: true });
        }
      });
    }
  }
  
  handleSignUpClick = () => {
    this.setState({ needSignUp: true });
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
    if (this.state.needSignUp) {
      return <Redirect to='/signup' />;
    }
    
    if (!this.state.isSignedIn) {
      return (
        <Segment raised>
          <Header>
            SignIn Form
          </Header>
          <Form error={errorMessages.length !== 0}>
            {errorMessages}
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
            { this.state.error && <div style={{ color: "#ae5856" }}>{this.state.error}</div> }
            <Form.Field>
              <Button
                fluid
                basic
                color='green'
                onClick={this.handleSignInClick}
              >
                SignIn
              </Button>
            </Form.Field>
            <Form.Field>
              <Button
                fluid
                basic
                color='red'
                onClick={this.handleSignUpClick}
              >
                Or SignUp Here!
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      );
    }
    
    return <Redirect to='/wallets' />;
  }
}

export default SignIn;