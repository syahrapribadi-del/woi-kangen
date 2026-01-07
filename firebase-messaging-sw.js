importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC3XiC7VuZbkIQxWonURDoENzHEg3jMlyo",
  projectId: "project-cintaputra",
  messagingSenderId: "983740985480",
  appId: "1:983740985480:web:cde54c774f3841ca092f3d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification("❤️ Love dari pasangan", {
    body: "Dia barusan pencet LOVE",
    vibrate: [200, 100, 200],
  });
});
