/* eslint-disable no-undef */
import { Keyring } from '@polkadot/keyring';
import {
  mnemonicGenerate,
  cryptoWaitReady,
} from '@polkadot/util-crypto';
import { u8aToHex, u8aToString } from '@polkadot/util';
import { getPubKeyFromAddress, encryptMessage, decryptMessage } from '../src/utils/tools';

describe('Crypto tools', () => {
  it('Gets hex public key from address string', () => {
    cryptoWaitReady().then(() => {
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
      const keypair = keyring.addFromMnemonic(mnemonicGenerate());
      const { address, publicKey } = keypair;
      expect(u8aToHex(publicKey)).toBe(getPubKeyFromAddress(address));
    });
  });

  it('Can encrypt and decrypt a message correctly', () => {
    cryptoWaitReady().then(() => {
      const sender = new Keyring({ type: 'sr25519', ss58Format: 2 });
      const senderPair = sender.addFromMnemonic(mnemonicGenerate());
      const recipient = new Keyring({ type: 'sr25519', ss58Format: 2 });
      const recipientPair = recipient.addFromMnemonic(mnemonicGenerate());

      const message = 'Mon merveilleux message';

      const encrypted = u8aToHex(senderPair.encryptMessage(message, recipient.publicKey));
      const decrypted = recipientPair.decryptMessage(encrypted);

      expect(message).toBe(u8aToString(decrypted));

      expect(message).toBe(decryptMessage({
        recipientPair,
        encrypted: encryptMessage({
          senderPair,
          message,
          recipientPubKey: getPubKeyFromAddress(recipientPair.address),
        }),
      }));
    });
  });
});
