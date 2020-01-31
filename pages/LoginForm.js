import React from 'react';
import ValidationComponent from '../vals';
import { sha256 } from 'react-native-sha256';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';

export default class LoginForm extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      user_name: "",
      text: ""
    };
  }

  _onPressButton = () => {
    this.validate({
      // Username: { required: true },
      // Password: { required: true },
    });
    this.props.navigation.navigate('AssessmentHome');
    if (this.isFormValid()) {
      this.getUser();
    }
  }

  getUser = () => {
    var user_email = this.state.Username.trim();
    var user_password = this.state.Password.trim();
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
              this.props.navigation.navigate('AssessmentHome');
            } else {
              //alert('Login Failed');
            }
          }
        );
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Text style={{ color: '#133156', fontSize: 27, textAlign: 'center', paddingBottom: 10 }}>Login</Text>

            <TextInput autoCapitalize="none" placeholder="Username" ref="Username" onChangeText={(Username) => this.setState({ Username })} value={this.state.Username} style={styles.TextInputStyleClass} />
            {this.isFieldInError('Username') && this.getErrorsInField('Username').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}

            <TextInput autoCapitalize="none" placeholder="Password" ref="Password" onChangeText={(Password) => this.setState({ Password })} value={this.state.Password} style={styles.TextInputStyleClass} />
            {this.isFieldInError('Password') && this.getErrorsInField('Password').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}

            <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#133156',
    borderRadius: 5,
    padding: 10,
    width: '100%'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: 2,
    paddingLeft: 75,
    paddingRight: 75,
    fontSize: 17
  },
  textAlert: {
    color: 'red',
    textAlign: 'left',
    width: '100%',
    paddingBottom: 15,
    paddingLeft: 5,
    fontSize: 14,
  },
})