import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3Mv-rMrCql2hVy7YEH2Nw4xiPAerLIso",
  authDomain: "devlinks-e105e.firebaseapp.com",
  projectId: "devlinks-e105e",
  storageBucket: "devlinks-e105e.appspot.com",
  messagingSenderId: "475361102157",
  appId: "1:475361102157:web:a1a82edc115d8fb3d3cf04",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
