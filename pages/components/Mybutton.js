/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = props => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.customClick}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: '#404040',
        borderRadius: 3,
        padding: 10,
        width: '100%'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        padding: 1,
        fontSize: 20
    },
});

export default Mybutton;