const { default: firebase } = require("firebase/compat/app");

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

self.addEventListener('fetch', () => {
    try {
        const urlParam = new URLSearchParams(location.search);
        self.firebaseConfig = Object.fromEntries(urlParam)
    } catch (err) {
        console.log('failed to add listener', err)
    }
});

self.addEventListener('notificationClick', event => {
    event.notification.close();
    const urlToOpen = event?.notification?.data?.url || '127.0.0.1:3000';

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
            // If not, open a new window/tab with the target URL
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    )
})

const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true
}

firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
    messaging = firebase.messaging.isSupported() ? firebase.messaging(): null
} catch(err) {
    console.log("failed to initialize Firebase messaging", err)
}

if (messaging) {
    try {
        messaging.onBackgroundMessage(payload => {
            console.log("Received background messaging: ", payload)
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                tag: notificationTitle,
                icon: payload.notification.image,
                data: {
                    url: payload.data.openUrl
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}