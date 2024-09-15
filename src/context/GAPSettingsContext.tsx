"use client";

import useIndexDb, { DB_NAME, STORE_NAME } from "@/hook/IndexedDB";
import { IDBPDatabase, openDB } from "idb";
import { createContext, useContext, useEffect, useState } from "react";

interface GAPSettingsContext {
    enableNotif: boolean;
    enableNotifBg: boolean;
    enableAutoUpdate: boolean;
    setEnableNotif: React.Dispatch<React.SetStateAction<boolean>>;
    setEnableNotifBg: React.Dispatch<React.SetStateAction<boolean>>;
    setEnableAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const GAPSettingsContext = createContext<GAPSettingsContext>({
    enableNotif: true,
    enableNotifBg: true,
    enableAutoUpdate: true,
    setEnableNotif: () => {},
    setEnableNotifBg: () => {},
    setEnableAutoUpdate: () => {}
});

export const GAPSettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const [enableNotif, setEnableNotif] = useState<boolean>(true);
    const [enableNotifBg, setEnableNotifBg] = useState<boolean>(true);
    const [enableAutoUpdate, setEnableAutoUpdate] = useState<boolean>(true);
    const {db, setDb} = useIndexDb();
    
    useEffect( () => {
        
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
    }, [])

    useEffect( () => {
        const setUp = async () => {
            setEnableNotif(localStorage.getItem('GAP_NOTIF') === 'ENABLE');
            setEnableAutoUpdate(localStorage.getItem('GAP_AUTO_UPDATE') === 'ENABLE');

            const notifBgSetting = await db?.get(STORE_NAME, "GAP_NOTIF_BG")
            setEnableNotifBg(notifBgSetting && notifBgSetting.value === 'DISABLE'? false: true);
        }
        setUp()
    }, [db])

    useEffect( () => {
        localStorage.setItem("GAP_NOTIF", enableNotif? "ENABLE": "DISABLE");
    }, [enableNotif]);

    useEffect( () => {
        const item = {
            name: "GAP_NOTIF_BG", 
            value: enableNotifBg? 'ENABLE': 'DISABLE'
        }
        db?.put(STORE_NAME, item)
    }, [enableNotifBg]);

    useEffect( () => {
        localStorage.setItem("GAP_AUTO_UPDATE", enableAutoUpdate? 'ENABLE': 'DISABLE');
    }, [enableAutoUpdate]);

    return (
        <GAPSettingsContext.Provider
            value={{
                enableNotif,
                enableNotifBg,
                enableAutoUpdate,
                setEnableNotif,
                setEnableNotifBg,
                setEnableAutoUpdate
            }}
        >
            {children}
        </GAPSettingsContext.Provider>
    )
}

const useGAPSettings = () => {
    const data = useContext(GAPSettingsContext);
    return {...data}
}

export default useGAPSettings;