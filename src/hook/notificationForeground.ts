"use client";

import { useEffect } from "react";
import useFCMToken from "./useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/lib/FireBase";

export default function FcmTokenComp() {
    const { token, notificationPermissionStatus } = useFCMToken();

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            if (notificationPermissionStatus == 'granted') {
                const messaging = getMessaging(firebaseApp);
                const unsubscribe = onMessage(messaging, (payload) => console.log('Foreground push notification received:', payload));
                return (
                    unsubscribe()
                )
            }
        }
    }, [notificationPermissionStatus]);

    return null;
}