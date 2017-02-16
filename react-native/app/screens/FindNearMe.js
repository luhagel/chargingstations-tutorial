import React, { Component, PropTypes } from 'react';

import config from '../config/config';

import Container from '../components/Container';
import { Header } from '../components/Text';
import LocationButton from '../components/LocateMeButton';

class FindNearMe extends Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  static propTypes = {
    navigator: PropTypes.object,
  }

  static locationConfig = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(this.handleLocationSuccess,
                                             this.handleLocationError,
                                             this.locationConfig);
  }

  handleLocationError = (err) => {
    this.props.navigator.showLocalAlert(err.message, config.errorStyles);
  }

  handleLocationSuccess = (res) => {
    console.log(res);
  }

  render() {
    return (
      <Container>
        <LocationButton onPress={this.getLocation} />
        <Header>
          Find Near Me
        </Header>
      </Container>
    );
  }
}

export default FindNearMe;
