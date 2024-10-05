'use client';

import { ServerEndpoint } from "@/consts/server-endpoint";
import firebaseApp from "@/lib/FireBase";
import server from "@/lib/server";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

const useFCMToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    const messaging = getMessaging(firebaseApp);
    
                    const permission = await Notification.requestPermission();
                    setNotificationPermissionStatus(permission);

                    if (permission === 'granted') {
                        const currentToken = await getToken(messaging, {
                            vapidKey: "BAnQRq4ItH8Fae4_63mDpBkKip9iTCErUgftTI0wyaUygXvq8KMZrJdYwIfvJ5BuitBCshYqiVdU7BqTtNX9EhA"
                        });
                        
                        await server.post(ServerEndpoint.UPDATE_FCM_TOKEN, {
                            fcmToken: currentToken
                        });
                        
                        setToken(currentToken);
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