import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';

function NewMessage({ navigation, route }) {
  const initialContact = route?.params?.initialContact || null;

  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');

  function onBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.title}>Write</Text>
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <MaterialIcons name="arrow-downward" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>To</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Search by nickname"
            placeholderTextColor={colors.black}
            value={nickname}
            onChangeText={setNickname} />
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholderTextColor={colors.black}
            placeholder="What does matter today ?"
            value={content}
            onChangeText={setContent}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnLabel}>START CONVERSATION</Text>
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
  top: {},
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
  contentInput: {
    width: '100%',
    marginTop: 20,
    minHeight: 200,
    borderRadius: 10,
    backgroundColor: colors.compute('white', 60),
    paddingLeft: 20,
  },
});

export default NewMessage;
