'use client';

import { ServerEndpoint } from "@/consts/server-endpoint";
import firebaseApp from "@/lib/FireBase";
import server from "@/lib/server";
import { getMessaging, getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "dotenv/config";

const useFCMToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');
    const session = useSession();

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    const messaging = getMessaging(firebaseApp);
    
                    const permission = await Notification.requestPermission();
                    setNotificationPermissionStatus(permission);

                    if (permission === 'granted') {
                        const currentToken = await getToken(messaging, {
                            vapidKey: process.env.FIREBASE_VAPID_KEY
                        });
                        
                        if (session.status === "authenticated") {
                            await server.post(ServerEndpoint.UPDATE_FCM_TOKEN, {
                                fcmToken: currentToken
                            });
                            
                            setToken(currentToken);
                        }
                    }
                }
                
            } catch (error) {
                
            }
        }

        retrieveToken();
    }, [])

    return {token ,notificationPermissionStatus}
}

export default useFCMToken;