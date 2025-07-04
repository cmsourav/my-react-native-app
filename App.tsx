import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CounterScreen from './src/screens/CounterScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MessageScreen from './src/screens/MessageScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <MessageScreen />
    // <Provider store={store}>
    //   <CounterScreen />
    // </Provider>

    // <View style={styles.container}>
    //   <HomeScreen />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default App;
