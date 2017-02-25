import React, { Component, PropTypes } from 'react';
import Meteor from 'react-native-meteor';
import { Card } from 'react-native-elements';
import Container from '../components/Container';
import { Input, PrimaryButton, SecondaryButton } from '../components/Form';

import config from '../config/config';

class SignIn extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Sign In',
    },
  }

  static propTypes = {
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      emailOrUsername: '',
      password: '',
      loading: false,
    };
  }

  toSignup = () => {
    this.props.navigator.pop();
  }

  handleSignin = () => {
    const { emailOrUsername, password } = this.state;

    if (emailOrUsername.length === 0) {
      return this.props.navigator.showLocalAlert('Email/Username is required.', config.errorStyles);
    }

    if (password.length === 0) {
      return this.props.navigator.showLocalAlert('Password is required.', config.errorStyles);
    }

    this.setState({ loading: true });
    return Meteor.loginWithPassword(emailOrUsername, password, (err) => {
      this.setState({ loading: false });
      if (err) {
        this.props.navigator.showLocalAlert(err.reason, config.errorStyles);
      } else {
        this.props.navigator.immediatelyResetStack(['profile']);
      }
    });
  }

  render() {
    return (
      <Container scroll>
        <Card>
          <Input
            label="Email or Username:"
            keyboardType="email-address"
            onChangeText={(emailOrUsername) => this.setState({ emailOrUsername })}
            value={this.state.emailOrUsername}
          />
          <Input
            label="Password:"
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <PrimaryButton title="Login" loading={this.state.loading} onPress={this.handleSignin} />
        </Card>
        <SecondaryButton title="Need and Account?" onPress={this.toSignup} />
      </Container>
    );
  }
}

export default SignIn;
