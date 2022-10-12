import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import BottomTabs from './BottomTabs';
import MnemonicGenerate from '../screens/signup/MnemonicGenerate';
import MnemonicVerify from '../screens/signup/MnemonicVerify';
import AddContact from '../screens/AddContact';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InApp"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MnemonicGenerate"
        component={MnemonicGenerate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MnemonicVerify"
        component={MnemonicVerify}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
