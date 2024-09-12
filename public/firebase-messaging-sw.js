// const { default: firebase } = require("firebase/compat/app");

importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// self.addEventListener('notificationClick', event => {
//     event.notification.close();
//     const urlToOpen = event?.notification?.data?.url || '127.0.0.1:3000';

//     event.waitUntil(
//         clients.matchAll({
//             type: 'window',
//         })
//         .then(windowClients => {
//             for (const client of windowClients) {
//                 if (client.url === urlToOpen && 'focus' in client) {
//                   return client.focus();
//                 }
//             }
//             // If not, open a new window/tab with the target URL
//             if (clients.openWindow) {
//                 return clients.openWindow(urlToOpen);
//             }
//         })
//     )
// })

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

messaging.onBackgroundMessage(payload => {
    console.log("Receive notif onBackground :" ,payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        tag: notificationTitle,
        icon: payload.notification.image,
        data: {
            url: payload.data.url
        }
    }

    return self.registration.showNotification(notificationTitle, notificationOptions);
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
                    // If not, open a new window/tab with the target URL
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
        )

        event.notification.close();
    }
})