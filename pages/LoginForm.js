import React from 'react';
import styles from '../styles/styles';
import ValidationComponent from '../vals';
import Mybutton from './components/Mybutton';
import { sha256 } from 'react-native-sha256';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';

export default class LoginForm extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user_name: ""
    };
  }

  _onPressButton = () => {
    this.validate({
      username: { required: true },
      password: { required: true },
    });
    if (this.isFormValid()) {
      this.getUser();
    }
  }

  getUser = () => {
    var user_email = this.state.username.trim();
    var user_password = this.state.password.trim();
    sha256(user_password).then(hash => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users_table where user_name = ? AND user_pass = ?',
          [user_email, hash],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              this.setState({
                user_name: results.rows.item(0).user_name,
              });
              this.props.navigation.navigate('AssessmentHome', { user_name: this.state.user_name });
            } else {
              alert('Login Failed');
            }
          }
        );
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.viewContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>

              {this.isFieldInError('username') && this.getErrorsInField('username').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
              <TextInput autoCapitalize="none" placeholder="username" ref="username" onChangeText={(username) => this.setState({ username })} value={this.state.username} style={styles.TextInputStyleClass} />

              {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
              <TextInput autoCapitalize="none" placeholder="password" ref="password" onChangeText={(password) => this.setState({ password })} value={this.state.password} style={styles.TextInputStyleClass} />

              <Mybutton
                title='Submit'
                customClick={() => this._onPressButton()}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

}
