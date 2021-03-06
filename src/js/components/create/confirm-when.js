/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const ConfirmWhen = ({ data }) => {
  const layout = data.map((timestamp, i) => {
    const hideTitle = i > 0;
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 5 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 5 }}>
            <Text style={[styles.title3, { flex: 1, color: colours.when, paddingTop: 4 }]}>
              When
            </Text>
          </View>
        }
        <View style={{ flex: 800 }}>
          <View style={{ }}>
            <Button
              buttonStyle={{
                flex: 1,
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 15,
                paddingRight: 15 }}
              textStyle={[styles.title4, {
                flex: 1,
                color: colours.when,
                justifyContent: 'space-around',
                lineHeight: 20 }]}
            >
              <Icon name="calendar" size={18} color={colours.when} />
              {'  '}
              {
                // in create/confirm view, timestamp will be an object: { date: DD-MM-YYYY, time: HH:mm }
                // everywhere else will be ISO string
                formatDate(timestamp)
              }
              {'  '}
              <Icon name="clock-o" size={18} color={colours.when} />
              {'  '}
              {
                // in create/confirm view, timestamp will be an object: { date: DD-MM-YYYY, time: HH:mm }
                // everywhere else will be ISO string, or for 'TBC' a modified ISO string with `:TBC` appended
                formatTime(timestamp)
              }
            </Button>
          </View>
        </View>
      </View>
    );
  });

  return (
    <View style={{ marginTop: 3, marginRight: 10 }}>
      { layout }
    </View>
  );
};

export default ConfirmWhen;
