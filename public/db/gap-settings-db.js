
const DB_NAME = "gaportal"
const STORE_NAME = 'settings'

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: "name"});
            }
        }

        request.onsuccess = (event) => {
            resolve(event.target.result);
        }

        request.onerror = (event) => {
            reject(event.target.error)
        }
    });

}

const addItem = async ({name, value}) => {
    const db = await openDB();

    return new Promise( (resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({name, value});

        request.onsuccess = (event) => {
            resolve();
        }

        request.onerror = (event) => {
            reject(event.target.result);
        }
    });
}

const getItem = async (name) => {
    const db = await openDB();

    return new Promise( (resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(name);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

exports = {openDB, addItem, getItem}