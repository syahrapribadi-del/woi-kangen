// 🔥 FIREBASE CONFIG (PUNYA LU)
const firebaseConfig = {
  apiKey: "AIzaSyC3XiC7VuZbkIQxWonURDoENzHEg3jMlyo",
  authDomain: "project-cintaputra.firebaseapp.com",
  databaseURL: "https://project-cintaputra-default-rtdb.firebaseio.com",
  projectId: "project-cintaputra",
  storageBucket: "project-cintaputra.appspot.com",
  messagingSenderId: "983740985480",
  appId: "1:983740985480:web:c57d78d63f14806a092f3d"
};

// INIT FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ROLE (SATU HP "cowok", SATU "cewek")
const role = prompt("lu siapa? (cowok / cewek)");

const btn = document.getElementById("btn");

// KIRIM SINYAL
btn.addEventListener("click", () => {
  db.ref("kangen").set({
    from: role,
    time: Date.now()
  });
});

// TERIMA SINYAL
db.ref("kangen").on("value", snap => {
  const data = snap.val();
  if (!data || data.from === role) return;

  navigator.vibrate?.([200, 100, 200]);
  alert("💓 Dia lagi kangen sama lu!");
});
