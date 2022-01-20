import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';
import StackNavigation from './navigation/Stack';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StackNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};


export default App;