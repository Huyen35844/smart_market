import React from 'react';
import {
  SafeAreaView, Text, StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import SignIn from './src/views/SignIn';
import SignUp from './src/views/SignUp';
import ForgetPassword from './src/views/ForgetPassword';
import Navigator from './src/navigator/index';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from './src/store';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigator />
        <FlashMessage position="top" />
      </SafeAreaView>
    </Provider>
  );
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})