import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { emailValidator as validate } from './form-validation';
import { FormTextInput } from './form-components';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { connectAlert } from '../Alert';

const inlineStyle = {
  buttonStyle: {
    backgroundColor: colours.blue,
    flex: 1,
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 5
  },
  labelStyle: {
    alignSelf: 'flex-start',
    paddingLeft: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff'
  }
};

class ConfirmEmail extends Component {

  static navigationOptions = {
    title: 'Forgot your password?'
  }

  renderServerError = () => {
    if (this.props.confirmEmailError) {
      return <Text style={{ color: 'red' }}>{ this.props.confirmEmailError }</Text>;
    }
  }

  renderServerMessage = () => {
    if (this.props.message) {
      return <Text style={{ color: 'green' }}>{ this.props.message }</Text>;
    }
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isConfirming } = this.props;
    if (isConfirming) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonStyle={inlineStyle.buttonStyle}
        textStyle={inlineStyle.textStyle}
        onPress={handleSubmit(handleSubmitForm)}
      >
        <Text>SUBMIT</Text>
      </Button>
    );
  };

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        { !this.props.isConnected && this.renderAlert() }
        <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 70 }}>
          <Text>Explanation text</Text>
          { this.renderServerMessage() }
        </View>
        <View style={ styles.container }>
          <Text style={inlineStyle.labelStyle}>Email</Text>
          <View style={ styles.row }>
            <Field name="email" component={ FormTextInput } isEmail />
          </View>
          { this.renderServerError() }
          <View style={ styles.row }>
            { this.renderButton() }
          </View>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'confirmEmail', validate })(ConfirmEmail);
export default connectAlert(hoistNonReactStatic(decoratedComponent, ConfirmEmail));
