import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  mnemonicGenerate,
} from '@polkadot/util-crypto';

function MnemonicGenerate({ navigation }) {
  const [mnemonic, setMnemonic] = useState(mnemonicGenerate());

  function changeMnemonic() {
    setMnemonic(mnemonicGenerate());
  }

  function onNext() {
    console.log(mnemonic);
    navigation.navigate('MnemonicVerify', { seedphrase: mnemonic });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your seedphrase</Text>
      <Text style={styles.subtitle}>
        Your account only remains on these words.
        The order matters. As we do not store your seedphrase and any informations,
        please be sure to keep it in your mind or in a safe place to ensure never
        losing your account.
      </Text>
      <View style={styles.mnemonicContainer}>
        <Text style={styles.mnemonic}>{mnemonic}</Text>
      </View>
      <TouchableOpacity style={styles.shuffleBtn} onPress={changeMnemonic}>
        <Text style={styles.shuffle}>Change words</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onNext}>
        <Text style={styles.btnLabel}>Next</Text>
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  mnemonicContainer: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginTop: 40,
  },
  mnemonic: {
    fontSize: 16,
  },
  shuffleBtn: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffle: {
    marginTop: 40,
  },
  btn: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'black',
    marginTop: 40,
  },
  btnLabel: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default MnemonicGenerate;
