import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import MainStack from './src/router/MainStack';
// import * as openpgp from 'openpgp';

export default function App() {
  return (
    <NavigationContainer>
      <ActionSheetProvider>
        <MainStack />
      </ActionSheetProvider>
    </NavigationContainer>
  );
}
