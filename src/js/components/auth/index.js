import React from 'react';
import { Image, Text, View } from 'react-native';
import Button from '../common/Button';
import Header from '../common/Header';
import colours from '../../../styles/colours';
import styles from '../../../styles';

const logo = require('../../../img/sparkLoginLogo.png');

Index.navigationOptions = () => {
  return {
    header: null
  };
};

export default function Index ({ navigation }) {

  const goToLogin = () => {
    navigation.navigate('login');
  };

  const goToSignup = () => {
    navigation.navigate('signup');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
      <Header style={{ top: -25 }} />
      <View style={{ flex: 0.2 }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
        <Image style={{ height: 100, width: 300 }} source={ logo } />
      </View>
      <View style={{ flex: 0.15, justifyContent: 'center', marginBottom: 25 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#a39b9b', textAlign: 'center', marginHorizontal: 10 }}>
          The easy way to organise parties, events,
          share pictures and memories with friends, family and groups.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 0.3 }}>
        <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1, marginBottom: 40 }}>
          <Button
            buttonStyle={ [styles.confirmButton, { flex: 0.2, backgroundColor: colours.green, marginTop: 2 }] }
            textStyle={ styles.confirmButtonText }
            onPress={ goToLogin }
          >
            LOG IN
          </Button>
          <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colours.darkgray }}>
              OR
            </Text>
          </View>
          <Button
            buttonStyle={ [styles.confirmButton, { flex: 0.2, backgroundColor: colours.orange, borderColor: colours.orange, marginTop: 2 }] }
            textStyle={ [styles.confirmButtonText, { fontFamily: 'Helvetica Neue' }] }
            onPress={ goToSignup }
          >
            SIGN UP
          </Button>
        </View>
      </View>
    </View>
  );
}
