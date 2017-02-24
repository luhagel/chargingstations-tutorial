import React, { Component, PropTypes } from 'react';
import { Card } from 'react-native-elements';
import Container from '../components/Container';
import { Input, PrimaryButton, SecondaryButton } from '../components/Form';

class SignUp extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Sign Up',
    },
  }

  static propTypes = {
    navigator: PropTypes.Object,
  }

  toLoginScreen = () => {
    this.props.navigator.push('SignIn', {});
  }

  render() {
    return (
      <Container scroll>
        <Card>
          <Input label="Email:" keyboardType="email-address" />
          <Input label="Username:" />
          <Input label="Password:" secureTextEntry />
          <Input label="Password Confirmation:" secureTextEntry />
          <PrimaryButton title="Register" />
        </Card>
        <SecondaryButton title="Already have an account?" />
      </Container>
    );
  }
}

export default SignUp;
