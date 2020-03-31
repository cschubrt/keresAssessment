import React from 'react';
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import Loader from '../../components/Loader';
import ValidationComponent from '../../../vals';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView } from 'react-native';

export default class TowerData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isInsert: true,
      gross_sqf: '',
      original_cost: '',
      useful_life: '',
      planned_replacement_year: '',
      project_number: '',
      total_fund_area: '',
      elevation: '',
      height: '',
      ice_load: '',
      wind_load: '',
      tension: '',
      master_id: this.props.navigation.state.params.master_id,
      assessment_name: this.props.navigation.state.params.assessment_name
    }
  }

  componentDidMount() {
    this.getTowerData();
  }

  onPressButton = () => {
    if (this.isFormValid()) {
      if (this.state.isInsert) {
        this.insertTowerData();
      } else {
        this.updateTowerData();
      }
    }
  }

  insertTowerData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tower_data_table(master_id,gross_sqf,original_cost,useful_life,planned_replacement_year,project_number,total_fund_area,elevation,height,ice_load,wind_load,tension) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);',
        [state.master_id, state.gross_sqf, state.original_cost, state.useful_life, state.planned_replacement_year, state.project_number, state.total_fund_area, state.elevation, state.height, state.ice_load, state.wind_load, state.tension],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Tower Data added successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Tower Data add Failed');
          }
        }
      );
    });
  };

  updateTowerData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE tower_data_table SET gross_sqf = ?,original_cost = ?,useful_life = ?,planned_replacement_year = ?,project_number = ?,total_fund_area = ?,elevation = ?,height = ?,ice_load = ?,wind_load = ?,tension = ? WHERE master_id = ?',
        [state.gross_sqf, state.original_cost, state.useful_life, state.planned_replacement_year, state.project_number, state.total_fund_area, state.elevation, state.height, state.ice_load, state.wind_load, state.tension, state.master_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Tower Data updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Tower Data Update Failed');
          }
        }
      );
    });
  }

  getTowerData() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM tower_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          if (results.rows.length > 0) {
            this.setState({
              gross_sqf: results.rows.item(0).gross_sqf,
              original_cost: results.rows.item(0).original_cost,
              useful_life: results.rows.item(0).useful_life,
              planned_replacement_year: results.rows.item(0).planned_replacement_year,
              project_number: results.rows.item(0).project_number,
              total_fund_area: results.rows.item(0).total_fund_area,
              elevation: results.rows.item(0).elevation,
              height: results.rows.item(0).height,
              ice_load: results.rows.item(0).ice_load,
              wind_load: results.rows.item(0).wind_load,
              tension: results.rows.item(0).tension,
              isInsert: false,
              isLoading: false
            });
          } else {
            this.setState({ isLoading: false });
          }
        });
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    const state = this.state;

    if (this.state.isLoading) {
      return (<Loader />);
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.viewContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>

              <Mytext text="GROSS SQF" />
              <Mytextinput
                onChangeText={(gross_sqf) => this.setState({ gross_sqf })}
                value={state.gross_sqf}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="ORIGINAL COST" />
              <Mytextinput
                onChangeText={(original_cost) => this.setState({ original_cost })}
                value={state.original_cost}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="FBMS USEFUL LIFE" />
              <Mytextinput
                onChangeText={(useful_life) => this.setState({ useful_life })}
                value={state.useful_life}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="PLANNED REPLACEMENT YEAR" />
              <Mytextinput
                onChangeText={(planned_replacement_year) => this.setState({ planned_replacement_year })}
                value={state.planned_replacement_year}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="PROJECT NUMBER" />
              <Mytextinput
                onChangeText={(project_number) => this.setState({ project_number })}
                value={state.project_number}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="TOTAL FUND AREA" />
              <Mytextinput
                onChangeText={(total_fund_area) => this.setState({ total_fund_area })}
                value={state.total_fund_area}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="ELEVATION" />
              <Mytextinput
                onChangeText={(elevation) => this.setState({ elevation })}
                value={state.elevation}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="HEIGHT" />
              <Mytextinput
                onChangeText={(height) => this.setState({ height })}
                value={state.height}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="ICE LOAD" />
              <Mytextinput
                onChangeText={(ice_load) => this.setState({ ice_load })}
                value={state.ice_load}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="WIND LOAD" />
              <Mytextinput
                onChangeText={(wind_load) => this.setState({ wind_load })}
                value={state.wind_load}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="TENSION" />
              <Mytextinput
                onChangeText={(tension) => this.setState({ tension })}
                value={state.tension}
                style={styles.TextInputStyleClass}
              />

              <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

}