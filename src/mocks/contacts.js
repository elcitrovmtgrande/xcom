// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import {
  mnemonicGenerate,
} from '@polkadot/util-crypto';

import { Keyring } from '@polkadot/keyring';

function generateContacts(length) {
  const contacts = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

    const mnemonic = mnemonicGenerate();

    const pair = keyring.addFromUri(mnemonic, { name: 'Sender pair' }, 'ed25519');

    const user = {
      nickname: faker.internet.userName(),
      address: pair.address,
    };

    contacts.push(user);
  }

  return contacts;
}

export default generateContacts;
