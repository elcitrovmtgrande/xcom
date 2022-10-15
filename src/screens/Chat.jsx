/* eslint-disable react/style-prop-object */
import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import Identicon from '@polkadot/reactnative-identicon';
import { useSelector } from 'react-redux';

function Chat({ navigation, route }) {
  const { address } = route.params;

  const user = useSelector((state) => state.user);
  const { contacts } = user;

  function recipientName(recipientAddress) {
    const contact = contacts.find((c) => c.address === recipientAddress);
    const isInContact = !!contact;
    const recipient = isInContact ? contact.nickname : 'X';
    return recipient;
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <BlurView style={styles.header}>
          <SafeAreaView style={styles.safe}>
            <Identicon value={address} size={50} />
            <View style={styles.contact}>
              <Text style={styles.contactName}>{recipientName(address)}</Text>
              <Text style={styles.contactAddr}>{address}</Text>
            </View>
          </SafeAreaView>
        </BlurView>

        {/* {} */}

        <BlurView style={styles.footer}>
          <SafeAreaView style={styles.safe}>
            <TextInput placeholder="Enjoy privacy..." style={styles.input} />
            <TouchableOpacity style={styles.submit}>
              <Text>u</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </BlurView>

        <Text>/chat</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00052B',
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingLeft: 40,
    paddingBottom: 20,
    paddingRight: 40,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  safe: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contact: {
    marginLeft: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contactAddr: {
    fontSize: 12,
    color: 'white',
    width: 200,
    marginTop: 6,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 12,
  },
  submit: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgRow: {
    width: '100%',
  },
});

export default Chat;
