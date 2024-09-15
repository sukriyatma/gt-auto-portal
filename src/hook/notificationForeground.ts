"use client";

import { useEffect } from "react";
import useFCMToken from "./useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/lib/FireBase";
import useGAPNotification from "@/context/NotificationContext";
import { BotStatus } from "@/consts/bot-status";
import { BotActivity } from "@/consts/bot-activity";
import { NotificationRes } from "@/service/notifService";
import useNotification from "antd/es/notification/useNotification";
import { NotificationMessage } from "@/consts/notification-message";
import useGAPSettings from "@/context/GAPSettingsContext";

export default function FcmTokenComp() {
    const { token, notificationPermissionStatus } = useFCMToken();
    const { data, setData } = useGAPNotification();
    const { enableNotif, setEnableNotif } = useGAPSettings();
    const [api, contextHolder] = useNotification();

    const showNotif = (type: string, desc: string) => {
        api.open({
            type: 'warning',
            message: type,
            description: desc,
            placement: 'topRight'
        });
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            if (notificationPermissionStatus == 'granted') {
                const messaging = getMessaging(firebaseApp);
                onMessage(messaging, (payload) => {
                    const dataNotif = payload.data;
                    if (!dataNotif) return;
                    if (!enableNotif) return;
                    
                    const newNotif: NotificationRes = toNewNotif(dataNotif, payload.notification?.body + '');
                    data.unshift(newNotif);
                    setData(data);
                    showNotif(getNotifMessage(dataNotif['type']), payload.notification?.body + '')
                });
            }
        }
    }, [notificationPermissionStatus]);

    return null;
}

const getNotifMessage = (type: string): string => {
    let message: string = '';
    if (type === NotificationMessage.DISCONNECTED) message = NotificationMessage.DISCONNECTED
    if (type === NotificationMessage.DISCONNECTED) message = NotificationMessage.DISCONNECTED
    if (type === NotificationMessage.DISCONNECTED) message = NotificationMessage.DISCONNECTED
    if (type === NotificationMessage.DISCONNECTED) message = NotificationMessage.DISCONNECTED;

    return message;
}

const toNewNotif = (dataNotif: {[key: string]: string}, desc: string): NotificationRes => (
    {
        botId: dataNotif['botId'],
        description: desc,
        createdAt: Number(dataNotif['createdAt']),
        groupId: dataNotif['groupId'],
        notificationId: dataNotif['id'],
        readAt: dataNotif['readAt'] !== 'null'? Number(dataNotif['readAt']): null,
        type: dataNotif['type'] as BotStatus,
        title: '',
        updatedAt: null
    }
)