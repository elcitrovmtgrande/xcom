/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TextInput, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import Identicon from '@polkadot/reactnative-identicon';
import { useSelector } from 'react-redux';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

function Chat({ route }) {
  const { address, conversation } = route.params;
  const user = useSelector((state) => state.user);
  const { contacts } = user;

  const [lock, setLock] = useState(false);

  function recipientName(recipientAddress) {
    const contact = contacts.find((c) => c.address === recipientAddress);
    const isInContact = !!contact;
    const recipient = isInContact ? contact.nickname : 'X';
    return recipient;
  }

  function lockToggle() {
    setLock(!lock);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* <BlurView intensity={100} style={styles.header}>
          <SafeAreaView style={styles.safe}>
            <Identicon value={address} size={50} />
            <View style={styles.contact}>
              <Text style={styles.contactName}>{recipientName(address)}</Text>
              <Text style={styles.contactAddr}>{address}</Text>
            </View>
          </SafeAreaView>
        </BlurView> */}
        <View style={styles.listWrapper}>
          <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
            {conversation.map((message) => {
              const isSender = message.sender === user.address;
              return (
                <View
                  key={message.identifier}
                  style={[
                    styles.msgRow,
                    isSender && styles.msgRowSender,
                  ]}
                >
                  <View style={[styles.msg, isSender && styles.msgSender]}>
                    <Text style={styles.msgContent}>
                      {lock ? message.encoded : message.decoded}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.headerContainer}>
          <BlurView
            tint="light"
            intensity={50}
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 20,
            }}
          >
            <SafeAreaView style={styles.safe}>
              <View style={styles.headerLeft}>
                <Identicon value={address} size={50} />
                <View style={styles.contact}>
                  <Text style={styles.contactName}>{recipientName(address)}</Text>
                  <Text style={styles.contactAddr}>{address}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={lockToggle}>
                {lock ? (
                  <MaterialCommunityIcons name="lock" size={30} color="white" />
                ) : (
                  <MaterialCommunityIcons name="lock-open" size={30} color="white" />
                )}
              </TouchableOpacity>
            </SafeAreaView>
          </BlurView>
        </View>
        <View style={styles.bottomContainer}>
          <SafeAreaView style={styles.safe}>
            <TextInput placeholder="Enjoy privacy..." style={styles.input} />
            <TouchableOpacity style={styles.send}>
              <FontAwesome5 name="telegram-plane" size={24} color="#00052B" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E3E3E3',
    paddingLeft: 20,
    paddingRight: 20,
  },
  send: {
    width: 50,
    height: 50,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  safe: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  submit: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    height: Dimensions.get('window').height,
    flexDirection: 'column-reverse',
  },
  listWrapper: {
    width: '100%', minHeight: '100%', justifyContent: 'flex-end',
  },
  listContentContainer: {
    // paddingTop: 100,
    // paddingBottom: 200,
  },
  scrollViewContentContainer: {
    paddingTop: 140, paddingBottom: 100, justifyContent: 'flex-end',
  },
  msgRow: {
    width: '100%',
  },
  msgRowSender: {
    width: '100%',
    alignItems: 'flex-end',
  },
  msg: {
    padding: 20,
    backgroundColor: '#C0E1FF',
    width: 300,
    marginLeft: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  msgSender: {
    backgroundColor: '#006FD6',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

export default Chat;
