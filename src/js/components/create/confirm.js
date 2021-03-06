import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ConfirmWhat from './confirm-what';
import ConfirmWhere from './confirm-where';
import ConfirmWhen from './confirm-when';
import Button from '../common/Button';
import Header from '../common/Header';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';
import { connectAlert } from '../Alert';

class Confirm extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      backgroundColor: colours.transparent,
      tintColor: colours.white,
      renderRight: () => {
        return (
          <Button
            onPress={ discardEvent }
            buttonStyle={{ margin: 15 }}
            textStyle={{ color: colours.darkgray, fontWeight: '600' }}
          >
            <Text>Cancel</Text>
          </Button>
        );
      }
    }
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  render () {
    const { what, where, when, description, note, handleOnPress, isConnected, isFetching } = this.props;
    if (isFetching) {
      return <Spinner size="large" />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: colours.white }}>
        <Header />
        <View style={{ flex: 1 }}>
          { !isConnected && this.renderAlert() }
          <ScrollView>
            <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingBottom: 5 }]}>{ description }</Text>
              <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingBottom: 5 }]}>{ note }</Text>
            </View>
            <ConfirmWhat data={what} />
            <View style={{ backgroundColor: 'lightgray', height: 1, marginHorizontal: 5 }} />
            <ConfirmWhere data={where} />
            <View style={{ backgroundColor: 'lightgray', height: 1, marginHorizontal: 5 }} />
            <ConfirmWhen data={when} />

            <View style={[styles.rowCentered, { marginTop: 0 }]}>
              <Button
                buttonStyle={styles.confirmButton}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleOnPress(this.props.navigation) }
              >
                Invite friends
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default connectAlert(Confirm);
