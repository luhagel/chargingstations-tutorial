import React, { Component, PropTypes } from 'react';
import { Accounts } from 'react-native-meteor';
import { Card } from 'react-native-elements';
import Container from '../components/Container';
import { Input, PrimaryButton, SecondaryButton } from '../components/Form';

import config from '../config/config';

class SignUp extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Sign Up',
    },
  }

  static propTypes = {
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
    };
  }

  toLoginScreen = () => {
    this.props.navigator.push('signIn', {});
  }

  handleSignup = () => {
    const { email, username, password, confirmPassword } = this.state;

    if (email.length === 0) {
      return this.props.navigator.showLocalAlert('Email is required.', config.errorStyles);
    }

    if (username.length === 0) {
      return this.props.navigator.showLocalAlert('Username is required.', config.errorStyles);
    }

    if (password.length === 0 || password !== confirmPassword) {
      return this.props.navigator.showLocalAlert('Passwords must match.', config.errorStyles);
    }

    this.setState({ loading: true });
    return Accounts.createUser({ username, email, password }, (err) => {
      this.setState({ loading: false });
      if (err) {
        this.props.navigator.showLocalAlert(err.reason, config.errorStyles);
      } else {
        this.props.navigator.immediatelyResetStack(['profile']);
      }
    });
  }

  handleChangeEmail = (email) => {
    const { username } = this.state;
    const update = { email };
    const inferredUsername = email.split('@')[0];
    if (username === inferredUsername.slice(0, inferredUsername.length - 1)) {
      update.username = inferredUsername;
    }
    this.setState(update);
  };

  render() {
    return (
      <Container scroll>
        <Card>
          <Input
            label="Email:"
            keyboardType="email-address"
            onChangeText={this.handleChangeEmail}
            value={this.state.email}
          />
          <Input
            label="Username:"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <Input
            label="Password:"
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <Input
            label="Password Confirmation:"
            secureTextEntry
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
          />
          <PrimaryButton title="Register" lading={this.state.loading} onPress={this.handleSignup} />
        </Card>
        <SecondaryButton title="Already have an account?" onPress={this.toLoginScreen} />
      </Container>
    );
  }
}

export default SignUp;
