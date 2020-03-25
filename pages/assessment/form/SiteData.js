import React from 'react';
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import Loader from '../../components/Loader';
import ValidationComponent from '../../../vals';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

export default class SiteData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isInsert: true,
      flower_area_sf: '',
      gate_and_ditch_area: '',
      gate_and_ditch_area_irrigated: '',
      nat_area: '',
      pump_and_ditch: '',
      pump_and_ditch_irrigated: '',
      push_mower_area: '',
      riding_mower_area: '',
      rough_mower: '',
      sprinkler_coverage_auto: '',
      sprinkler_coverage_manual: '',
      shrub_area: '',
      total_asphalt: '',
      total_concrete: '',
      total_curbs: '',
      total_fences: '',
      total_gravel: '',
      small_trees: '',
      tall_trees: '',
      trimming: '',
      master_id: this.props.navigation.state.params.master_id,
      assessment_name: this.props.navigation.state.params.assessment_name
    }
  }

  componentDidMount() {
    this.getSiteData();
  }

  onPressButton = () => {
    if (this.isFormValid()) {
      if (this.state.isInsert) {
        this.insertSiteData();
      } else {
        this.updateSiteData();
      }
    }
  }

  insertSiteData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO site_data_table(master_id,flower_area_sf,gate_and_ditch_area,gate_and_ditch_area_irrigated,nat_area,pump_and_ditch,pump_and_ditch_irrigated,push_mower_area,riding_mower_area,rough_mower,sprinkler_coverage_auto,sprinkler_coverage_manual,shrub_area,total_asphalt,total_concrete,total_curbs,total_fences,total_gravel,small_trees,tall_trees,trimming) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [state.master_id, state.flower_area_sf, state.gate_and_ditch_area, state.gate_and_ditch_area_irrigated, state.nat_area, state.pump_and_ditch, state.pump_and_ditch_irrigated, state.push_mower_area, state.riding_mower_area, state.rough_mower, state.sprinkler_coverage_auto, state.sprinkler_coverage_manual, state.shrub_area, state.total_asphalt, state.total_concrete, state.total_curbs, state.total_fences, state.total_gravel, state.small_trees, state.tall_trees, state.trimming],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Validation added successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Validation add Failed');
          }
        }
      );
    });
  };

  updateSiteData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE site_data_table SET flower_area_sf = ?,gate_and_ditch_area = ?,gate_and_ditch_area_irrigated = ?,nat_area = ?,pump_and_ditch = ?,pump_and_ditch_irrigated = ?,push_mower_area = ?,riding_mower_area = ?,rough_mower = ?,sprinkler_coverage_auto = ?,sprinkler_coverage_manual = ?,shrub_area = ?,total_asphalt = ?,total_concrete = ?,total_curbs = ?,total_fences = ?,total_gravel = ?,small_trees = ?,tall_trees = ?,trimming = ? WHERE master_id = ?',
        [state.flower_area_sf, state.gate_and_ditch_area, state.gate_and_ditch_area_irrigated, state.nat_area, state.pump_and_ditch, state.pump_and_ditch_irrigated, state.push_mower_area, state.riding_mower_area, state.rough_mower, state.sprinkler_coverage_auto, state.sprinkler_coverage_manual, state.shrub_area, state.total_asphalt, state.total_concrete, state.total_curbs, state.total_fences, state.total_gravel, state.small_trees, state.tall_trees, state.trimming, state.master_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Validation updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Validation Update Failed');
          }
        }
      );
    });
  }

  getSiteData() {
    //console.log(this.state.master_id);
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM site_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          console.log(results.rows.length);
          if (results.rows.length > 0) {
            this.setState({
              flower_area_sf: results.rows.item(0).flower_area_sf,
              gate_and_ditch_area: results.rows.item(0).gate_and_ditch_area,
              gate_and_ditch_area_irrigated: results.rows.item(0).gate_and_ditch_area_irrigated,
              nat_area: results.rows.item(0).nat_area,
              pump_and_ditch: results.rows.item(0).pump_and_ditch,
              pump_and_ditch_irrigated: results.rows.item(0).pump_and_ditch_irrigated,
              push_mower_area: results.rows.item(0).push_mower_area,
              riding_mower_area: results.rows.item(0).riding_mower_area,
              rough_mower: results.rows.item(0).rough_mower,
              sprinkler_coverage_auto: results.rows.item(0).sprinkler_coverage_auto,
              sprinkler_coverage_manual: results.rows.item(0).sprinkler_coverage_manual,
              shrub_area: results.rows.item(0).shrub_area,
              total_asphalt: results.rows.item(0).total_asphalt,
              total_concrete: results.rows.item(0).total_concrete,
              total_curbs: results.rows.item(0).total_curbs,
              total_fences: results.rows.item(0).total_fences,
              total_gravel: results.rows.item(0).total_gravel,
              small_trees: results.rows.item(0).small_trees,
              tall_trees: results.rows.item(0).tall_trees,
              trimming: results.rows.item(0).trimming,
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
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Mytext text="FLOWER AREA (SF)" />
            <Mytextinput
              onChangeText={(flower_area_sf) => this.setState({ flower_area_sf })}
              value={state.flower_area_sf}
              style={styles.TextInputStyleClass}
            />



            <Mytext text="XXXX" />
            <Mytextinput
              onChangeText={(XXXX) => this.setState({ XXXX })}
              value={state.XXXX}
              style={styles.TextInputStyleClass}
            />

            <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}