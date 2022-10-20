import { Keyring } from '@polkadot/keyring';
import { decodeAddress, cryptoWaitReady, blake2AsHex } from '@polkadot/util-crypto';
import {
  u8aToHex,
} from '@polkadot/util';
import { HexString } from '@polkadot/util/types';
import { faker } from '@faker-js/faker';

export async function keypairFromSeed(seed: string) {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const keypair = keyring.addFromMnemonic(seed);
  return keypair;
}

export function getPubKeyFromAddress(addr: string) {
  const publicKey = decodeAddress(addr);
  const hexPublicKey = u8aToHex(publicKey);
  return hexPublicKey;
}

export function encryptMessage({ senderPair, message, recipientPubKey }): HexString {
  return u8aToHex(senderPair.encryptMessage(message, recipientPubKey));
}

export function decryptMessage({ recipientPair, encrypted }): string {
  return recipientPair.decryptMessage(encrypted);
}

/**
 * L'identifier est un string basé sur le sender, le recipient et l'encoded
 * Cela permettra plus tard de vérifier l'intégrité du message si nécessaire
 * @param sender 
 * @param recipient 
 * @param encoded 
 * @returns 
 */
export function identifier(sender: string, recipient: string, encoded: string): string {
  return blake2AsHex(JSON.stringify({ sender, recipient, encoded }));
  // return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
  //   const r = Math.floor(Math.random() * 16);
  //   return r.toString(16);
  // });
}

const tools = {
  keypairFromSeed, getPubKeyFromAddress, encryptMessage, decryptMessage, identifier,
};

export default tools;
