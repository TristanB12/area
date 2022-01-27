import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import { ThemeProvider } from 'react-native-elements';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import StackNavigation from './navigation/Stack';

function App() {
  return (


        <NativeBaseProvider>
          <RecoilRoot>
            <StackNavigation />
          </RecoilRoot>
        </NativeBaseProvider>

  );
};


export default App;