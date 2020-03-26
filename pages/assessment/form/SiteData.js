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
            Alert.alert('Success', 'Site Data added successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Site Data add Failed');
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
            Alert.alert('Success', 'Site Data updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Site Data Update Failed');
          }
        }
      );
    });
  }

  getSiteData() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM site_data_table', [], (tx, results) => {
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

            <Mytext text="GATE AND DITCH AREAS - DITCH AREA (SF)" />
            <Mytextinput
              onChangeText={(gate_and_ditch_area) => this.setState({ gate_and_ditch_area })}
              value={state.gate_and_ditch_area}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="GATE AND DITCH AREAS - IRRIGATED AREA (SF)" />
            <Mytextinput
              onChangeText={(gate_and_ditch_area_irrigated) => this.setState({ gate_and_ditch_area_irrigated })}
              value={state.gate_and_ditch_area_irrigated}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="NATURAL AREA (SF)" />
            <Mytextinput
              onChangeText={(nat_area) => this.setState({ nat_area })}
              value={state.nat_area}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="PUMP AND DITCH AREAS - DITCH AREA (SF)" />
            <Mytextinput
              onChangeText={(pump_and_ditch) => this.setState({ pump_and_ditch })}
              value={state.pump_and_ditch}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="PUMP AND DITCH AREAS - IRRIGATED AREA (SF)" />
            <Mytextinput
              onChangeText={(pump_and_ditch_irrigated) => this.setState({ pump_and_ditch_irrigated })}
              value={state.pump_and_ditch_irrigated}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="PUSH MOWER AREA (SF)" />
            <Mytextinput
              onChangeText={(push_mower_area) => this.setState({ push_mower_area })}
              value={state.push_mower_area}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="RIDING MOWER AREA (SF)" />
            <Mytextinput
              onChangeText={(riding_mower_area) => this.setState({ riding_mower_area })}
              value={state.riding_mower_area}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="ROUGH MOWER AREA (SF)" />
            <Mytextinput
              onChangeText={(rough_mower) => this.setState({ rough_mower })}
              value={state.rough_mower}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="SPRINKLER COVERAGE - AUTO (SF)" />
            <Mytextinput
              onChangeText={(sprinkler_coverage_auto) => this.setState({ sprinkler_coverage_auto })}
              value={state.sprinkler_coverage_auto}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="SPRINKLER COVERAGE - MANUAL (SF)" />
            <Mytextinput
              onChangeText={(sprinkler_coverage_manual) => this.setState({ sprinkler_coverage_manual })}
              value={state.sprinkler_coverage_manual}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="SHRUB AREA (SF)" />
            <Mytextinput
              onChangeText={(shrub_area) => this.setState({ shrub_area })}
              value={state.shrub_area}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TOTAL ASPHALT AREA (SF)" />
            <Mytextinput
              onChangeText={(total_asphalt) => this.setState({ total_asphalt })}
              value={state.total_asphalt}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TOTAL CONCRETE AREA (SF)" />
            <Mytextinput
              onChangeText={(total_concrete) => this.setState({ total_concrete })}
              value={state.total_concrete}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TOTAL CURBS (LF)" />
            <Mytextinput
              onChangeText={(total_curbs) => this.setState({ total_curbs })}
              value={state.total_curbs}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TOTAL FENCES (LF)" />
            <Mytextinput
              onChangeText={(total_fences) => this.setState({ total_fences })}
              value={state.total_fences}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TOTAL GRAVEL AREA (SF)" />
            <Mytextinput
              onChangeText={(total_gravel) => this.setState({ total_gravel })}
              value={state.total_gravel}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="NO. OF SMALL TREES" />
            <Mytextinput
              onChangeText={(small_trees) => this.setState({ small_trees })}
              value={state.small_trees}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="NO. OF TALL TREES" />
            <Mytextinput
              onChangeText={(tall_trees) => this.setState({ tall_trees })}
              value={state.tall_trees}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TRIMMING (LF)" />
            <Mytextinput
              onChangeText={(trimming) => this.setState({ trimming })}
              value={state.trimming}
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