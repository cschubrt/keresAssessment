import React from 'react';
import styles from '../../styles/styles';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicatorView = props => {
    return <View style={{ flex: 1, paddingTop: 20 }}><ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} /></View>;
};

export default LoadingIndicatorView;