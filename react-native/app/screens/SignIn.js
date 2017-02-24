import React, { Component, PropTypes } from 'react';
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

  static propTypes = {
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      emailOrUsername: '',
      password: '',
    };
  }

  toSignup = () => {
    this.props.navigator.pop();
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
          <PrimaryButton title="Login" />
        </Card>
        <SecondaryButton title="Need and Account?" onPress={this.toSignup} />
      </Container>
    );
  }
}

export default SignIn;
