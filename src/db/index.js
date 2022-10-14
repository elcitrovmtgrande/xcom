/* eslint-disable no-underscore-dangle */
import * as SQLite from 'expo-sqlite';

class Database {
  constructor() {
    this.db = SQLite.openDatabase('db.db');
    this.initContactTable();
  }

  initContactTable() {
    return new Promise((fnResolve, fnReject) => {
      try {
        this.db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS contacts (address text primary key not null, nickname text);',
          );
        });
        fnResolve(true);
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
}

const db = new Database();

export default db;
