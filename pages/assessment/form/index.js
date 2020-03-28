import React, { Component } from 'react';
import Footer from '../../components/Footer';
import styles from '../../../styles/styles';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

class FormIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            master_id: this.props.navigation.state.params.master_id,
            assessment_name: this.props.navigation.state.params.assessment_name
        }
    }

    handlePress(prs) {
        this.props.navigation.navigate(prs, { master_id: this.state.master_id, assessment_name: this.state.assessment_name });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ padding: 10 }}>

                        <ScrollView keyboardShouldPersistTaps="handled">

                            <Text style={{ textAlign: 'center', fontSize: 27, color: '#404040', paddingTop: 30 }}>
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
                <Footer nav={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

export default FormIndex