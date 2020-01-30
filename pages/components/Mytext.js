/*Custom Text*/
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Mytext = props => {
    return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: '#133156',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 7,
    },
});

export default Mytext;