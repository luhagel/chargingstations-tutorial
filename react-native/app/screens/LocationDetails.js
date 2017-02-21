import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { Button, Card, Text, List, ListItem } from 'react-native-elements';
import Container from '../components/Container';
import NotFound from '../components/NotFound';

import colors from '../config/colors';
import config from '../config/config';

const CHECKED_IN = 'in';
const CHECKED_OUT = 'out';

class LocationDetails extends Component {

  static propTypes = {
    location: PropTypes.object,
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      changingStatus: false,
    };
  }

  attemptCheckin = () => {
    const { location } = this.props;
    let status = CHECKED_IN;
    if (location.checkedInUserId) {
      status = CHECKED_OUT;
    }

    this.setState({ changingStatus: true });
    Meteor.call('Locations.changeCheckinStatus', { locationId: location._id, status }, (err) => {
      if (err) {
        this.props.navigator.showLocalAlert(err.reason, config.errorStyles);
      }
      this.setState({ changingStatus: false });
    });
  }

  renderItems = () => {
    return (
      <NotFound
        text="No activity yet."
        small
      />
    );
  }

  render() {
    const location = this.props.location || _.get(this.props, 'route.params.location', {});
    const userId = _.get(this.props, 'user._id', 'demo');
    const checkedIn = location.checkedInUserId === userId;
    const available = location.checkedInUserId !== 'string';

    let icon = { name: 'check' };
    let title = 'Check In';
    let backgroundColor = colors.primary;

    if (checkedIn) {
      icon = { name: 'close' };
      title = 'Check Out';
      backgroundColor = colors.red;
    } else if (!available) {
      icon = { name: 'close' };
      title = 'Not Available';
    }

    return (
      <Container scroll>
        <Card title={location.station_name}>
          <Text>{location.street_address}</Text>
          <Text>{location.access_days_time}</Text>
        </Card>
        <Button
          raised
          icon={icon}
          title={title}
          backgroundColor={backgroundColor}
          buttonStyle={{ marginVertical: 20 }}
          disabled={!available && !checkedIn}
          onPress={this.attemptCheckin}
          loading={this.state.changingStatus}
        />
        <Card title="Recent Activity">
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
            {this.renderItems()}
          </List>
        </Card>
      </Container>
    );
  }
}
const connectedLocationDetails = createContainer((params) => {
  const location = _.get(params, 'route.params.location', {});

  Meteor.subscribe('Locations.pub.details', { locationId: location._id });

  return {
    user: Meteor.user(),
    location: Meteor.collection('locations').findOne({ _id: location._id }),
  };
}, LocationDetails);

connectedLocationDetails.route = {
  navigationBar: {
    visible: true,
    title: 'Location Details',
  },
};

export default connectedLocationDetails;
