import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3XiC7VuZbkIQxWonURDoENzHEg3jMlyo",
  authDomain: "project-cintaputra.firebaseapp.com",
  projectId: "project-cintaputra",
  storageBucket: "project-cintaputra.appspot.com",
  messagingSenderId: "983740985480",
  appId: "1:983740985480:web:cde54c774f3841ca092f3d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const messaging = getMessaging(app);
