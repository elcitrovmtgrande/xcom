/* eslint-disable no-underscore-dangle */
import * as SQLite from 'expo-sqlite';

class Database {
  constructor() {
    this.db = SQLite.openDatabase('db.db');
    this.init();
  }

  init() {
    return new Promise((fnResolve, fnReject) => {
      try {
        this.db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS contacts (address text primary key not null, nickname text);',
          );
        });
        this.db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS chats (uuid text primary key not null, sender TEXT, recipient TEXT, encoded TEXT, decoded TEXT, sentAt TEXT, deliveredAt TEXT, readAt TEXT);',
          );
        });
      } catch (e) {
        fnReject();
      }
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
          tx.executeSql('SELECT * FROM chats', [], (_, { rows }) => {
            fnResolve(rows._array);
          });
        },
      );
    });
  }
}

const db = new Database();

export default db;
