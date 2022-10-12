import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
// import RSAKey from 'react-native-rsa';
// import { RSA } from 'react-native-rsa-native';
import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  ed25519PairFromSecret,
} from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a, u8aToHex, u8aToString } from '@polkadot/util';
import Identicon from '@polkadot/reactnative-identicon';

function Settings() {
  // async function onPress() {
  //   const bits = 1024;
  //   const exponent = '1001'; // must be a string. This is hex string. decimal = 65537
  //   const rsa = new RSAKey();
  //   rsa.generate(bits, exponent);
  //   const publicKey = rsa.getPublicString(); // return json encoded string
  //   console.log(publicKey);
  //   const privateKey = rsa.getPrivateString(); // return json encoded string
  //   console.log(privateKey);
  //   const originText = 'yo yo yo';
  //   rsa.setPublicString(publicKey);
  //   const encrypted = rsa.encrypt(originText);
  //   console.log(encrypted);
  //   rsa.setPrivateString(privateKey);
  //   const decrypted = rsa.decrypt(encrypted); // decrypted == originText
  //   console.log(decrypted);
  // }

  // async function rsa() {
  //   const message = 'my secret message';

  //   RSA.generateKeys(4096) // set key size
  //     .then((keys) => {
  //       console.log('4096 private:', keys.private); // the private key
  //       console.log('4096 public:', keys.public); // the public key
  //       RSA.encrypt(message, keys.public)
  //         .then((encodedMessage) => {
  //           console.log(`the encoded message is ${encodedMessage}`);
  //           RSA.decrypt(encodedMessage, keys.private)
  //             .then((decryptedMessage) => {
  //               console.log(`The original message was ${decryptedMessage}`);
  //             });
  //         });
  //     });
  // }

  async function keyringFx() {
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

    const mnemonic = mnemonicGenerate();

    console.log(mnemonic);
    // create & add the pair to the keyring with the type and some additional
    // metadata specified
    const senderPair = keyring.addFromUri('ritual fever hawk rude horror art matrix exile border hand kingdom visual', { name: 'Sender pair' }, 'ed25519');
    const receiverPair = keyring.addFromUri(mnemonicGenerate(), { name: 'Receiver pair' }, 'ed25519');

    // the pair has been added to our keyring
    console.log(keyring.pairs.length, 'pairs available');

    // log the name & address (the latter encoded with the ss58Format)
    console.log(senderPair.meta.name, 'has address', senderPair.address);
    console.log(receiverPair.meta.name, 'has address', receiverPair.address);

    const message = 'Je vais révolutionner le monde des communications.';
    console.log('message encodé:', stringToU8a(message));

    const encryptedMessage = senderPair.encryptMessage(message, receiverPair.publicKey);
    console.log('encryptedMessage:', encryptedMessage);
    const encryptedMessageString = u8aToString(encryptedMessage);
    const encryptedMessageHex = u8aToHex(encryptedMessage);
    console.log('encryptedMessageString:', encryptedMessageString);
    console.log('encryptedMessageHex:', encryptedMessageHex);

    const decryptedMessage = receiverPair.decryptMessage(encryptedMessage, senderPair.publicKey);
    console.log('decryptedMessage:', u8aToString(decryptedMessage));
  }

  // async function polkadot() {
  //   try {
  //     // Create mnemonic string for Alice using BIP39
  //     const mnemonicAlice = mnemonicGenerate();

  //     console.log(`Generated mnemonic: ${mnemonicAlice}`);

  //     // Validate the mnemonic string that was generated
  //     const isValidMnemonic = mnemonicValidate(mnemonicAlice);

  //     console.log(`isValidMnemonic: ${isValidMnemonic}`);

  //     // Create valid Substrate-compatible seed from mnemonic
  //     const seedAlice = mnemonicToMiniSecret(mnemonicAlice);

  //     console.log(seedAlice);

  //     // Generate new public/secret keypair for Alice from the supplied seed
  //     const { publicKey, secretKey } = ed25519PairFromSecret(seedAlice);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <View style={styles.container}>
      <Text>/Settings</Text>
      <TouchableOpacity onPress={keyringFx}>
        <Text>Go</Text>
      </TouchableOpacity>
      <Identicon
        value="FT3T42wASNbFQ4oCPgVcMyzQejdPD5r4dMwuhp6Qhy888hS"
        size={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
