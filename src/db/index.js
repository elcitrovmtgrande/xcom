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
            'create table if not exists CONTACTS (address text primary key not null, nickname text);',
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
          tx.executeSql('insert into CONTACTS (address, nickname) values (?, ?)', [address, nickname]);
          tx.executeSql('select * from CONTACTS', [], (_, { rows }) => {
            console.log(JSON.stringify(rows));
            fnResolve();
          });
        },
        null,
        () => {}, // forceUpdate
      );
    });
  }

  getContacts() {
    return new Promise((fnResolve, fnReject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql('select * from CONTACTS', [], (_, { rows }) => {
            fnResolve(rows._array);
          });
        },
      );
    });
  }
}

const db = new Database();

export default db;
