import { Keyring } from '@polkadot/keyring';

function keypairFromSeed(seed) {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const keypair = keyring.addFromMnemonic(seed);
  return keypair;
}

const tools = {
  keypairFromSeed,
};

export default tools;
export { keypairFromSeed };
