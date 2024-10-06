"use client";

import { useEffect } from "react";
import useFCMToken from "./useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/lib/FireBase";
import useGAPNotification from "@/context/NotificationContext";
import { BotStatus } from "@/consts/bot-status";
import { NotificationRes } from "@/service/notifService";
import useNotification from "antd/es/notification/useNotification";
import { NotificationMessage } from "@/consts/notification-message";
import useGAPSettings from "@/context/GAPSettingsContext";
import useToast from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function FcmTokenComp() {
    const { token, notificationPermissionStatus } = useFCMToken();
    const { data, setData } = useGAPNotification();
    const { enableNotif, setEnableNotif } = useGAPSettings();
    const { api } = useToast();
    const router = useRouter();

    const showNotif = (groupId: string, message: string, desc: string) => {
        api.error({
            message: message,
            description: desc,
            placement: 'topRight',
            className: "",
            key: groupId,
            onClick() {
                onClickToast(groupId);
            },
        });
    }

    const onClickToast = (groupId: string) => {
        router.push(`/monitoring/group/${groupId}`);
        api.destroy(groupId);
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            if (notificationPermissionStatus == 'granted') {
                const messaging = getMessaging(firebaseApp);
                onMessage(messaging, (payload) => {
                    const dataNotif = payload.data;
                    if (!dataNotif) return;
                    if (!enableNotif) return;
                    
                    const newNotif: NotificationRes = toNewNotif(dataNotif);
                    data.unshift(newNotif);
                    setData(data);

                    showNotif(
                        dataNotif.groupId,
                        NotificationMessage.of(dataNotif['type'])?.message || "Notifications", 
                        dataNotif.body
                    );
                });
            }
        }
    }, [notificationPermissionStatus]);

    return null;
}

const toNewNotif = (dataNotif: {[key: string]: string}): NotificationRes => (
    {
        botId: dataNotif['botId'],
        description: dataNotif.body,
        createdAt: Number(dataNotif['createdAt']),
        groupId: dataNotif['groupId'],
        notificationId: dataNotif['id'],
        readAt: dataNotif['readAt'] !== 'null'? Number(dataNotif['readAt']): null,
        type: dataNotif['type'] as BotStatus,
        title: '',
        updatedAt: null
    }
)