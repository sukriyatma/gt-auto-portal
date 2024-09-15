"use client";

import { NotificationRes } from "@/service/notifService";
import { createContext, useContext, useState } from "react";


interface NotificationContext {
    setData: React.Dispatch<React.SetStateAction<NotificationRes[]>>;
    data: NotificationRes[];
}


const NotificationContext = createContext<NotificationContext>({
    setData: () => {},
    data: []
})

export const NotificationProvider: React.FC<React.PropsWithChildren> = (props) => {

    const [data, setData] = useState<NotificationRes[]>([]);

    return (
        <NotificationContext.Provider 
            value={{
                setData,
                data
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

const useGAPNotification = () => {
    const data = useContext(NotificationContext);
    return {...data}
}

export default useGAPNotification;