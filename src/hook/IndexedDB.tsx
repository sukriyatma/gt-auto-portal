"use client";

import { IDBPDatabase, openDB } from "idb";
import { createContext, useEffect, useState, useContext } from "react";

const DB_NAME = 'gaportal';
const STORE_NAME = 'settings';

interface IndexDbContextType  {
    db: IDBPDatabase<any> | undefined;
    setDb: React.Dispatch<React.SetStateAction<IDBPDatabase<any> | undefined>>;
}

const IndexDbContext = createContext<IndexDbContextType >({
    db: undefined,
    setDb: () => {}
});

export const IndexDbProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [db, setDb] = useState<IDBPDatabase<any>>();

    useEffect(() => {
        const initializeDB = async () => {
            const dbInstance = await openDB(DB_NAME, 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
                    }
                }
            });

            setDb(dbInstance);
        };

        initializeDB();
    }, []);

    return (
        <IndexDbContext.Provider value={{ 
                db,
                setDb
            }}
        >
            {children}
        </IndexDbContext.Provider>
    );
};

const useIndexDb = () => {
    const data = useContext(IndexDbContext);
    return {...data}
}

export default useIndexDb;

export {DB_NAME, STORE_NAME}
