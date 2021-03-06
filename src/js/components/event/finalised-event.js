/* eslint-disable arrow-body-style */
import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinalisedWhat from '../create/confirm-what';
import FinalisedWhere from '../create/confirm-where';
import FinalisedWhen from '../create/confirm-when';
import Button from '../common/Button';
import DeleteIcon from '../common/delete-icon';
import InviteeCard from './invitee-card';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const STATUS_GOING = 'going';
const STATUS_MAYBE = 'maybe';
const STATUS_NOT_GOING = 'not_going';

const inlineStyle = {
  RSVPButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.confirm,
    borderColor: colours.confirm,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 5
  },
  RSVPTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 5
  },
  RSVPButtonText: {
    fontSize: 16,
    color: colours.white
  },
  RSVPTitleText: {
    fontSize: 12,
    fontWeight: '600'
  },
  orangeButton: {
    backgroundColor: colours.orange,
    borderColor: colours.orange
  },
  redButton: {
    backgroundColor: colours.red,
    borderColor: colours.red
  },
  column: {
    flex: 1,
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
};

const FinalisedEvent = ({ event, userIsHost, rsvpToEvent, rsvps, handleDeleteEvent, handleInviteMoreFriends }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        { userIsHost ? <Text>You are hosting</Text> : <Text>You have been invited, please RSVP</Text> }

        { userIsHost &&
          <Button
            buttonStyle={{ paddingLeft: 20, paddingRight: 20, flexDirection: 'row', alignSelf: 'flex-end' }}
            textStyle={{ color: colours.gray }}
            onPress={ () => handleDeleteEvent(event.event_id) }
          >
            <DeleteIcon />
          </Button>
        }
      </View>

      <ScrollView>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Image source={{ uri: event.host_photo_url }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
          </View>
          <View style={{ flex: 1, alignSelf: 'center', marginHorizontal: 10 }}>
            <View>
              <Text>{event.description}</Text>
            </View>
            <View>
              <Text>{ event.note }</Text>
            </View>
          </View>
        </View>

        <FinalisedWhat data={ event.what } />
        <FinalisedWhere data={ event.where } />
        <FinalisedWhen data={ event.when } />

        <View style={{ marginTop: 5, marginHorizontal: 5, borderTopColor: '#efefef', borderTopWidth: 1, alignItems: 'center' }}>

          { userIsHost &&
            <Button
              buttonStyle={[styles.inviteButton, { marginTop: 10, marginBottom: 5 }]}
              textStyle={styles.inviteButtonText}
              onPress={ handleInviteMoreFriends }
            >
              Invite more friends
            </Button>
          }

        </View>

        { !userIsHost &&
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ marginLeft: 5, marginVertical: 5, fontSize: 14 }}>RSVPs</Text>

          <View style={{ flexDirection: 'row' }}>
            <Button
              buttonStyle={[styles.RSVPButton, inlineStyle.greenButton]}
              textStyle={styles.RSVPButtonText}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_GOING) }
            >
              Going
            </Button>
            <Button
              buttonStyle={[styles.RSVPButton, inlineStyle.orangeButton]}
              textStyle={styles.RSVPButtonText}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_MAYBE) }
            >
              Maybe
            </Button>
            <Button
              buttonStyle={[styles.RSVPButton, inlineStyle.redButton]}
              textStyle={styles.RSVPButtonText}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_NOT_GOING) }
            >
              Not Going
            </Button>
          </View>

        </View>
        }
        <View style={{ marginBottom: 10, marginTop: 5, marginHorizontal: 5, borderTopColor: '#efefef', borderTopWidth: 1, alignItems: 'center' }} />
        <View style={{ flexDirection: 'row', backgroundColor: '#efefef', paddingVertical: 3, justifyContent: 'space-around' }}>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.green }, inlineStyle.RSVPTitleText]}>
              <Icon name="check-circle" size={16} color={colours.green} />
              {' GOING'}
            </Text>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.orange }, inlineStyle.RSVPTitleText]}>
              <Icon name="question-circle" size={16} color={colours.orange} />
              {' MAYBE'}
            </Text>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.red }, inlineStyle.RSVPTitleText]}>
              <Icon name="times-circle" size={16} color={colours.red} />
              {' NOT GOING'}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={ inlineStyle.column }>
            <View>

              {
                rsvps.going && rsvps.going.map((invitee) => {
                  return (
                    <InviteeCard key={invitee.user_id} firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }

            </View>
          </View>
          <View style={ inlineStyle.column }>
            <View>

              {
                rsvps.maybe && rsvps.maybe.map((invitee) => {
                  return (
                    <InviteeCard key={invitee.user_id} firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }

            </View>
          </View>
          <View style={ inlineStyle.column }>
            <View>

              {
                rsvps.not_going && rsvps.not_going.map((invitee) => {
                  return (
                    <InviteeCard key={invitee.user_id} firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }

            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderTopColor: '#efefef' }}>
          <Text style={[styles.msg4, { marginLeft: 10, marginTop: 5 }]}>Not responded</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            rsvps.not_responded.map((invitee) => {
              if (invitee.user_id === event.host_user_id) {
                return null;
              }
              return (
                <InviteeCard
                  key={ invitee.firstname + Date.now() }
                  firstname={ invitee.firstname }
                  photo_url={ invitee.photo_url }
                />
              );
            })
          }
        </View>


      </ScrollView>
    </View>
  );
};

export default FinalisedEvent;
