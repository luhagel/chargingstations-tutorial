import React, { Component, PropTypes } from 'react';
import Meteor from 'react-native-meteor';

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

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
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
    const params = {
      latitude: res.coords.latitude,
      longitude: res.coords.longitude,
    };

    this.setState({ loading: true });

    Meteor.call('Locations.getNearestLocations', params, (err, locations) => {
      if (err) {
        this.props.navigator.showLocalAlert(err.reason, config.errorStyles);
      } else {
        this.props.navigator.push('nearMe', { locations });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <Container>
        <LocationButton
          onPress={this.getLocation}
          loading={this.state.loading}
        />
        <Header>
          Find Near Me
        </Header>
      </Container>
    );
  }
}

export default FindNearMe;
