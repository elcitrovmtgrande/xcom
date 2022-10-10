import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/router/MainStack';
// import * as openpgp from 'openpgp';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
