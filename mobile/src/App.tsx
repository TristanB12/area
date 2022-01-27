import React from 'react'
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from 'recoil';
import theme from './theme';
import StackNavigation from './navigation/Stack';

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