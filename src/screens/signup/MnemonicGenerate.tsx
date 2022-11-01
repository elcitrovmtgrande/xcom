import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  mnemonicGenerate,
} from '@polkadot/util-crypto';

function MnemonicGenerate({ navigation }) {
  const [mnemonic, setMnemonic] = useState<string[]>(mnemonicGenerate().split(' '));

  function changeMnemonic() {
    setMnemonic(mnemonicGenerate().split(' '));
  }

  function onNext() {
    navigation.navigate('MnemonicVerify', { seedphrase: mnemonic });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your <Text style={{ color: '#00FFA3' }}>seedphrase</Text>.</Text>
      <Text style={styles.subtitle}>
        Your account only remains on these words.
        The order matters. As we do not store your seedphrase and any informations,
        please be sure to keep it in your mind or in a safe place to ensure never
        losing your account.
      </Text>
      <View style={styles.mnemonicContainerContainer}>
        <View style={styles.mnemonicContainer}>
          {mnemonic.map((w, i) => (
            <View key={String(i)} style={styles.wordContainer}>
              <Text style={styles.word}>{w}</Text>
            </View>

          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.shuffleBtn} onPress={changeMnemonic}>
        <Text style={styles.shuffle}>Roll words</Text>
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
    backgroundColor: '#00052B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: '900',
    color: 'white',
    lineHeight: 58,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  mnemonicContainerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    paddingTop: 6,
    marginTop: 40,
  },
  mnemonicContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  wordContainer: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: 'white',
    marginTop: 6,
    marginLeft: 4,
  },
  word: {
    fontSize: 16,
    color: '#00052B',
    fontWeight: 'bold'
  },
  shuffleBtn: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 40,
  },
  shuffle: {
    color: '#00052B',
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 20,
  },
  btn: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#00FFA3',
    marginTop: 40,
  },
  btnLabel: {
    color: '#00052B',
    textTransform: 'uppercase',
    fontWeight: "900",
    fontSize: 20,
  },
});

export default MnemonicGenerate;
