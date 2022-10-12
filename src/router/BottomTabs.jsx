import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Messages from '../screens/Messages';
import Settings from '../screens/Settings';
import Contacts from '../screens/Contacts';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: 'black',
      }}
      initialRouteName="Contacts"
    >
      <Tab.Screen
        name="Messages"
        component={Messages}
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
            <MaterialCommunityIcons name="account-settings-outline" size={size * 1.2} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
