import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import FinalisedEvent from './finalised-event';
import colours from '../../../styles/colours';
import Header from '../common/Header';
import CloseIcon from '../common/close-icon';
import EditIcon from '../common/edit-icon';

export default class Event extends Component {

  static navigationOptions = ({ navigation }) => ({

    title: (navigation.state.params.name === undefined) ? 'Sorry...' : navigation.state.params.name,
    headerRight: (
      navigation.state.params.userIsHost && !navigation.state.params.isPoll && !navigation.state.params.eventIsCancelled ?

        <TouchableHighlight
          onPress={ () => navigation.state.params.handleEdit(navigation.state.params.event) }
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <View>
            <EditIcon />
          </View>
        </TouchableHighlight> :
        null
    ),
    headerLeft: (
      <TouchableHighlight style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <CloseIcon navigation={navigation} />
        </View>
      </TouchableHighlight>
    )
  });

  componentWillUpdate (nextProps) {
    console.log('thisProps', this.props);
    console.log('nextProps', nextProps);

    if (nextProps.event.name !== this.props.event.name) {
      this.props.navigation.setParams({
        name: nextProps.event.name
      });
    }
  }

  eventRouter () {
    if (this.props.error) {
      return (
        <View>
          <Text>This event has been cancelled!</Text>
        </View>
      );
    } else if (this.props.userIsHost && this.props.isPoll) {
      return (
        <HostPoll
          navigator={this.props.navigation}
          vote_count={ this.props.vote_count }
          event={ this.props.event }
          finalChoices={ this.props.finalChoices }
          handleConfirmEvent={ this.props.handleConfirmEvent }
          voteCount={ this.props.voteCount }
          handleInviteMoreFriends={ this.props.handleInviteMoreFriends }
        />
      );
    } else if (!this.props.userIsHost && this.props.isPoll) {
      return (
        <InviteePoll
          navigator={this.props.navigation}
          event={ this.props.event }
          voteSaved={this.props.voteSaved}
          handleVote={ this.props.handleVote }
          voteCount={ this.props.voteCount }
        />
      );
    } else { // eslint-disable-line no-else-return
      return (
        <FinalisedEvent
          navigator={this.props.navigation}
          event={ this.props.event }
          event_id={ this.props.event_id }
          userIsHost={ this.props.userIsHost }
          rsvps={ this.props.rsvps }
          rsvpToEvent={ this.props.rsvpToEvent }
          handleDeleteEvent={ this.props.handleDeleteEvent }
          handleInviteMoreFriends={ this.props.handleInviteMoreFriends }
        />
      );
    }
  }

  render () {
    console.log('thisProps', this.props);
    return (
      <View style={{ flex: 1, backgroundColor: colours.white }}>
        <Header />
        <View style={{ flex: 1, marginTop: 70 }}>
          {
            this.props.event && this.eventRouter()
          }
        </View>
      </View>
    );
  }
}
