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
        backgroundColor: '#707070',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        borderRadius: 5,
        width: '100%',
    },
    text: {
        color: '#ffffff',
    },
});

export default Mybutton;