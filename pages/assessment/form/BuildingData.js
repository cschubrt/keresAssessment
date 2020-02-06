import React from 'react';
import styles from '../../components/styles';
import ValidationComponent from '../../../vals';
import { sha256 } from 'react-native-sha256';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';

export default class BuildingData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _onPressButton = () => {
    this.validate({
    //   Username: { required: true },
    });

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
              this.props.navigation.navigate('FormIndex', {user_name: this.state.user_name});
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
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Text style={{ color: '#133156', fontSize: 27, textAlign: 'center', paddingBottom: 10 }}>Building Data</Text>

            <TextInput autoCapitalize="none" placeholder="Username" ref="Username" onChangeText={(Username) => this.setState({ Username })} value={this.state.Username} style={styles.TextInputStyleClass} />
            {this.isFieldInError('Username') && this.getErrorsInField('Username').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}

            <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}