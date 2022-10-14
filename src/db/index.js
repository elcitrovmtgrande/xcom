import Realm from 'realm';
import ContactSchema from './schemas/Contact';
import MessageSchema from './schemas/Message';

async function dbConnect() {
  // Open a local realm file with a particular path & predefined Car schema
  try {
    const realm = await Realm.open({
      schema: [ContactSchema, MessageSchema],
    });
    realm.close();
  } catch (err) {
    console.error('Failed to open the realm', err.message);
  }
}

export default dbConnect;
