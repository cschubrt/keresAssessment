import React, { Component } from 'react';
import styles from './components/styles';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

class Browser extends Component {
    
    LoadingIndicatorView() {
        return <ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} />
    }
    render() {
        const { params } = this.props.navigation.state

        return (
            <WebView
                style={{ flex: 1 }}
                originWhitelist={['*']}
                source={{ uri: params.link }}
                renderLoading={this.LoadingIndicatorView}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        )
    }
}

export default Browser