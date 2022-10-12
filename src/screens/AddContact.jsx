import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function AddContact({ navigation, route }) {
  const initialContact = route?.params?.initialContact || null;

  const [nickname, setNickname] = useState(initialContact ? initialContact.nickname : '');
  const [address, setAddress] = useState(initialContact ? initialContact.address : '');

  function onBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.title}>{initialContact ? 'Modify' : 'Add'}</Text>
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <MaterialIcons name="arrow-downward" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Nickname</Text>
          <Text style={styles.subLabel}>
            Your way to name your anonymous contact.
            This information is required to get it simpler on your device
            since public keys are pretty difficult to remind.
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Spaces are not allowed</Text>
            .
          </Text>
          <TextInput style={styles.textInput} placeholder="Nickname" value={nickname} onChangeText={setNickname} />
          <Text style={styles.label}>Public address</Text>
          <Text style={styles.subLabel}>
            Ask for your contact his public address.
            He can easily find it on the main page of the app.
            You can also either scan directly a
            {' '}
            <Text style={{ fontWeight: 'bold' }}>QR Code</Text>
            {' '}
            or import a file containing a QR Code.
          </Text>
          <View style={styles.publicKeyRow}>
            <TextInput style={styles.pubKeyInput} placeholder="Address" value={address} onChangeText={setAddress} />
            <TouchableOpacity style={styles.qrCodeScan}>
              <MaterialIcons name="qr-code" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnLabel}>Register new contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollViewContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  submitBtnLabel: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F6F1F1',
    paddingLeft: 20,
    marginTop: 20,
  },
  label: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subLabel: {
    color: '#666464',
    marginTop: 10,
  },
  publicKeyRow: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pubKeyInput: {
    width: Dimensions.get('window').width - 110,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F6F1F1',
    paddingLeft: 20,
  },
  qrCodeScan: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddContact;
