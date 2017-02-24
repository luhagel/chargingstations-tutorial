import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import Container from '../components/Container';
import { Input, PrimaryButton, SecondaryButton } from '../components/Form';

class SignIn extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Sign In',
    },
  }

  render() {
    return (
      <Container scroll>
        <Card>
          <Input label="Email or Username:" keyboardType="email-address" />
          <Input label="Password:" secureTextEntry />
          <PrimaryButton title="Login" />
        </Card>
        <SecondaryButton title="Need and Account?" />
      </Container>
    );
  }
}

export default SignIn;
