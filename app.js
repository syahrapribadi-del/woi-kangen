import { auth, provider, db, messaging } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

let user, roomId;

document.getElementById("login").onclick = async () => {
  const res = await signInWithPopup(auth, provider);
  user = res.user;
  alert("Login: " + user.email);
};

document.getElementById("join").onclick = async () => {
  roomId = document.getElementById("room").value;
  const ref = doc(db, "rooms", roomId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { count: 0, users: [user.uid] });
  } else {
    const data = snap.data();
    if (data.users.length >= 2 && !data.users.includes(user.uid)) {
      alert("Room penuh!");
      return;
    }
    await updateDoc(ref, { users: [...new Set([...data.users, user.uid])] });
  }

  document.getElementById("love").disabled = false;
};

document.getElementById("love").onclick = async () => {
  const ref = doc(db, "rooms", roomId);
  await updateDoc(ref, { count: increment(1) });
};

onMessage(messaging, payload => {
  alert(payload.notification.title);
});

getToken(messaging, { vapidKey: "BMPmphkI82B39tjZuDlZphFVfEfC9fHMNiBTJ81akeWtxmdfpoGzunFSIBkdN8pBteoBX0O45QtSp3-EetgU43A" })
.then(t => console.log("FCM Token:", t));
