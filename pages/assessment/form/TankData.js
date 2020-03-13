import React from 'react';
import { format } from "date-fns";
import Mytext from '../../components/Mytext';
import styles from '../../../styles/styles';
import ValidationComponent from '../../../vals';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Picker,Alert } from 'react-native';

export default class TankData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      Username: "cschubert",
      Password: "",
      user_name: ""
    };
  }

  _onPressButton = () => {
    this.validate({
    //   Username: { required: true },
    //   Password: { required: true },
    });
    this.props.navigation.navigate('AssessmentHome', {user_name: this.state.Username.trim()});
    if (this.isFormValid()) {
      this.getUser();
    }
  }

  getUser = () => {
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Text style={{ color: '#133156', fontSize: 27, textAlign: 'center', paddingBottom: 10 }}>Login</Text>

            <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}