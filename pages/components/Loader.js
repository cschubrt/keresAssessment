import styles from '../components/styles';
import { ActivityIndicator } from 'react-native';

const YourComponent = () => {
    
    const LoadingIndicatorView = () => {
        return <ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} />
    }
  
    if (this.state.isLoading) {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                {this.LoadingIndicatorView()}
            </View>
        );
    }
    
  };