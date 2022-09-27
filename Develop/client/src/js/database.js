import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put request to update the JateDB');
  // connect tp DB and version we want to use 
  const jateDb = await openDB('jate', 1);
  // make new transaction need to specify the Db we are posting to and the data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store 
  const objStore = tx.objectStore('jate');
  // use the put() method to update the content in the Db
  const request = objStore.put({content: content});
  // confirm the data was updated
  const result = await request;
  console.log('data was updated', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
console.log('Get data from the jateDb');
// to connect the DB and version we want to use
const jateDb = await openDB('jate', 1);
// to make the transaction the need to specify the DB we are posting to and the data privileges.
const tx = jateDb.transaction('jate', 'readwrite');
// open the object store
const objStore = tx.objectStore('jate');
// we use the getAll() method to grab all the content in the DB
const request = objStore.getAll();
// to confirm the data was fetched 
const result = await request;
console.log('data saved to the jateDB', result);
return result;
}; 


initdb();
