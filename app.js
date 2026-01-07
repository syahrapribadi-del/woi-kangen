import { auth, provider, db, messaging } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

let user = null;
let roomId = null;

onAuthStateChanged(auth, (u) => {
  if (u) {
    user = u;
    console.log("User ready:", user.uid);
  }
});

document.getElementById("login").onclick = async () => {
  await signInWithPopup(auth, provider);
};

document.getElementById("join").onclick = async () => {
  if (!user) {
    alert("Login dulu bro 😅");
    return;
  }

  roomId = document.getElementById("room").value.trim();
  if (!roomId) {
    alert("Masukin kode jadian dulu");
    return;
  }

  const ref = doc(db, "rooms", roomId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      count: 0,
      users: [user.uid],
      createdAt: Date.now()
    });
  } else {
    const data = snap.data();
    if (data.users.length >= 2 && !data.users.includes(user.uid)) {
      alert("Room penuh 🛑");
      return;
    }
    await updateDoc(ref, {
      users: Array.from(new Set([...data.users, user.uid]))
    });
  }

  document.getElementById("love").disabled = false;
  alert("Room joined ❤️");
};

document.getElementById("love").onclick = async () => {
  if (!roomId) return;
  await updateDoc(doc(db, "rooms", roomId), {
    count: increment(1)
  });
};

getToken(messaging, {
  vapidKey: "BMPmphkI82B39tjZuDlZphFVfEfC9fHMNiBTJ81akeWtxmdfpoGzunFSIBkdN8pBteoBX0O45QtSp3-EetgU43A"
}).then(token => {
  console.log("FCM Token:", token);
});

onMessage(messaging, payload => {
  alert(payload.notification?.title || "❤️ Love masuk");
});
