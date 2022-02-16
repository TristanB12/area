import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from 'recoil';
import theme from './theme';
import StackNavigation from './navigation/Stack';

import './i18n'

const queryClient = new QueryClient()

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <StackNavigation />
        </QueryClientProvider>
      </RecoilRoot>
    </NativeBaseProvider>
  );
};


export default App;