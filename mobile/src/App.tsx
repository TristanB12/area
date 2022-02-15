import React from 'react'
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from 'recoil';
import theme from './theme';
import StackNavigation from './navigation/Stack';

import './i18n'

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <RecoilRoot>
        <StackNavigation />
      </RecoilRoot>
    </NativeBaseProvider>
  );
};


export default App;