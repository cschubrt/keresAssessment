import React, { Component } from 'react';
import styles from '../../../styles/styles';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

class FormIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            master_id: this.props.navigation.state.params.master_id,
            assessment_name: this.props.navigation.state.params.assessment_name
        }
    }

    handlePress(prs) {
        this.props.navigation.navigate(prs, { master_id: this.state.master_id });
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <View>
                    <ScrollView keyboardShouldPersistTaps="handled">

                        <Text style={{ textAlign: 'center', fontSize: 27, color: '#40546b', paddingTop: 30 }}>
                            {this.state.assessment_name}
                        </Text>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('Info')}>
                            <Text style={styles.text}>Info</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('Observations')}>
                            <Text style={styles.text}>Observations</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('ValidationData')}>
                            <Text style={styles.text}>Validation Data</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('BuildingData')}>
                            <Text style={styles.text}>Building Data</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('SiteData')}>
                            <Text style={styles.text}>Site Data</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('TowerData')}>
                            <Text style={styles.text}>Tower Data</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('TankData')}>
                            <Text style={styles.text}>Tank Data</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default FormIndex