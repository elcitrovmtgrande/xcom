import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="InApp">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="InApp" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default MainStack;
