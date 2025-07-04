import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MessageScreen from './src/screens/MessageScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <MessageScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default App;
