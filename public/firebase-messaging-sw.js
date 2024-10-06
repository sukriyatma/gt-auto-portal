importScripts('db/gap-settings-db.js');

importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBtTtL_tQNOy39fNZBJFNULEIPSteolOC4",
    authDomain: "gt-auto-portal.firebaseapp.com",
    projectId: "gt-auto-portal",
    storageBucket: "gt-auto-portal.appspot.com",
    messagingSenderId: "362269636344",
    appId: "1:362269636344:web:9ef717dc1fb59e841a2d0d",
    measurementId: "G-RHMW1YD33D"
};

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
    const notifBgSetting = await getItem("GAP_NOTIF_BG");
    if (notifBgSetting && notifBgSetting.value === 'DISABLE') return;
    
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        data: {
            url: payload.data.url
        },
        timestamp: Number(payload.data.createdAt)
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event?.notification?.data) {
        const data = event.notification.data;
        const urlToOpen = data.url;

        event.waitUntil(
                clients.matchAll({
                    type: 'window',
                })
                .then(windowClients => {
                    for (const client of windowClients) {
                        if (client.url === urlToOpen && 'focus' in client) {
                            return client.focus();
                        }
                    }

                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
        )

        event.notification.close();
    }
})