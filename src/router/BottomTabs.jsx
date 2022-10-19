import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Identicon from '@polkadot/reactnative-identicon';
import Inbox from '../screens/Inbox';
import Settings from '../screens/Settings';
import Contacts from '../screens/Contacts';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const user = useSelector((state) => state.user);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: 'black',
      }}
      initialRouteName="Inbox"
    >
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-lock-outline" size={size * 1.2} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" size={size * 1.2} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.pp, { borderColor: color }]}>
              <Identicon
                style={styles.pp}
                value={user.address}
                size={size * 1.2}
              />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  pp: {
    borderWidth: 2,
    borderRadius: 100,
    padding: 2,
  },
});

export default BottomTabs;
