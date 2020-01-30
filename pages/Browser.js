import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Browser