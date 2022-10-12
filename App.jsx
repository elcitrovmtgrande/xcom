import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import MainStack from './src/router/MainStack';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ActionSheetProvider>
          <MainStack />
        </ActionSheetProvider>
      </NavigationContainer>
    </Provider>
  );
}
