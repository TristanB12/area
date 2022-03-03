import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from 'recoil';
import theme from './theme';
import StackNavigation from './navigation/Stack';
import { colorModeManager } from './navigation/onAppStart';
import './i18n'

const queryClient = new QueryClient()

function App() {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <StackNavigation />
        </QueryClientProvider>
      </RecoilRoot>
    </NativeBaseProvider>
  );
};


export default App;