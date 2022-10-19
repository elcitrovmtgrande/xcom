import { Keyring } from '@polkadot/keyring';
import { decodeAddress, cryptoWaitReady } from '@polkadot/util-crypto';
import {
  u8aToHex,
} from '@polkadot/util';
import { HexString } from '@polkadot/util/types';

async function keypairFromSeed(seed: string) {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const keypair = keyring.addFromMnemonic(seed);
  return keypair;
}

function getPubKeyFromAddress(addr: string) {
  const publicKey = decodeAddress(addr);
  const hexPublicKey = u8aToHex(publicKey);
  return hexPublicKey;
}

function encryptMessage({ senderPair, message, recipientPubKey }): HexString {
  return u8aToHex(senderPair.encryptMessage(message, recipientPubKey));
}

function decryptMessage({ recipientPair, encrypted }): string {
  return recipientPair.decryptMessage(encrypted);
}

function identifier(): string {  
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
      const r = Math.floor(Math.random() * 16);  
      return r.toString(16);  
});  
}

const tools = {
  keypairFromSeed, getPubKeyFromAddress, encryptMessage, decryptMessage, identifier,
};

export default tools;
export {
  keypairFromSeed, getPubKeyFromAddress, encryptMessage, decryptMessage, identifier,
};
