import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Messages from '../screens/Messages';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
