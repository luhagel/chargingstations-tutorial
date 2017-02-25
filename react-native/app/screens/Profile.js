import React, { Component, PropTypes } from 'react';
import Meteor from 'react-native-meteor';
import { PrimaryButton } from '../components/Form';
import Container from '../components/Container';
import { Header } from '../components/Text';

import config from '../config/config';

class Profile extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Profile',
    },
  }

  static propTypes = {
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  logout = () => {
    this.setState({ loading: true });
    Meteor.logout((err) => {
      this.setState({ loading: false });
      if (err) {
        this.props.navigator.showLocalAlert(err.reason, config.errorStyles);
      } else {
        this.props.navigator.immediatelyResetStack(['signUp']);
      }
    });
  }

  render() {
    return (
      <Container>
        <Header>
          Profile
        </Header>
        <PrimaryButton title="Logout"onPress={this.logout} />
      </Container>
    );
  }
}

export default Profile;
