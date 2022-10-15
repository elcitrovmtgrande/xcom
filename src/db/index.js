/* eslint-disable no-underscore-dangle */
import * as SQLite from 'expo-sqlite';

class Database {
  constructor() {
    this.db = SQLite.openDatabase('test.db');
    this.init();
  }

  init() {
    return new Promise((fnResolve, fnReject) => {
      try {
        this.db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS contacts (address TEXT PRIMARY KEY NOT NULL, nickname text);',
          );
        });
        this.db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS chats (identifier TEXT PRIMARY KEY NOT NULL, sender TEXT, recipient TEXT, encoded TEXT, decoded TEXT, sentAt TEXT, deliveredAt TEXT, readAt TEXT);',
          );
        });
      } catch (e) {
        fnReject();
      }
    });
  }

  clear() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM contacts',
      );
    });
    this.db.transaction((tx) => {
      tx.executeSql(
        'DELETE from chats',
      );
    });
  }

  saveContact(contact) {
    const { address, nickname } = contact;
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql('INSERT INTO contacts (address, nickname) VALUES (?, ?)', [address, nickname]);
          tx.executeSql('SELECT * FROM contacts', [], (_, { rows }) => {
            fnResolve();
          });
        },
        null,
        () => {}, // forceUpdate function
      );
    });
  }

  getContacts() {
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql('SELECT * FROM contacts', [], (_, { rows }) => {
            fnResolve(rows._array);
          });
        },
      );
    });
  }

  updateContact(contact) {
    const { nickname, address } = contact;
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(`UPDATE contacts SET nickname = '${nickname}' WHERE address = '${address}'`, [], () => fnResolve);
          fnResolve();
        },
        null,
        () => {}, // forceUpdate
      );
    });
  }

  deleteContact(contact) {
    const { address } = contact;
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(`DELETE FROM contacts WHERE address = '${address}'`, [], () => fnResolve);
          fnResolve();
        },
        null,
        () => {}, // forceUpdate f(x)
      );
    });
  }

  getMessages() {
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql('SELECT * FROM chats ORDER BY sentAt DESC', [], (_, { rows }) => {
            fnResolve(rows._array);
          });
        },
      );
    });
  }

  /**
   * {
      id: faker.datatype.uuid(),
      sender: isSender() ? userPair.address : contact.address,
      recipient: isSender() ? contact.address : userPair.address,
      decoded: content,
      encoded: u8aToHex(userPair.encryptMessage(message, contact.contactPublicKey)),
      sentAt: faker.date.past().toJSON(),
      receivedAt: moment().toJSON(),
      readAt: faker.date.future().toJSON(),
    };} message
   */

  saveMessage(message) {
    const {
      identifier, sender, recipient, encoded, decoded, sentAt, deliveredAt, readAt,
    } = message;
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql('INSERT INTO chats (identifier, sender, recipient, encoded, decoded, sentAt, deliveredAt, readAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            identifier, sender, recipient, encoded, decoded, sentAt, deliveredAt, readAt,
          ], () => {}, (error, err) => {
            console.log(error, err);
          });
          tx.executeSql('SELECT * FROM chats', [], (_, { rows }) => {
            fnResolve(rows._array);
          }, (error, err) => {
            console.log(error, err);
          });
        },
        null,
        () => {}, // forceUpdate function
      );
    });
  }
}

const db = new Database();

export default db;
