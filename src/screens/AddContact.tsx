import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { updateContacts } from '../store/features/userSlice';
import db from '../db';
import Popup from '../utils/Popup';
import v from '../utils/validation';
import { Contact } from '../types';
import { colors } from '../theme';

function AddContact({ navigation, route }) {
  const contacts = useSelector((state: any) => state.user.contacts);
  const initialContact = route?.params?.initialContact || null;
  const editMode = !!initialContact;

  const [nickname, setNickname] = useState(editMode ? initialContact.nickname : '');
  const [address, setAddress] = useState(editMode ? initialContact.address : '');

  const dispatch = useDispatch();

  function onBack() {
    navigation.goBack();
  }

  async function onSave() {
    if (!v.user.nickname(nickname)) {
      Popup.message('Nickname gotta have at least a 2 chars length');
    } else if (!v.user.address(address)) {
      Popup.message('Address is invalid. Did you type it corrrectly ?');
    } else if (contacts.find((c: Contact) => c.address === address)) {
      Popup.message('This address is already registered in your contacts.');
    } else {
      await db.saveContact({
        address,
        nickname,
      });
      const updatedContacts: Contact[] = await db.getContacts();
      dispatch(updateContacts(updatedContacts));
      navigation.goBack();
    }
  }

  async function onCopy() {
    await Clipboard.setStringAsync(address);
    Popup.message('Copied to clipboard');
  }

  async function onModify() {
    if (!v.user.nickname(nickname)) {
      Popup.message('Nickname gotta have at least a 2 chars length');
    } else {
      await db.updateContact({
        address,
        nickname,
      });
      const updatedContacts = await db.getContacts();
      dispatch(updateContacts(updatedContacts));
      navigation.goBack();
    }
  }

  async function onPaste() {
    // TODO
    const addr = await Clipboard.getStringAsync();
    setAddress(addr);
    Popup.message('Pasted from clipboard');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.title}>{initialContact ? 'Modify' : 'Add'}</Text>
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <MaterialIcons name="arrow-downward" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Nickname</Text>
          <Text style={styles.subLabel}>
            Your way to name your anonymous contact.
            This information is required to get it simpler on your device
            since public keys are pretty difficult to remind.
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>At least two chars. Spaces are not allowed</Text>
            .
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nickname"
            placeholderTextColor={colors.black}
            value={nickname}
            onChangeText={setNickname} />
          <Text style={styles.label}>Public address</Text>
          <Text style={styles.subLabel}>
            Ask for your contact his public address.
            He can easily find it on the main page of the app.
            Then, you paste it directly using the
            {' '}
            <Text style={{ fontWeight: 'bold' }}>paste button</Text>
            {' '}
            aside.
          </Text>
          <View style={styles.publicKeyRow}>
            <TextInput
              style={[styles.pubKeyInput, editMode && { color: colors.black }]}
              placeholderTextColor={colors.black}
              placeholder="Address"
              autoComplete="off"
              editable={!editMode}
              value={address}
              onChangeText={setAddress}
            />
            {editMode ? (
              <TouchableOpacity style={styles.qrCodeScan} onPress={onCopy}>
                <MaterialIcons name="content-copy" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.qrCodeScan} onPress={onPaste}>
                <FontAwesome5 name="paste" size={24} color={colors.black} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={editMode ? onModify : onSave}>
          <Text style={styles.submitBtnLabel}>
            {editMode ? 'Modify' : 'Register new contact'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
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
  top: {},
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
    fontSize: 60,
    fontWeight: '900',
    color: colors.white,
    lineHeight: 60,
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  submitBtnLabel: {
    color: colors.black,
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.compute('white', 60),
    paddingLeft: 20,
    marginTop: 20,
  },
  label: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  subLabel: {
    color: colors.white,
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
    backgroundColor: colors.compute('white', 60),
    paddingLeft: 20,
  },
  qrCodeScan: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddContact;
